<?php

namespace EPFL\Plugins\Gutenberg\InfoscienceSearch;

/**
 * Plugin Name: EPFL Infoscience search blocks
 * Plugin URI: https://github.com/epfl-idevelop/wp-gutenberg-epfl
 * Description: provides a gutenberg block to search and display results from Infoscience
 * Version: 2.0.1
 * Author: Julien Delasoie
 * Author URI: https://people.epfl.ch/julien.delasoie?lang=en
 * Contributors:
 * License: Copyright (c) 2019 Ecole Polytechnique Federale de Lausanne, Switzerland
 */

set_include_path(get_include_path() . PATH_SEPARATOR . dirname( __FILE__) . '/lib');

require_once('utils.php');
require_once('debug.php');
require_once('long_term_cache.php');
require_once('url.php');
require_once('marc_converter.php');
require_once('group_by.php');
require_once('mathjax-config.php');
require_once('banner.php');
require_once('render.php');

define(__NAMESPACE__ . "\INFOSCIENCE_SEARCH_URL", "https://infoscience.epfl.ch/search?");

class InfoscienceHTTPError extends \Exception {}  // when we can't get remote data
class InfoscienceUnknownContentException extends \Exception {}  // when we can't read the infoscience returned data


/**
 *
 * Entry point when we come from Gutenberg block
 *
 */
function epfl_infoscience_search_block( $provided_attributes ) {
    $current_language = get_language();

    # if we got any msg, set it into this banner
    $banner_msgs = [];

    # deliver the css
    wp_enqueue_style('epfl-infoscience-search-shortcode-style.css');

    # add the MathJS for nice render
    # try [epfl_infoscience_search pattern="001:'255565'" summary="true" /] for a nice example
    wp_enqueue_script('epfl-infoscience-search-shortcode-math-main.js', true);

    # normalize attribute keys, lowercase
    $atts = array_change_key_case((array)$provided_attributes, CASE_LOWER);

    # convert group_by data coming from the UI to values for the next functions
    if (array_key_exists('groupby', $atts)) {
        if ($atts['groupby'] == 'year_doctype') {
            $atts['group_by'] = 'year';
            $atts['group_by2'] = 'doctype';
        } elseif ($atts['groupby'] == 'doctype_year') {
            $atts['group_by'] = 'doctype';
            $atts['group_by2'] = 'year';
        } else {
            $atts['group_by'] = $atts['groupby'];
        }
    }

    $infoscience_search_managed_attributes = array(
        'serverengine' => 'invenio',
        # Content 1
        'url' => '',
        # or Content 2
        'pattern' => '',
        'fieldrestriction' => 'any',  # "any", "author", "title", "year", "unit", "collection", "journal", "summary", "keyword", "issn", "doi"
        'limit' => 20,
        'sort' => 'desc',  # "asc", "desc"
        # Presentation
        'format' => 'short',  # "short", "detailed"
        'summary' => false,
        'thumbnail' => true,
        'group_by' => '', # "", "year", "doctype"
        'group_by2' => '', # "", "year", "doctype"
        # Dev
        'debug' => false,
        'debugdata' => false,
        'debugtemplate' => false,
        'deactivatecache' => false,
    );

    $attributes = shortcode_atts($infoscience_search_managed_attributes, $atts, '');
    $unmanaged_attributes = array_diff_key($atts, $attributes);

    # Sanitize parameters
    foreach ($unmanaged_attributes as $key => $value) {
        $unmanaged_attributes[$key] = sanitize_text_field($value);
    }

    $attributes['format'] = in_array(strtolower($attributes['format']), ['short', 'detailed']) ? strtolower($attributes['format']) : 'short';
    $attributes['group_by'] = InfoscienceGroupBy::sanitize_group_by($attributes['group_by']);
    $attributes['group_by2'] = InfoscienceGroupBy::sanitize_group_by($attributes['group_by2']);

    # Unset element unused in url, with backup first
    $before_unset_attributes = $attributes;

    $server_engine_name = $attributes['serverengine'];

    $format = $attributes['format'];
    unset($attributes['format']);

    $summary = $attributes['summary'];
    unset($attributes['summary']);

    $thumbnail = $attributes['thumbnail'];
    unset($attributes['thumbnail']);

    $group_by = $attributes['group_by'];
    unset($attributes['group_by']);

    $group_by2 = $attributes['group_by2'];
    unset($attributes['group_by2']);

    $debug = $attributes['debug'];
    unset($attributes['debug']);

    $debug_data = $attributes['debugdata'];
    unset($attributes['debugdata']);

    $debug_template = $attributes['debugtemplate'];
    unset($attributes['debugtemplate']);

    $deactivate_cache = $attributes['deactivatecache'];

    # as the cache is identified with the url too, separate the getter
    if (empty($server_engine_name) || $server_engine_name == 'invenio') {
        $url = old_generate_url_from_attributes( $attributes, $unmanaged_attributes );
    } else {
        $url = generate_url_from_attributes( $attributes, $unmanaged_attributes );
    }

    /*
     * Cache features part
     * Here we used a homemade cache system, the point being to have
     * a best effort cache, meaning it does not disappear if there is no
     * new values to set in.
     */
    $cache_define_by = [
        'url' => $url,
        'format' => $format,
        'summary' => $summary,
        'thumbnail' => $thumbnail,
        'group_by' => $group_by,
        'group_by2' => $group_by2,
        'sort' => $attributes['sort'],
        'language' => $current_language
    ];

    $serialized_attributes = serialize($cache_define_by);
    $md5_id = md5($serialized_attributes);
    $cache_key = 'epfl_infoscience_search_' . $md5_id;

    $long_cache_value = 1 * DAY_IN_SECONDS; // was 1 * WEEK_IN_SECONDS;
    $short_cache_value = 4 * HOUR_IN_SECONDS;
    // there is the third cache, the db_cache that is unlimited in time
    // see ./long_term_cache.php for details

    // Flag which cache we are currently using, to show a banner at the end
    $cache_in_use = null;  // | 'short' | 'long' | 'db'

    /**
     * Old block - try to fetch what is in the db
     */
    // ok, as we have two variants of the block coming here, we may need to crawl different data
    if (empty($server_engine_name) || $server_engine_name == 'invenio') {  // meaning we have the old block
        $page = get_page_from_cache_table( $md5_id );  // use whatever is in the long terme cache db
        // Tell the api timer we're using the cache
        do_action( 'epfl_stats_webservice_call_duration', $url, 0, true );
        if ( $page ) {
            $cache_in_use = 'db';
        }

        $debug_info_div = '';
        if ($debug) {
            $debug_info_div = get_debug_info_div(
                $cache_define_by,
                $cache_in_use,
                $server_engine_name,
                $debug_data && isset($grouped_by_publications) ? $grouped_by_publications : []
            );
        }

        return get_banners(true, $banner_msgs, $current_language) .
               $debug_info_div . $page;  // stop here, it is enough for the old block
    }

    // As defined by the $short_cache_value, we may need to refresh it.
    // You may wonder why not using the transient timeout system ? Well, as we want
    // two cache timer (short and long), this assert that long cache is still there, longer than the short one
    $isShortCacheExpiredFn = function () use ($cache_key, $short_cache_value, $long_cache_value): bool {
        // See if we want a force refresh when short cache is here, so we have fresh data
        $expires = (int) get_option( '_transient_timeout_' . $cache_key, 0 );

        if (!$expires || $expires == 0) return true;

        $cache_creation_time = $expires - $long_cache_value;
        if ( time() < $cache_creation_time + $short_cache_value ) {
            # not enough time passed for a cache refresh, keep it short
            return false;
        } else {
            return true;
        }
    };

    $isShortCacheExpired = $isShortCacheExpiredFn();
    /*
     * End of cache features
     */

    // these are reasons we may not want to use the cache
    if (
        // if we are here for some cache invalidation by doing a page edit
        ( is_admin() && current_user_can( 'edit_pages' ) ) ||
        // short cache need an update
        $isShortCacheExpired ||
        $deactivate_cache ||
        $debug_data ||
        $debug_template
    ) {
        $try_the_cache = false;
    } else {
        $try_the_cache = true;
    }

    $page = $try_the_cache ? get_transient($cache_key) : false;

    if ($page !== false) {  // yep, we are using the cache at this point
        // Tell the api call timer about it
        do_action( 'epfl_stats_webservice_call_duration', $url, 0, true );

        // define which cache for later banners if any
        $cache_in_use = $isShortCacheExpired ? 'long' : 'short';
    } else {
        // no cache for u, time to do the hard work
        // crawl, build and cache the page
        try {
            $start = microtime( true );
            $response = wp_remote_get( $url, [
                    'timeout' => 30
                ]
            );
            $end = microtime( true );

            // log the time the call has needed
            do_action( 'epfl_stats_webservice_call_duration', $url, $end - $start );

            if ( is_wp_error( $response ) ) {
                if ( $response->errors ) {
                    # error is an external cause
                    if ( array_key_exists( "http_request_failed", $response->errors ) ) {
                        $error_message = "infoscience.epfl.ch may currently be down or the results you are trying to fetch are too big;";
                        $error_message .= " Please try again later or set a more precise and limited search.";
                    } else {
                        $error_message = $response->get_error_message();
                    }
                }

                // delegate further down the managment of this
                throw new InfoscienceHTTPError( $error_message );
            }

            $marc_xml = wp_remote_retrieve_body( $response );

            $publications = InfoscienceMarcConverter::convert_marc_to_array( $marc_xml );

            $grouped_by_publications = InfoscienceGroupBy::do_group_by( $publications, $group_by, $group_by2, $attributes['sort'] );

            $page = ClassesInfoscience2018Render::render( $grouped_by_publications,
                $url,
                $format,
                $summary,
                $thumbnail,
                $debug_template );

            // wrap the page, and add config as html comment
            $html_verbose_comments = '<!-- epfl_infoscience_search params : ' . var_export( $before_unset_attributes, true ) . ' //-->';
            $html_verbose_comments .= '<!-- epfl_infoscience_search used url :' . var_export( $url, true ) . ' //-->';

            $page = '<div class="infoscienceBox container no-tex2jax_process">' . $html_verbose_comments . $page . '</div>';

            $page .= epfl_infoscience_search_get_mathjax_config();

            // cache the result if we have got some valid data
            if ( !empty( $publications ) ) {
                # cache any valid results
                set_transient( $cache_key, $page, $long_cache_value );
            }
        }
            # on error, do something with the error, then start a best effort to find something into caches
        catch (
        InfoscienceHTTPError |
        InfoscienceUnknownContentException |
        Exception $e
        ) {
            if ($e instanceof InfoscienceHTTPError) {
                $banner_msgs[] = "Infoscience is no responding. HTTP error.";
            } elseif ($e instanceof InfoscienceUnknownContentException) {
                $banner_msgs[] = "Infoscience is not returning valid data. Please try again later or set a more precise and limited search.";

                error_log("Infoscience is returning invalid data. Message " . $e->getMessage());
                if (!empty($marc_xml)) {
                    error_log("Excerpt of Infoscience returned data : " . substr($marc_xml, 0, 100));
                } else {
                    error_log("Infoscience has not returned any data.");
                }
            } else {
                $banner_msgs[] = 'Error: ' . $e->getMessage();
            }

            $page = get_transient($cache_key);

            if ($page !== false) {
                // Tell the api timer we're using the cache
                do_action('epfl_stats_webservice_call_duration', $url, 0, true);
                $cache_in_use = $isShortCacheExpired ? 'long' : 'short';
            }
        }
    }

    // check and add banner, if needed
    if ( $cache_in_use == 'long' ) {
        // in case we can not get fresh data, show the ones in cache *if possible*, and add this sorry message
        $banner_msgs[] = 'This is cached data, the list may be obsolete.';
    }

    $debug_info_div = '';
    if ($debug) {
        $debug_info_div = get_debug_info_div(
            $cache_define_by,
            $cache_in_use,
            $server_engine_name,
            $debug_data && isset($grouped_by_publications) ? $grouped_by_publications : []
        );
    }

    return get_banners(false, $banner_msgs, $current_language) .
           $debug_info_div . $page;
}

add_action( 'init', function() {
    add_shortcode( 'epfl_infoscience_search', 'epfl_infoscience_search_block' );
    wp_register_style('epfl-infoscience-search-shortcode-style.css', plugins_url('css/epfl-infoscience-search-shortcode-style.css', __FILE__));

    # MathJax for nice render
    wp_register_script('epfl-infoscience-search-shortcode-math-main.js', 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/latest.js?config=default');
});

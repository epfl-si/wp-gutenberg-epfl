<?php

namespace EPFL\Plugins\Gutenberg\InfoscienceSearch;

use \EPFL\Plugins\Gutenberg\Lib\Utils;

/**
 * Plugin Name: EPFL Infoscience search blocks
 * Plugin URI: https://github.com/epfl-idevelop/wp-gutenberg-epfl
 * Description: provides a gutenberg block to search and dispay results from Infoscience
 * Version: 1.0.2
 * Author: Julien Delasoie
 * Author URI: https://people.epfl.ch/julien.delasoie?lang=en
 * Contributors:
 * License: Copyright (c) 2019 Ecole Polytechnique Federale de Lausanne, Switzerland
*/

set_include_path(get_include_path() . PATH_SEPARATOR . dirname( __FILE__) . '/lib');

require_once('utils.php');
require_once('marc_converter.php');
require_once('group_by.php');
require_once('mathjax-config.php');
require_once('render.php');

define(__NAMESPACE__ . "\INFOSCIENCE_SEARCH_URL", "https://infoscience.epfl.ch/search?");

class InfoscienceUnknownContentException extends \Exception {}  // when we can't read the infoscience returned data


/**
 *
 * Entry point when we come from Gutenberg block
 *
*/
function epfl_infoscience_search_block( $provided_attributes ) {
    # things to change:
    # field 'content' to attribute 'url'
    $content = null;

    #TODO: set this css to editor too
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
        # Content 1
        'url' => '',
        # or Content 2
        'pattern' => '',
        'fieldrestriction' => 'any',  # "any", "author", "title", "year", "unit", "collection", "journal", "summary", "keyword", "issn", "doi"
        'limit' => 100,
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


    if ( $attributes['debug']) {
        $debug_data = $attributes['debug'];  # alias
        unset($attributes['debug']);
    } else {
        $debug_data = $attributes['debugdata'];
        unset($attributes['debugdata']);
    }

    $debug_template = $attributes['debugtemplate'];
    unset($attributes['debugtemplate']);

    # Url priority :
    # 1. direct url -> $attributes['url']
    # 2. url attribute ->
    # 3. with all the attributes, we built a custom one
    $url = htmlspecialchars_decode($attributes['url']);

    if ($url) {
        $url = trim($url);
        # assert it is an infoscience one :
        if (preg_match('#^https?://infoscience.epfl.ch/#i', $url) !== 1) {
            return Utils::render_user_msg("Infoscience search shortcode: Please check the url");
        }

        $recid_matches = [];
        preg_match('#^https?://infoscience.epfl.ch/record/(\d+)/?#i', $url, $recid_matches);

        if (count($recid_matches) >= 2) {
            # this is direct record url
            # transform it to a recid search
            $recid = $recid_matches[1];
            $url = "https://infoscience.epfl.ch/search?p=recid:'" . $recid . "'";
        }

        $parts = parse_url($url);
        $query = proper_parse_str($parts['query']);

        #
        # override values

        # set the given url to the good format
        $query['of'] = 'xm';

        # when it is a basket, dont touch the args, only the of one :
        if (!array_key_exists('bskid', $query) || empty($query['bskid'])) {

            $query['as'] = '1';

            # set default if not already set :
            if (!array_key_exists('rg', $query) || empty($query['rg'])) {
                $query['rg'] = '100';
            }

            #empty or not, the limit attribute has the last word
            if (!empty($atts['limit'])) {
                $query['rg'] = $atts['limit'];
            }

            if (!array_key_exists('sf', $query) || empty($query['sf'])) {
                $query['sf'] = 'year';
            }

            if (!array_key_exists('so', $query) || empty($query['so'])) {
                if (array_key_exists('sort', $atts) && $atts['sort'] === 'asc') {
                    $query['so'] = 'a';
                } else {
                    $query['so'] = 'd';
                }
            }
        }

        # We may use http_build_query($query, null, '&amp;'); when provided urls are overencoded
        # looks fine at the moment
        $query = http_build_query($query, null);

        # from foo[1]=bar1&foo[2]=bar2 to foo[]=bar&foo[]=bar2
        $url = preg_replace('/%5B(?:[0-9]|[1-9][0-9]+)%5D=/', '=', $query);

        $url = INFOSCIENCE_SEARCH_URL . urldecode($url);
    } else {
        # no direct url were provided, build the custom one ourself
        $url = epfl_infoscience_search_generate_url_from_attrs($attributes+$unmanaged_attributes);
    }

    $cache_define_by = [
        'url' => $url,
        'format' => $format,
        'summary' => $summary,
        'thumbnail' => $thumbnail,
        'group_by' => $group_by,
        'group_by2' => $group_by2,
        'sort' => $attributes['sort'],
    ];

    # fetch language
    # if you can, use the method
    # use function EPFL\Language\get_current_or_default_language;

    $default_lang = 'en';
    $allowed_langs = array('en', 'fr');
    $language = $default_lang;
    # If Polylang installed
    if(function_exists('pll_current_language'))
    {
        $current_lang = pll_current_language('slug');
        // Check if current lang is supported. If not, use default lang
        $language = (in_array($current_lang, $allowed_langs)) ? $current_lang : $default_lang;
    }

    $cache_define_by['language'] = $language;

    $cache_key = md5(serialize($cache_define_by));

    # check if we are here for some cache invalidation
    if (is_admin() && current_user_can( 'edit_pages' )) {
        # invalidate the cache if we are editing the page
        delete_transient($cache_key);
    }

    #TODO: remove this transient
    delete_transient($cache_key);
    $page = get_transient($cache_key);

    # not in cache ?
    if ($page === false || $debug_data || $debug_template) {
        $start = microtime(true);
        $response = wp_remote_get( $url, ['timeout' => 20] );
        $end = microtime(true);

        // logging call
        do_action('epfl_stats_webservice_call_duration', $url, $end-$start);

        if ( is_wp_error( $response ) ) {
            if ($response->errors) {
                # error is an external cause
                if (array_key_exists("http_request_failed", $response->errors)) {
                    $error_message = "infoscience.epfl.ch may currently be down or the results you are trying to fetch are too big;";
                    $error_message .= " Please try again later or set a more precise search with a limit.";
                } else {
                    $error_message = $response->get_error_message();
                }
                echo "Error: $error_message";
            }
        } else {
            try {
                $marc_xml = wp_remote_retrieve_body( $response );

                $publications = InfoscienceMarcConverter::convert_marc_to_array($marc_xml);

                $grouped_by_publications = InfoscienceGroupBy::do_group_by($publications, $group_by, $group_by2, $attributes['sort']);

                if ($debug_data) {
                    $page = RawInfoscienceRender::render($grouped_by_publications, $url);
                    return $page;
                }

                $page = ClassesInfoscience2018Render::render($grouped_by_publications,
                                                        $url,
                                                        $format,
                                                        $summary,
                                                        $thumbnail,
                                                        $debug_template);

                // wrap the page, and add config as html comment
                $html_verbose_comments = '<!-- epfl_infoscience_search params : ' . var_export($before_unset_attributes, true) .  ' //-->';
                $html_verbose_comments .= '<!-- epfl_infoscience_search used url :'. var_export($url, true) . ' //-->';

                $page = '<div class="infoscienceBox container no-tex2jax_process">' . $html_verbose_comments . $page . '</div>';

                $page .= epfl_infoscience_search_get_mathjax_config();

                // cache the result
                set_transient($cache_key, $page, 4*HOUR_IN_SECONDS);

                // return the page
                return $page;
            } catch (InfoscienceUnknownContentException $e) {
                error_log("Infoscience is not returning valid data : " . $e->getMessage());
                if (!empty($marc_xml)) {
                    error_log("Infoscience returned data : " . $marc_xml);
                } else {
                    error_log("Infoscience has not returned any data.");
                }

                return Utils::render_user_msg("Infoscience is not returning valid data");
            }
        }
    } else {
        // To tell we're using the cache
        do_action('epfl_stats_webservice_call_duration', $url, 0, true);
        // Use cache
        return $page;
    }
}


/**
* From any attributes, set them as url parameters for Infoscience
*
* @param array $attrs attributes that need to be sent to Infoscience
*
* @return string $url the url build
*/
function epfl_infoscience_search_convert_keys_values($array_to_convert) {
    $convert_fields = function($value) {
        return ($value === 'any') ? '' : $value;
    };

    $convert_operators = function($value) {
        if ($value === 'and') {
            return 'a';
        } elseif ($value === 'or') {
            return  'o';
        } elseif ($value === 'and_not') {
            return  'n';
        } else {
            return $value;
        }
    };

    $sanitize_text_field = function($value) {
        return sanitize_text_field($value);
    };

    $sanitize_pattern_field = function($value) {
        # find if we have an encoded value, and decode it
        # this code allow retro-compatibility,
        # as encoding value was not done before
        if (preg_match('/%[0-9a-f]{2}/i', $value)) {
            $value = urldecode($value);
        }
        return sanitize_text_field($value);
    };

    $map = array(
        'pattern' => ['p1', $sanitize_pattern_field],
        'field' => ['f1', $convert_fields],
        'matching' => ['m1', $sanitize_text_field],
        'limit' => ['rg', function($value) {
            return ($value === '') ? '100' : $value;
        }],
        'sort' => ['so', function($value) {
            return ($value === 'asc') ? 'a' : 'd';
        }],
        'collection' => ['c', $sanitize_text_field],
        'pattern2' => ['p2', $sanitize_pattern_field],
        'field2' => ['f2', $convert_fields],
        'operator2' => ['op1', $convert_operators],
        'matching2' => ['m2', $sanitize_text_field],
        'pattern3' => ['p3', $sanitize_pattern_field],
        'field3' => ['f3', $convert_fields],
        'operator3' => ['op2', $convert_operators],
        'matching3' => ['m3', $sanitize_text_field],
    );

    $converted_array = array();

    foreach ($array_to_convert as $key => $value) {
        if (array_key_exists($key, $map)) {
            # is the convert function defined
            if (array_key_exists(1, $map[$key]) && $map[$key][1])
            {
                $converted_array[$map[$key][0]] = $map[$key][1]($value);
            } else {
                $converted_array[$map[$key][0]] = $value;
            }
        }
        else {
            $converted_array[$key] = $value;
        }
    }
    return $converted_array;
}

/**
* From any attributes, set them as url parameters for Infoscience
*
* @param array $attrs attributes that need to be sent to Infoscience
*
* @return string $url the url build
*/
function epfl_infoscience_search_generate_url_from_attrs($attrs) {
    $url = INFOSCIENCE_SEARCH_URL;

    # default parameters may change afterward
    $default_parameters = array(
        'as' => '1',  # advanced search
        'ln' => 'en',  #TODO: dynamic language
        'of' => 'xm',  # template format
        'sf' => 'year', # year sorting
    );

    $parameters = epfl_infoscience_search_convert_keys_values($attrs);
    $parameters = $default_parameters + $parameters;

    $additional_parameters_array = [
        # remove pendings by setting collection to accepted
        'c' => 'Infoscience/Published',
    ];

    foreach($additional_parameters_array as $key => $add_params) {
        if (array_key_exists($key, $parameters)) {
            $parameters[$key] = [
                $parameters[$key],
                $add_params,
            ];
        }
    }

    $parameters = array_filter($parameters);

    # this trick allow us to uniq UI, and no separate "normal" and "advanced" search
    # if we have only one operator set (meaning p1 is set and non p2 or p3)
    # and field resctriction is "any" and matching type is "a" (meaning "all of the words")
    # transform it to a non-advanced-search, as it has a better
    # search engine (mainly the date1->date2 operator)
    if (!empty($parameters['p1']) &&
        empty($parameters['p2']) &&
        empty($parameters['p3'])) {

        # what about fieldrestriction
        $is_field_restriction_any = False;
        if (array_key_exists('fieldrestriction', $parameters) &&
            $parameters['fieldrestriction'] === 'any') {
                $is_field_restriction_any = True;
        }

        # what about matching
        $is_matching_all_of_the_words = False;
        if (array_key_exists('matching', $parameters) &&
            $parameters['matching'] === 'a') {
                $is_matching_all_of_the_words = True;
        }

        // yes there is a tricky tranformation to check (fieldrestriction -> to f1)
        if ($is_field_restriction_any && $is_matching_all_of_the_words &&
            empty($parameters['f1']) ) {
            unset($parameters['as1']);
            unset($parameters['op1']);
            $parameters['p'] = $parameters['p1'];
            unset($parameters['p1']);
        }
    }

    # sort before build, for the caching system
    ksort($parameters);

    return INFOSCIENCE_SEARCH_URL . http_build_query($parameters);
}

add_action( 'init', function() {
    add_shortcode( 'epfl_infoscience_search', 'epfl_infoscience_search_block' );
    wp_register_style('epfl-infoscience-search-shortcode-style.css', plugins_url('css/epfl-infoscience-search-shortcode-style.css', __FILE__));

    # MathJax for nice render
    wp_register_script('epfl-infoscience-search-shortcode-math-main.js', 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/latest.js?config=default');
});

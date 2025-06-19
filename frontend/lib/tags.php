<?php

namespace EPFL\Plugins\Gutenberg\Lib\Tags;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

function epfl_fetch_site_tags_order_cmp($a, $b) {
  $order = ['faculty', 'institute', 'doctoral-program', 'field-of-research'];

  $a = array_search($a->type, $order);
  $b = array_search($b->type, $order);

  if ($a == $b) {
    return 0;
  }

  return ($a > $b) ? 1 : -1;
}

/**
 * Load tags if we are in the labs instance.
 * Tags are provided from the "Source de vérité" app.
 *
 * @return list of tags
 *
 */
add_filter( 'get_site_tags', function ($value) {
    $site_url = get_site_url();
    $tags = NULL;
    $cache_timeout = 4 * HOUR_IN_SECONDS;

    if ( (defined('WP_DEBUG') && WP_DEBUG) || false === ( $tags = get_transient( 'epfl_custom_tags' ) ) ) {
      // this code runs when there is no valid transient set

      $tag_provider_url = 'https://wp-veritas-next.epfl.ch/api/v1';
      $site = [];

      // first, fetch for the id of this site
      if (!str_ends_with($site_url, '/')) {
            $site_url .= '/';
      }

      $url_site_to_id = $tag_provider_url . '/sites?site_url=' . rawurlencode($site_url);
      $sites = Utils::get_items($url_site_to_id);

      if ($sites === false && !(defined('WP_DEBUG') && WP_DEBUG)) {
        # wp-veritas is not responding, get the local option and
        # set a transient, so we dont refresh everytime
        $tags_and_urls_from_option = get_option('epfl:custom_tags');
        if ($tags_and_urls_from_option === false) {
          # no option set ?
          set_transient( 'epfl_custom_tags', [], $cache_timeout );
          return;
        } else {
            set_transient( 'epfl_custom_tags', $tags_and_urls_from_option, $cache_timeout );
            return $tags_and_urls_from_option;
        }
      } else {
        # wp-veritas is responding; from the site id, get the tags
        if (!empty($sites)) {

            $site = $sites[0];

            if (!empty($site)) {
              $tags_and_urls = []; // [[tag, url], ...]
              $tags = $site->tags;

              if (!empty($tags)) {
                # all goods, we have data !

                # order it
                usort($tags, 'EPFL\Plugins\Gutenberg\Lib\Tags\epfl_fetch_site_tags_order_cmp');

                set_transient( 'epfl_custom_tags', $tags, $cache_timeout);
                # persist into options too, as a fallback if wp_veritas is no more online
                update_option('epfl:custom_tags', $tags);
                return $tags;
              } else {
                # nothing for this site ? time to remove local entries
                set_transient( 'epfl_custom_tags', [], $cache_timeout );
                delete_option('epfl:custom_tags');
                return;
              }
           }
        }
      }
    } else {
        return $tags;
    }
  }
);

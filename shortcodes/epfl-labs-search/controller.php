<?php

namespace EPFL\Plugins\Shortcodes\EPFLLabSearch;

/**
 * render the shortcode, mainly a form and his table
 */
function renderLabsSearch($sites, $faculty, $institute, $field) {
  wp_enqueue_script( 'lib-listjs', plugins_url('lib/list.min.js', dirname(__FILE__)), ['jquery'], '2.3.1', false);
  wp_enqueue_style( 'epfl-labs-search-css', plugins_url('epfl-labs-search.css', __FILE__),false,'1.1','all');

  filter_out_unused_language($sites);

  // are we doing a field of research result ?
  if ( !empty($field)) {
    // Remove all laboratories that are not in the current field of research
    foreach ($sites as $key => $site) {
      $tags_in_site = [];
      foreach ($site->tags as $tag) {
        $tags_in_site[] = $tag->name;
      }
      if (!in_array($field, $tags_in_site)) {
        unset($sites[$key]);
      }
    }
  }
  $combo_list_content = separate_tags_by_type($sites);
  if ( empty($sites) ) {
    // Disallow unknown text in the field var, as it will be shown in first page
    // that's a bad field of research, reset is but keep the empty list
    $field = "";
  } else {
    set_query_var('epfl_labs-predefined_field', $field);
  }

  set_query_var('epfl_labs-sites', $sites);
  set_query_var('epfl_labs-predefined_faculty', $faculty);
  set_query_var('epfl_labs-predefined_institute', $institute);
  set_query_var('eplf_labs-combo_list_content', $combo_list_content);

  load_template(dirname(__FILE__).'/view.php');
}


/**
 * Simplify the sites data by removing and renaming languages fields
 */
function filter_out_unused_language($sites) {
  $current_language = get_current_language();

  foreach ($sites as $site) {
    foreach ($site->tags as $tag) {
      if ($current_language === 'fr') {
        $tag->name = $tag->name_fr;
        $tag->url = $tag->url_fr;
        unset($tag->name_en);
        unset($tag->url_en);
      } else {
        $tag->name = $tag->name_en;
        $tag->url = $tag->url_en;
        unset($tag->name_fr);
        unset($tag->url_fr);
      }
    }
  }
}


/**
* as tag have a type, get a list of everytype and everytag
* as a new dictionary tags['faculty'] => [tag1, tag2]
*/
function separate_tags_by_type($sites) {
  $tags_typped = [
    'faculty' => [],
    'institute' => [],
    'field-of-research' => []
  ];

  $current_language = get_current_language();

  foreach ($sites as $site) {
    foreach ($site->tags as $tag) {
      if (!array_key_exists($tag->type, $tags_typped)) {
        continue;
      }

      if ($current_language === 'fr') {
        if (!in_array($tag->name_fr, $tags_typped[$tag->type])) {
          $tags_typped[$tag->type][] = $tag->name_fr;
        }
      } else {
        if (!in_array($tag->name_en, $tags_typped[$tag->type])) {
          $tags_typped[$tag->type][] = $tag->name_en;
        }
      }
    }
  }

  # sort everything
  foreach ($tags_typped as $key=>$tag_type) {
     sort($tags_typped[$key]);
  }

  return $tags_typped;
}

<?php

namespace EPFL\Plugins\Gutenberg\TableFilter;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');


/**
 * Render a Table filter
 */
function epfl_table_filter_block($attributes, $inner_content)
{

  // Adding needed scripts
  wp_enqueue_script('jquery-change-element-type.js', true);
  wp_enqueue_script('epfl-table-filter-list-min.js', true);
  wp_enqueue_script('epfl-table-filter.js', true);
  

  // Adding CSS
  wp_enqueue_style('epfl-table-filter-style.css');

  $large_display  = Utils::get_sanitized_attribute( $attributes, 'largeDisplay', false )=== '1';
  $placeholder    = Utils::get_sanitized_attribute( $attributes, 'placeHolder');
  $header_options = Utils::get_sanitized_attribute( $attributes, 'tableHeaderOptions', '');
  
  // Class without any CSS style but will be used by JS code
  $classes = array("epfl-table-filter");
  $classes[] = $large_display ? "container": "grid";

  // random generated ID for DIV
  $div_id = "table-filter-".md5(microtime(true). $inner_content);

  $content = '<div id="'.$div_id.'" class="'.implode(" ", $classes).'">'.
            '<input class="search table-filter-search" placeholder="'.$placeholder.'">'.
            // Adding info about header option so JS can use it to set things correctly
            '<input type="hidden" name="header" value="'.$header_options.'">'.
             $inner_content.
             '</div>';

  return $content;

}


add_action( 'init', function() {
  // using JS file present in theme
    wp_register_script('epfl-table-filter-list-min.js', plugins_url('js/list.min.js?ver=1.5', __FILE__));
    wp_register_script('epfl-table-filter.js', plugins_url('js/table-filter.js', __FILE__));
    wp_register_script('jquery-change-element-type.js', plugins_url('js/jquery-change-element-type.js', __FILE__));

    wp_register_style('epfl-table-filter-style.css', plugins_url('css/epfl-table-filter-style.css', __FILE__));
});



  

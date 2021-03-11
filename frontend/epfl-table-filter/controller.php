<?php

// Styleguide: https://epfl-si.github.io/elements/#/molecules/tables

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
  $bigger_font_size = Utils::get_sanitized_attribute( $attributes, 'biggerFontSize', false )=== '1';
  $placeholder    = Utils::get_sanitized_attribute( $attributes, 'placeHolder');
  $header_options = Utils::get_sanitized_attribute( $attributes, 'tableHeaderOptions', '');

  // Filtering option
  $filter_only_on_cols  = Utils::get_sanitized_attribute( $attributes, 'filterOnlyOnCols', '');
  $filter_only_on_cols_array  = (trim($filter_only_on_cols)!='')? explode(",", $filter_only_on_cols) : array();
  // Some sanitize work
  $filter_only_on_cols_array = array_map("trim", $filter_only_on_cols_array);
  $filter_only_on_cols_array = array_map("intval", $filter_only_on_cols_array);

  // Sorting options
  $numeric_sort_on_cols  = Utils::get_sanitized_attribute( $attributes, 'numericSortOnCols', '');
  $numeric_sort_on_cols_array  = (trim($numeric_sort_on_cols)!='')? explode(",", $numeric_sort_on_cols) : array();
  // Some sanitize work
  $numeric_sort_on_cols_array = array_map("trim", $numeric_sort_on_cols_array);
  $numeric_sort_on_cols_array = array_map("intval", $numeric_sort_on_cols_array);


  // Class without any CSS style but will be used by JS code
  $classes = array("epfl-table-filter");
  if($large_display) $classes[] = "container";
  if ($bigger_font_size) $classes[] = "bigger-font-size-table";

  // random generated ID for DIV
  $div_id = "table-filter-".md5(microtime(true). $inner_content);

  $content = '<div id="'.$div_id.'" class="'.implode(" ", $classes).'">'.
            '<input class="search table-filter-search" placeholder="'.$placeholder.'">'.
            // Adding info about header option so JS can use it to set things correctly
            '<input type="hidden" name="header" value="'.$header_options.'">'.
            // we use a JSON encoded array to store cols on which to filter
            '<input type="hidden" name="limit_filter_to_cols" value="'.json_encode($filter_only_on_cols_array).'">'.
            // we use a JSON encoded array to store cols on which to apply numeric sort
            '<input type="hidden" name="numeric_sort_on_cols" value="'.json_encode($numeric_sort_on_cols_array).'">'.
             $inner_content.
             '</div>';

  return $content;

}


add_action( 'init', function() {
  // using JS file present in theme
    wp_register_script('epfl-table-filter.js', plugins_url('js/table-filter.js', __FILE__));
    wp_register_script('jquery-change-element-type.js', plugins_url('lib/jquery-change-element-type.js', dirname(__FILE__)));

    wp_register_style('epfl-table-filter-style.css', plugins_url('css/epfl-table-filter-style.css', __FILE__));
    /* NOTE: For an unknow reason, if we just register script here and call 'wp_enqueue_script' in epfl_table_filter_block function,
    script will be added in footer and table filter won't work...  */
    wp_enqueue_script( 'lib-listjs', plugins_url('lib/list.min.js', dirname(__FILE__)), ['jquery'], '2.3.1', false);

});

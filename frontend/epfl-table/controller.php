<?php

namespace EPFL\Plugins\Gutenberg\Table;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');


/**
 * Render a Table
 */
function epfl_table_block($attributes, $inner_content)
{

  wp_enqueue_script('jquery-change-element-type.js', true);
  wp_enqueue_script('epfl-table.js', true);

  $large_display        = Utils::get_sanitized_attribute( $attributes, 'largeDisplay', false )=== '1';
  $first_line_is_header = Utils::get_sanitized_attribute( $attributes, 'firstLineIsHeader', false );
  
  $classes = array('epfl-table');
  $classes[] = $large_display ? "container": "grid";

  $content = '<div class="'. implode(" ", $classes) .'">'.
            // Adding info about table header so JS can use it to set things correctly
            '<input type="hidden" name="first_line_is_header" value="'.$first_line_is_header.'">'.
             $inner_content.
             '</div>';

  return $content;

}


add_action( 'init', function() {
    wp_register_script('epfl-table.js', plugins_url('js/epfl-table.js', __FILE__));
    wp_register_script('jquery-change-element-type.js', plugins_url('lib/jquery-change-element-type.js', dirname(__FILE__)));

});


  

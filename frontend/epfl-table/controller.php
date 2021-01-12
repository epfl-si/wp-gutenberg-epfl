<?php

// Styleguide: https://epfl-si.github.io/elements/#/molecules/tables

namespace EPFL\Plugins\Gutenberg\Table;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

/**
 * Render a Table
 */
function epfl_table_block($attributes, $inner_content)
{

  wp_enqueue_script('jquery-change-element-type.js', true);

  $large_display = Utils::get_sanitized_attribute( $attributes, 'largeDisplay', false )=== '1';

  $bigger_font_size = Utils::get_sanitized_attribute( $attributes, 'biggerFontSize', false )=== '1';

  $classes = [];

  if ($large_display) $classes[] = "container";
  if ($bigger_font_size) $classes[] = "bigger-font-size-table";

  if (!empty($classes)) {
	$classes = implode(' ', $classes);
	$content = '<div class="'. $classes .'">'.$inner_content.'</div>';
  } else {
	$content = '<div>'.$inner_content.'</div>';
  }


  return $content;

}

add_action( 'init', function() {
    wp_register_script('jquery-change-element-type.js', plugins_url('lib/jquery-change-element-type.js', dirname(__FILE__)));
});

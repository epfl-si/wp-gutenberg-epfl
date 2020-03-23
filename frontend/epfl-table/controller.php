<?php

namespace EPFL\Plugins\Gutenberg\Table;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');


/**
 * Render a Table filter
 */
function epfl_table_block($attributes, $inner_content)
{

  $large_display  = Utils::get_sanitized_attribute( $attributes, 'largeDisplay', false )=== '1';
  
  $class = $large_display ? "container": "grid";

  $content = '<div class="'. $class .'">'.
             $inner_content.
             '</div>';

  return $content;

}



  

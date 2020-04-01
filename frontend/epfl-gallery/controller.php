<?php
/**
 * Surround default media gallery with custom features
 *
 */

namespace EPFL\Plugins\Gutenberg\Gallery;

use \EPFL\Plugins\Gutenberg\Lib\Utils;


function epfl_gallery_block($attr, $inner_content) {

    $large_display = Utils::get_sanitized_attribute( $attr, 'largeDisplay', false ) === '1';

    $output = '';
    $container_class = $large_display ? "gallery-container container" : "gallery-container";
    $output = '<div class="' . $container_class . '">';

    $output .= $inner_content;

    $output .= '</div>';

    return $output;
}

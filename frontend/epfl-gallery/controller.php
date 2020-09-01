<?php
// Styleguide: https://epfl-si.github.io/elements/#/molecules/gallery

/**
 * Surround default media gallery with custom features
 *
 */

namespace EPFL\Plugins\Gutenberg\Gallery;

use \EPFL\Plugins\Gutenberg\Lib\Utils;


function epfl_gallery_block($attr, $inner_content) {
    $large_display = Utils::get_sanitized_attribute( $attr, 'largeDisplay', false ) === '1';
    $navigationThumbnails = Utils::get_sanitized_attribute( $attr, 'navigationThumbnails', true ) === '1';

    // not really proud of this strategy to remove navigation,
    // but so much easier than trying to exchange data with the inner_content
    // if you come here because of a bug on the nav, please recieve all my apologies ;-;
    if (!$navigationThumbnails) {
        $inner_content = preg_replace('#<div class="gallery-nav(.*?)">(.*?)</div>#', '', $inner_content);
    }

    $output = '';
    $container_class = $large_display ? "gallery-container container" : "gallery-container";
    $output = '<div class="' . $container_class . '">';

    $output .= $inner_content;

    $output .= '</div>';

    return $output;
}

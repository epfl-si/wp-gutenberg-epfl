<?php
namespace EPFL\Plugins\Gutenberg\Map;

require_once(dirname(__FILE__).'/../lib/language.php');

use function EPFL\Plugins\Gutenberg\Lib\Language\get_current_or_default_language;

function epfl_map_block( $attributes ) {
    $query   = isset( $attributes['query'] ) ? sanitize_text_field( $attributes['query'] ) : '';
    $lang    = get_current_or_default_language();
    $map_url = 'https://plan.epfl.ch/iframe/?q=' . $query . '&amp;lang=' . $lang . '&amp;map_zoom=10';

    $markup = '<div class="container my-3">';
    $markup .= '<div class="embed-responsive embed-responsive-16by9">';
    $markup .= '<iframe ';
    $markup .= 'frameborder="0" ';
    $markup .= 'scrolling="no" ';
    $markup .= 'src="' . esc_url($map_url) . '"';
    $markup .= 'class="embed-responsive-item" ';
    $markup .= ' ></iframe>';
    $markup .= '</div>';
    $markup .= '</div>';
    return $markup;
}
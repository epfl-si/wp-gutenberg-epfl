<?php

namespace EPFL\Plugins\Gutenberg\Introduction;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_introduction_block( $attributes ) {

    $title          = Utils::get_sanitized_attribute( $attributes, 'title' );
    $content        = Utils::get_sanitized_attribute( $attributes, 'content' );
    $grayBackground = Utils::get_sanitized_attribute( $attributes, 'grayBackground', false );

    $markup = '<div class="container-full my-3">';
    $markup .= '<div class="introduction';
    if ($grayBackground) {
        $markup .= ' bg-gray-100';
    }
    $markup .= '">';
    $markup .= '<div class="container">';
    $markup .= '<div class="row">';
    $markup .= '<div class="col-md-8 offset-md-2">';
    $markup .= '<h2>';
    $markup .= esc_html(trim($title));
    $markup .= '</h2>';
    $markup .= '<p>';
    $markup .= esc_html($content);
    $markup .= '</p>';
    $markup .= '</div>';
    $markup .= '</div>';
    $markup .= '</div>';
    $markup .= '</div>';
    $markup .= '</div>';

    return $markup;
}
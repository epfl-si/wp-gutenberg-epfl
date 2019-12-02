<?php

namespace EPFL\Plugins\Gutenberg\Hero;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_hero_block( $attributes ) {


    $title       = Utils::get_sanitized_attribute( $attributes, 'title' );
    $image_id    = Utils::get_sanitized_attribute( $attributes, 'imageId' );
    $description = Utils::get_sanitized_attribute( $attributes, 'description' );

    $text = "";
    if (array_key_exists('text', $attributes)) {
      $text = wp_kses_post($attributes['text']);
    }

    $image = wp_get_attachment_image(
        $image_id,
        'thumbnail_16_9_large_80p', // see functions.php
        '',
        [
          'class' => 'img-fluid'
        ]
    );

    $markup = '<div class="container-full my-3">';
    $markup .= '<div class="hero">';
    $markup .= '<div class="hero-content-container">';
    $markup .= '<h1 class="hero-title">' . $title . '</h1>';
    if (!empty($text)) {
      $markup .= '<div class="hero-content">';
      $markup .= $text;
      $markup .= '</div>';
    }
    $markup .= '</div>';
    $markup .= '<div class="hero-img">';
    $markup .= '<figure class="cover">';
    $markup .= '<picture>';
    $markup .= $image;
    $markup .= '</picture>';
    $markup .= '<figcaption>';
    $markup .= '<button aria-hidden="true" type="button" class="btn-circle" data-toggle="popover" data-content="' . esc_html($description) . '">';
    $markup .= '<svg class="icon" aria-hidden="true">';
    $markup .= '<use xlink:href="#icon-info"></use>';
    $markup .= '</svg>';
    $markup .= '<svg class="icon icon-rotate-90" aria-hidden="true">';
    $markup .= '<use xlink:href="#icon-chevron-right"></use>';
    $markup .= '</svg>';
    $markup .= '</button>';
    $markup .= '<p class="sr-only">' . esc_html($description) . '</p>';
    $markup .= '</figcaption>';
    $markup .= '</div>';
    $markup .= '</div>';
    $markup .= '</div>';

    return $markup;
}

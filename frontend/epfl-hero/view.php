<?php

function epfl_hero_block( $attributes ) {

    $title    = isset( $attributes['title'] ) ? sanitize_text_field( $attributes['title'] ) : '';
    $text     = isset( $attributes['text'] ) ? sanitize_text_field( $attributes['text'] ) : '';
    $image_id = isset( $attributes['imageId'] ) ? sanitize_text_field( $attributes['imageId'] ) : '';

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
    $markup .= '<picture>';
    $markup .= $image;
    $markup .= '</picture>';
    $markup .= '</div>';
    $markup .= '</div>';

    return $markup;
}
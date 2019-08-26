<?php

namespace EPFL\Plugins\Gutenberg\Quote;

function epfl_quote_block( $attributes ) {

    $image_id = isset( $attributes['imageId'] ) ? sanitize_text_field( $attributes['imageId'] ) : '';
    $quote    = isset( $attributes['quote'] ) ? sanitize_text_field( $attributes['quote'] ) : '';
    $cite     = isset( $attributes['cite'] ) ? sanitize_text_field( $attributes['cite'] ) : '';
    $footer   = isset( $attributes['footer'] ) ? sanitize_text_field( $attributes['footer'] ) : '';

    $attachment = wp_get_attachment_image(
        $image_id,
        'thumbnail_square_crop', // see functions.php
        '',
        [
          'class' => 'img-fluid rounded-circle',
          'alt' => esc_attr($cite)
        ]
    );

    /*
    var_dump($image_id);
    var_dump($quote);
    var_dump($cite);
    var_dump($footer);
    */

    $markup = '<div class="row my-3">';
    $markup .= '<div class="col-6 offset-3 col-sm-4 offset-sm-4 col-md-2 offset-md-0 text-center text-md-right">';
    $markup .= '<picture>';
    $markup .= $attachment;
    $markup .= '</picture>';
    $markup .= '</div>';
    $markup .= '<blockquote class="blockquote mt-3 col-md-10 border-0">';
    $markup .= '<p class="mb-0">' . esc_attr($quote) . '</p>';
    $markup .= '<footer class="blockquote-footer"><cite title="' . esc_attr($cite) . '">' . esc_html($cite) . '</cite>, ' . esc_html($footer) . '</footer>';
    $markup .= '</blockquote>';
    $markup .= '</div>';

    return $markup;
}
<?php

namespace EPFL\Plugins\Gutenberg\Quote;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_quote_block( $attributes ) {

    $image_id = Utils::get_sanitized_attribute( $attributes, 'imageId' );
    $quote    = Utils::get_sanitized_attribute( $attributes, 'quote' );
    $author   = Utils::get_sanitized_attribute( $attributes, 'author' );
    $position = Utils::get_sanitized_attribute( $attributes, 'position' );

    $attachment = wp_get_attachment_image(
        $image_id,
        'thumbnail_square_crop', // see functions.php
        '',
        [
          'class' => 'img-fluid rounded-circle',
          'alt' => esc_attr($author)
        ]
    );

    /*
    var_dump($image_id);
    var_dump($quote);
    var_dump($author);
    var_dump($position);
    */

    $markup = '<div class="row my-3">';
    $markup .= '<div class="col-6 offset-3 col-sm-4 offset-sm-4 col-md-2 offset-md-0 text-center text-md-right">';
    $markup .= '<picture>';
    $markup .= $attachment;
    $markup .= '</picture>';
    $markup .= '</div>';
    $markup .= '<blockquote class="blockquote mt-3 col-md-10 border-0">';
    $markup .= '<p class="mb-0">' . esc_attr($quote) . '</p>';
    $markup .= '<footer class="blockquote-footer"><cite title="' . esc_attr($author) . '">' . esc_html($author) . '</cite>, ' . esc_html($position) . '</footer>';
    $markup .= '</blockquote>';
    $markup .= '</div>';

    return $markup;
}
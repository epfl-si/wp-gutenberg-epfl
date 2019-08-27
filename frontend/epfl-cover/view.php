<?php

namespace EPFL\Plugins\Gutenberg\Cover;

function epfl_cover_block( $attributes ) {

    $image_id    = sanitize_text_field( $attributes['imageId'] ) ?: '';
    $description = sanitize_text_field( $attributes['description'] ) ?: '';

    /*
    var_dump($image_id);
    var_dump($description);
    */

    $attachement = wp_get_attachment_image(
        $image_id,
        'thumbnail_16_9_large_80p', // see functions.php
        '',
        [
            'class' => 'img-fluid',
            'alt' => esc_attr($description)
        ]
    );

    $content = '<div class="container my-3">';

    $content .= '<figure class="cover">';
    $content .= '<picture>';
    $content .= $attachement;
    $content .= '</picture>';

    if (!empty($description)) {

        $content .= '<figcaption>';
        $content .= '<button';
        $content .= ' aria-hidden="true"';
        $content .= ' type="button"';
        $content .= ' class="btn-circle"';
        $content .= ' data-toggle="popover"';
        $content .= ' data-content="' . esc_attr($description) . '"';
        $content .= '>';
        $content .= '<svg class="icon" aria-hidden="true"><use xlink:href="#icon-info"></use></svg>';
        $content .= '<svg class="icon icon-rotate-90" aria-hidden="true"><use xlink:href="#icon-chevron-right"></use></svg>';
        $content .= '</button>';
        $content .= '<p class="sr-only">' . esc_html($description) . '</p>';
        $content .= '</figcaption>';
    }
    $content .= '</figure>';
    $content .= '</div>';

    return $content;
}
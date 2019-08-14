<?php 

function epfl_introduction_block( $attributes ) {
    
    $title = isset( $attributes['title'] ) ? sanitize_text_field( $attributes['title'] ) : '';
    $content = isset( $attributes['content'] ) ? sanitize_text_field( $attributes['content'] ) : '';
    $gray = isset( $attributes['gray'] ) ? sanitize_text_field( $attributes['gray'] ) : false;

    $markup = '<div class="container-full my-3">';
    $markup .= '<div class="introduction';
    if ($gray) {
        $markup .= ' bg-gray-100';
    } 
    $markup .= '">';
    $markup .= '<div class="container">';
    $markup .= '<div class="row">';
    $markup .= '<div class="col-md-8 offset-md-2">';
    $markup .= '<h2>';
    $markup .= esc_html($title);
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
<?php

function epfl_toggle_block( $attributes ) {

    $title     = sanitize_text_field( $attributes['title'] ) ?: '';
    $content   = $attributes['content'] ?: '';
    $state     = sanitize_text_field( $attributes['state'] ) ?: '0';
    $toggle_id = md5($content . rand());

    /*
    var_dump($title);
    var_dump($content);
    var_dump($state);
    var_dump($toggle_id);
    */

    $markup = '<button';
    $markup .= ' class="collapse-title collapse-title-desktop '; 
    if ($state === 'close') {
        $markup .= 'collapsed'; 
    } 
    $markup .= '"';
    $markup .= ' type="button"';
    $markup .= ' data-toggle="collapse"';
    $markup .= ' data-target="' . esc_attr('#collapse-' . $toggle_id) . '"';
    $markup .= ' aria-expanded="false"';
    $markup .= ' aria-controls="' . esc_attr('#collapse-' . $toggle_id) . '"';
    $markup .= '>';
    $markup .= esc_html($title);
    $markup .= '</button>';
    $markup .= '<div ';
    $markup .= 'class="collapse collapse-item collapse-item-desktop '; 
    if ($state === "1") {
        $markup .= 'show';
    }
    $markup .= '"';
    $markup .= ' id="' . esc_attr('collapse-' . $toggle_id) . '"';
    $markup .= '>';
    $markup .= '<p>' . wp_kses_post(do_shortcode( $content )) . '</p>';
    $markup .= '</div>';

    return $markup;
}
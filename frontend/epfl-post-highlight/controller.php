<?php

namespace EPFL\Plugins\Gutenberg\PostHighlight;

function epfl_post_highlight_block( $attributes ) {

    $layout = sanitize_text_field( $attributes['layout'] ) ?: '';
    $post   = sanitize_text_field( $attributes['post'] ) ?: '';
    $post   = json_decode($post, true);

    $post   = get_post($post["value"]);

    // get excerpt
    $content = reset(explode('<!--more-->', $post->post_content));

    // manage layout
    $classes = '';
    if ($layout == 'bottom') $classes = 'fullwidth-teaser-horizontal';
    if ($layout == 'left') $classes = 'fullwidth-teaser-left';

    $html = '<div class="container-full my-3">';
    $html .= '<div class="fullwidth-teaser ' . $classes . '">';

    if (has_post_thumbnail( $post )) {
        $html .= '<picture>';
        $html .= '<source';
        $html .= 'media="(min-width: 1140px)"';
        $html .= 'srcset="' . get_the_post_thumbnail_url( $post, 'large' ) . '"';
        $html .= '>';
        $html .= '<img src="' . get_the_post_thumbnail_url( $post ) . '" aria-labelledby="background-label" alt="An image description" />';
        $html .= '</picture> ';
    }

    $html .= '<div class="fullwidth-teaser-text">';
    $html .= '<div class="fullwidth-teaser-header">';
    $html .= '<div class="fullwidth-teaser-title">';
    $html .= '<h3>';
    $html .= $post->post_title;
    $html .= '</h3>';
    $html .= '</div>';
    $html .= '<a href="' . get_permalink( $post ) . '" aria-label="Link to read more of that post" class="btn btn-primary triangle-outer-bottom-right d-none d-xl-block">' . esc_html( "Read more", 'epfl' ) . '</a>';
    $html .= '</div>';

    if (!empty($content)) {
        $html .= '<div class="fullwidth-teaser-content">';
        $html .= '<p>';
        $html .= epfl_excerpt( $post );
        $html .= '</p>';
        $html .= '</div>';
    }

    $html .= '<div class="fullwidth-teaser-footer">';
    $html .= '<a href="' . get_permalink( $post ) . '" aria-label="Link to read more of that post" class="btn btn-primary btn-block d-xl-none">' . esc_html( "Read more", 'epfl' ) . '</a>';
    $html .= '</div>';
    $html .= '</div>';
    $html .= '</div>';
    $html .= '</div>';

    return $html;
}
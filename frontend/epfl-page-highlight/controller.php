<?php 

function epfl_page_highlight_block( $attributes ) {

    $layout = sanitize_text_field( $attributes['layout'] ) ?: '';
    $page   = sanitize_text_field( $attributes['page'] ) ?: '';
    $page   = json_decode($page, true);

    /*
    var_dump($layout);
    var_dump($page);
    */

    $page = get_post($page["value"]);

    // get excerpt
    $content = reset(explode('<!--more-->', $page->post_content));

    // manage layout
    $classes = '';
    if ($layout == 'bottom') $classes = 'fullwidth-teaser-horizontal';
    if ($layout == 'left') $classes = 'fullwidth-teaser-left';

    $html = '<div class="container-full my-3">';
    $html .= '<div class="fullwidth-teaser ' . $classes . '">';
    
    if (has_post_thumbnail( $page )) {
        $html .= '<picture>';
        $html .= '<source';
        $html .= 'media="(min-width: 1140px)"';
        $html .= 'srcset="' . get_the_post_thumbnail_url( $page, 'large' ) . '"';
        $html .= '>';
        $html .= '<img src="' . get_the_post_thumbnail_url( $page ) . '" aria-labelledby="background-label" alt="An image description" />';
        $html .= '</picture> ';
    }

    $html .= '<div class="fullwidth-teaser-text">';
    $html .= '<div class="fullwidth-teaser-header">';
    $html .= '<div class="fullwidth-teaser-title">';
    $html .= '<h3>';
    $html .= $page->post_title;
    $html .= '</h3>';
    $html .= '</div>';
    $html .= '<a href="' . get_permalink( $page ) . '" aria-label="Link to read more of that page" class="btn btn-primary triangle-outer-bottom-right d-none d-xl-block">' . esc_html( "Read more", 'epfl' ) . '</a>';
    $html .= '</div>';

    if (!empty($content)) {
        $html .= '<div class="fullwidth-teaser-content">';
        $html .= '<p>';
        $html .= epfl_excerpt( $page );
        $html .= '</p>';
        $html .= '</div>';
    }

    $html .= '<div class="fullwidth-teaser-footer">';
    $html .= '<a href="' . get_permalink( $page ) . '" aria-label="Link to read more of that page" class="btn btn-primary btn-block d-xl-none">' . esc_html( "Read more", 'epfl' ) . '</a>';
    $html .= '</div>';
    $html .= '</div>';
    $html .= '</div>';
    $html .= '</div>';

    return $html;
}
<?php 

function epfl_page_teaser_block( $attributes ) {

    $page1 = sanitize_text_field( $attributes['page1'] ) ?: '';
    $page2 = sanitize_text_field( $attributes['page2'] ) ?: '';
    $page3 = sanitize_text_field( $attributes['page3'] ) ?: '';

    $page1 = json_decode($page1, true);
    $page2 = json_decode($page2, true);
    $page3 = json_decode($page3, true);

    $gray = false;

    $data = array($page1["value"], $page2["value"], $page3["value"]);

    $html = '<div class="container-full my-3 ';
    if ($gray) {
        $html .= ' bg-gray-100';
    }
    $html .= '">';
    $html .= '<div class="container">';
    $html .= '  <div class="card-deck';
    if ($pagesCount < 3) {
        $html .= ' card-deck-line';
    }
    $html .= ' ">';
    foreach($data as $key => $page) {

        $page = get_post($page);

        //if (strpos($key, 'page') !== 0) continue;

        $html .= '<div class="card">';
        $page_url = get_permalink($page);

        card_img_top(
            get_the_post_thumbnail($page, 'thumbnail_16_9_large', ['class' => 'img-fluid']),
            $page_url
        );
        
        $html .= '<div class="card-body">';
        $html .= '<div class="card-title">';
        $html .= '<a href="' . $page_url . '" class="h3">' . $page->post_title . '</a>';
        $html .= '</div>';
        
        $excerpt = epfl_excerpt($page);
        if (!empty($excerpt)) {   
            $html .= '<p>' . $excerpt . '</p>';
        }
        $html .= '</div>';
        $html .= '</div>';
    }
    $html .= '</div>';
    $html .= '</div>';
    $html .= '</div>';

    return $html;

}
<?php

function epfl_page_teaser_block( $attributes ) {

    $page1 = sanitize_text_field( $attributes['page1'] ) ?: '';
    $page2 = sanitize_text_field( $attributes['page2'] ) ?: '';
    $page3 = sanitize_text_field( $attributes['page3'] ) ?: '';
    $gray  = sanitize_text_field( $attributes['gray'] ) ?: false;

    $data  = [];

    if ($page1 !== '') {
        $page1 = json_decode($page1, true);
        array_push($data, $page1["value"]);
    }

    if ($page2 !== '') {
        $page2 = json_decode($page2, true);
        array_push($data, $page2["value"]);
    }

    if ($page3 !== '') {
        $page3 = json_decode($page3, true);
        array_push($data, $page3["value"]);
    }

    $pagesCount = count($data);

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

        $html .= '<div class="card">';
        $page_url = get_permalink($page);
        ob_start();
        card_img_top(
            get_the_post_thumbnail($page, 'thumbnail_16_9_large', ['class' => 'img-fluid']),
            $page_url
        );
        $html .= ob_get_contents;
        ob_end_clean();
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
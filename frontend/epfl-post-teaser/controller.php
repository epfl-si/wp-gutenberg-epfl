<?php

namespace EPFL\Plugins\Gutenberg\PostTeaser;

function epfl_post_teaser_block( $attributes ) {

    $post1 = isset( $attributes['post1'] ) ?  sanitize_text_field( $attributes['post1'] ) : '';
    $post2 = isset( $attributes['post2'] ) ? sanitize_text_field( $attributes['post2'] ) : '';
    $post3 = isset( $attributes['post3'] ) ? sanitize_text_field( $attributes['post3'] ) : '';
    $gray  = isset( $attributes['gray'] ) ? sanitize_text_field( $attributes['gray'] ) : false;

    $postsCount = 0;
    $data  = [];

    if ($post1 !== '') {
        $post1 = json_decode($post1, true);
        array_push($data, $post1["value"]);
    }

    if ($post2 !== '') {
        $post2 = json_decode($post2, true);
        array_push($data, $post2["value"]);
    }

    if ($post3 !== '') {
        $post3 = json_decode($post3, true);
        array_push($data, $post3["value"]);
    }

    foreach($data as $key => $post) {
        if(!empty($post)) {
            $postsCount++;
        }
    }

    $html = '<div class="container-full my-3 ';
    if ($gray) {
        $html .= ' bg-gray-100';
    }
    $html .= '">';
    $html .= '<div class="container">';
    $html .= '  <div class="card-deck';
    if ($postsCount < 3) {
        $html .= ' card-deck-line';
    }
    $html .= ' ">';

    foreach($data as $key => $post) {
        if (empty($post)) {
            continue;
        }

        $post = get_post($post);
        $post_url = get_permalink($post);

        $html .= '<a href="' . $post_url . '" class="card link-trapeze-horizontal">';
        ob_start();
        card_img_top(
                    get_the_post_thumbnail($post, 'thumbnail_16_9_large', ['class' => 'img-fluid']),
                    $post_url,
                    false
                );
        $html .= ob_get_contents();
        ob_end_clean();
        $html .= '<div class="card-body">';
        $html .= '<h3 class="card-title">';
        $html .= $post->post_title;
        $html .= '</h3>';
        $html .= '<div class="card-info">';
        $html .= '<span class="card-info-date">' . get_the_date('d-m-Y', $post->ID) . '</span>';
        $html .= '</div>';

        $excerpt = epfl_excerpt($post);
        if (!empty($excerpt)) {
            $html .= '<p>' . $excerpt . '</p>';
        }
        $html .= '</div>';
        $html .= '</a>';
    }
    $html .= '</div>';
    $html .= '</div>';
    $html .= '</div>';

    return $html;

}
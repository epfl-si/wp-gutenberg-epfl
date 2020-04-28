<?php

namespace EPFL\Plugins\Gutenberg\PostTeaser;

require_once(dirname(__FILE__).'/../lib/utils.php');
require_once(dirname(__FILE__).'/../lib/templates.php');

use function EPFL\Plugins\Gutenberg\Lib\Templates\card_img_top;
use function EPFL\Plugins\Gutenberg\Lib\Templates\epfl_excerpt;
use \EPFL\Plugins\Gutenberg\Lib\Utils;



function epfl_post_teaser_block( $attributes ) {

    $post1           = Utils::get_sanitized_attribute( $attributes, 'post1' );
    $post2           = Utils::get_sanitized_attribute( $attributes, 'post2' );
    $post3           = Utils::get_sanitized_attribute( $attributes, 'post3' );
    $grayBackground  = Utils::get_sanitized_attribute( $attributes, 'grayBackground', false );
    $onlyLastPosts   = Utils::get_sanitized_attribute( $attributes, 'onlyLastPosts', false );
    $postCategory    = Utils::get_sanitized_attribute( $attributes, 'postCategory' );

    $postsCount = 0;
    $data  = [];

    // if we only have to display 3 lasts posts
    if($onlyLastPosts)
    {
        $args = ['numberposts' => 3];

        /* If category to filter has been given */
        if ($postCategory !== '') {
            $postCategory = json_decode($postCategory, true);
            
            /* We ensure a category other than "None" was selected  */
            if($postCategory["value"] !==null)
            {
                $args['category'] = $postCategory["value"];
            }
        }
        
        foreach(get_posts($args) as $post)
        {
            $data[] = $post->ID;
            if(sizeof($data)==3) break;
        }
        
    }
    else
    {
        if ($post1 !== '') {
            $post1 = json_decode($post1, true);
            $data[] = $post1["value"];
        }

        if ($post2 !== '') {
            $post2 = json_decode($post2, true);
            $data[] = $post2["value"];
        }

        if ($post3 !== '') {
            $post3 = json_decode($post3, true);
            $data[] = $post3["value"];
        }
    }


    foreach($data as $post) {
        if(!empty($post)) {
            $postsCount++;
        }
    }

    $html = '<div class="container-full my-3 ';
    if ($grayBackground) {
        $html .= ' bg-gray-100';
    }
    $html .= '">';
    $html .= '<div class="container">';
    $html .= '  <div class="card-deck';
    if ($postsCount < 3) {
        $html .= ' card-deck-line';
    }
    $html .= ' ">';

    foreach($data as $post) {
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

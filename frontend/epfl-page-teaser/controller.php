<?php

// Styleguide: https://epfl-si.github.io/elements/#/molecules/card >> Inside Links

namespace EPFL\Plugins\Gutenberg\PageTeaser;

require_once(dirname(__FILE__).'/../lib/templates.php');

use function EPFL\Plugins\Gutenberg\Lib\Templates\card_img_top;
use function EPFL\Plugins\Gutenberg\Lib\Templates\epfl_excerpt;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

function epfl_page_teaser_block( $attributes ) {

    $title           = Utils::get_sanitized_attribute( $attributes, 'title', '' );
    $page1           = Utils::get_sanitized_attribute( $attributes, 'page1' );
    $page2           = Utils::get_sanitized_attribute( $attributes, 'page2' );
    $page3           = Utils::get_sanitized_attribute( $attributes, 'page3' );
    $grayBackground  = Utils::get_sanitized_attribute( $attributes, 'grayBackground', false );
    $pagesCount = 0;

    $data  = [];

    if ($page1 !== '') {
        $page1 = json_decode($page1, true);
        $data[] = $page1["value"];
    }

    if ($page2 !== '') {
        $page2 = json_decode($page2, true);
        $data[] = $page2["value"];
    }

    if ($page3 !== '') {
        $page3 = json_decode($page3, true);
        $data[] = $page3["value"];
    }

    foreach($data as $key => $page) {
        if(!empty($page)) {
            $pagesCount++;
        }
    }

    $html = '<div class="container-full my-3 py-3 ';
    if ($grayBackground) {
        $html .= ' bg-gray-100';
    }
    $html .= '">';
    $html .= '<div class="container">';
    if($title != '')
    {
        $html .= ' <h2 class="'. (($pagesCount < 3) ? ' text-center' : ''). '">'.$title.'</h2>';
    }
    $html .= '  <div class="card-deck';
    if ($pagesCount < 3) {
        $html .= ' card-deck-line';
    }
    $html .= ' ">';
    foreach($data as $key => $page) {
        if (empty($page)) {
            continue;
        }

        $page = get_post($page);

        $html .= '<div class="card">';
        $page_url = get_permalink($page);
        ob_start();
        card_img_top(
            get_the_post_thumbnail($page, 'thumbnail_16_9_large', ['class' => 'img-fluid']),
            $page_url
        );
        $html .= ob_get_contents();
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

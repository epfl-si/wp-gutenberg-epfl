<?php
namespace EPFL\Plugins\Gutenberg\Video;

/**
 * Returns HTML code to display video player
 * 
 * @param String $url Video URL
 * @param Boolean $large_display To tell if we have to display video with big or small width
 */
function epfl_video_render($url, $large_display) {

    $markup = '<div class="'.($large_display ? "container": "grid").' my-3">';
    $markup .= '<div class="embed-responsive embed-responsive-16by9">';
    $markup .= '<iframe src="' . esc_url($url) . '" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay; encrypted-media" frameborder="0" class="embed-responsive-item"></iframe>';
    $markup .= '</div>';
    $markup .= '</div>';

    return $markup;
}
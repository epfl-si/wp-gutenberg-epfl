<?php 

function epfl_video_render($url) {
    $markup = '<div class="container my-3">';
    $markup .= '<div class="embed-responsive embed-responsive-16by9">';
    $markup .= '<iframe src="' . esc_url($url) . '" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay; encrypted-media" frameborder="0" class="embed-responsive-item"></iframe>';
    $markup .= '</div>';
    $markup .= '</div>';

    return $markup;
}
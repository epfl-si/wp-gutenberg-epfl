<?php

    function epfl_google_forms_render($src, $width, $height) {

        $markup = '<div class="container my-3">';
        $markup .= '<iframe src="' . esc_url($src) .'" width="' . esc_attr($width) . '" height="' . esc_attr($height) . '" frameborder="0" marginheight="0" marginwidth="0">';
        $markup .= __("Loading...", "epfl");
        $markup .= '</iframe>';
        $markup .= '</div>';
        
        return $markup;
    }
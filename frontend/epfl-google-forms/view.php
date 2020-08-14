<?php
    // Styleguide: Not present in styleguide

    namespace EPFL\Plugins\Gutenberg\GoogleForms;

    function epfl_google_forms_render($src, $height) {

        $markup = '<div class="container my-3 centered">';
        // We use 100% of width instead of the one present in iframe HTML code because otherwise, form is not centered in parent div
        $markup .= '<iframe src="' . esc_url($src) .'" width="100%" height="' . esc_attr($height) . '" frameborder="0" marginheight="0" marginwidth="0">';
        $markup .= __("Loading...", "epfl");
        $markup .= '</iframe>';
        $markup .= '</div>';

        return $markup;
    }

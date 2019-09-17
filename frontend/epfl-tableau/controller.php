<?php

namespace EPFL\Plugins\Gutenberg\Tableau;

require_once(dirname(__FILE__).'/view.php');

function epfl_tableau_block( $attributes ) {

    # or get the already set url, width and height
    if (!empty($attributes['embedCode'])) {
        # from a copy-paste of a embed view, parse this information :
        # the view url, the width and the height
        $embed_code = urldecode($attributes['embedCode']);
        // first step, check if we have a copy paste in a editor that encode quote
        if (strpos($embed_code, "width=") !== false) {
            $matches = [];
            preg_match("#width='([0-9]+)'#", $embed_code, $matches);
            $width = $matches[1];
            preg_match("#height='([0-9]+)'#", $embed_code, $matches);
            $height = $matches[1];
            preg_match("#param name='name' value='(.*?)'\s/>#", $embed_code, $matches);
            $tableau_name = $matches[1];
        }
    }
    # set or overload url, width and height if set in the shortcode
    if (!empty($attributes['tableauName'])) {
        $tableau_name = $attributes['tableauName'];
    }
    if (!empty($attributes['width'])) {
        $width = $attributes['width'];
    }

    if (!empty($attributes['height'])) {
        $height = $attributes['height'];
    }
    // sanitize what we get
    $tableau_name = sanitize_text_field($tableau_name);
    $width = sanitize_text_field($width);
    $height = sanitize_text_field($height);

    /*
    var_dump($tableau_name);
    var_dump($width);
    var_dump($height);
    */

    $markup = epfl_tableau_render($tableau_name, $width, $height);
    return $markup;
}
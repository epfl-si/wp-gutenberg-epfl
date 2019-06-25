<?php

require_once(dirname(__FILE__).'/view.php');

function epfl_tableau_block( $attributes ) {

    # or get the already set url, width and height
    if (!empty($attributes['content'])) {
        # from a copy-paste of a embed view, parse this information :
        # the view url, the width and the height
        $embed_code = urldecode($attributes['content']);
        // first step, check if we have a copy paste in a editor that encode quote
        if (strpos($embed_code, "width=") !== false) {
            $matches = [];
            preg_match("#width='([0-9]+)'#", $embed_code, $matches);
            $width = $matches[1];
            preg_match("#height='([0-9]+)'#", $embed_code, $matches);
            $height = $matches[1];
            preg_match("#param name='name' value='(.*?)'\s/>#", $embed_code, $matches);
            $url = $matches[1];
        }
    }
    # set or overload url, width and height if set in the shortcode
    if (!empty($attributes['url'])) {
        $url = $attributes['url'];
    }
    if (!empty($attributes['width'])) {
        $width = $attributes['width'];
    }
    
    if (!empty($attributes['height'])) {
        $height = $attributes['height'];
    }
    // sanitize what we get
    $url = sanitize_text_field($url);
    $width = sanitize_text_field($width);
    $height = sanitize_text_field($height);

    /*
    var_dump($url);
    var_dump($width);
    var_dump($height);
    */ 
    
    $markup = epfl_tableau_render($url, $width, $height);
    return $markup;
}
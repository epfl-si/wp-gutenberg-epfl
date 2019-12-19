<?php

namespace EPFL\Plugins\Gutenberg\Tableau;

require_once(dirname(__FILE__).'/view.php');

function epfl_tableau_block( $attributes ) {

    $width = "";
    $height = "";
    
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

    // If we still don't have any value for size
    if($width == "")
    {
        $width = 1000;
    }
    if($height == "")
    {
        $height = 650;
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



/*
    Add tags needed by block when we copy/paste HTML content to add a Tableau.
    If we don't add tags to allowed list, they will be cleaned with WP version >5.2.4
*/
function add_block_allowed_tags($tags)
{

    if(!array_key_exists('object', $tags)) $tags['object'] = [];
    $tags['object']['width'] = true;
    $tags['object']['height'] = true;
    
    if(!array_key_exists('param', $tags)) $tags['param'] = [];
    $tags['param']['name'] = true;
    $tags['param']['value'] = true;

    return $tags;
}
add_filter('wp_kses_allowed_html', __NAMESPACE__.'\add_block_allowed_tags');
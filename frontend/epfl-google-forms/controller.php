<?php

namespace EPFL\Plugins\Gutenberg\GoogleForms;

use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/view.php');


function epfl_google_forms_block( $attributes ) {

    /*
    NOTE:
    This block also allow to use others subdomains of Google (.google.com) like maps, calendar, etc...
    */

    $url = Utils::get_sanitized_attribute( $attributes, 'url', null);
    $height = Utils::get_sanitized_attribute( $attributes, 'height', null);


    /* Checking if all attributes are present */
    if($url===null || $height===null)
    {
        return Utils::render_user_msg(__("Error extracting parameters", "epfl"));
    }
    /* Extract host name to check it */
    $url_host = parse_url($url, PHP_URL_HOST);
    
    /* Check that iframe has a Google host as source */
    if(preg_match('/\.google\.com$/', $url_host) !== 1)
    {
        return Utils::render_user_msg(__("Incorrect URL found", "epfl"));
    }

    if(!is_numeric($height))
    {
        return Utils::render_user_msg(__("Incorrect dimensions found", "epfl"));
    }

    $markup = epfl_google_forms_render($url, $height);
    return $markup;
}


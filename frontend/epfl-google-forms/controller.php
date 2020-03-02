<?php

namespace EPFL\Plugins\Gutenberg\GoogleForms;

use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/view.php');

/*
    Extracts an attribute from givent HTML code.
    $attribute  -> Attribute name to extract
    $from_code  -> HTML code in which to look for attribute.
*/
function epfl_google_forms_get_attribute($attribute, $from_code)
{
    if(preg_match('/'.$attribute.'="(.*?)"/', $from_code, $matches)!==1)
    {
        return null;
    }
    return $matches[1];
}

function epfl_google_forms_block( $attributes ) {

    /*
    data contains thing like (encoded):
    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeLZkqncWIvRbQvnn3K8yKUEn0Of8s-JTFZ3l94TWAIHnovJA/viewform?embedded=true" width="640" height="663" frameborder="0" marginheight="0" marginwidth="0">Chargement en cours...</iframe>

    NOTE:
    This block also allow to use others subdomains of Google (.google.com) like maps, calendar, etc...
    */

    $data = isset( $attributes['data'] ) ? urldecode($attributes['data']) : '';

    /* Extracting needed attributes */
    $src = epfl_google_forms_get_attribute('src', $data);
    $height = epfl_google_forms_get_attribute('height', $data);

    /*
    var_dump($src);
    var_dump($height);
    */

    /* Checking if all attributes are present */
    if($src===null || $height===null)
    {
        return Utils::render_user_msg(__("Error extracting parameters", "epfl"));
    }
    /* Extract host name to check it */
    $url_host = parse_url($src, PHP_URL_HOST);
    
    /* Check that iframe has a Google host as source */
    if(preg_match('/\.google\.com$/', $url_host) !== 1)
    {
        return Utils::render_user_msg(__("Incorrect URL found", "epfl"));
    }

    if(!is_numeric($height))
    {
        return Utils::render_user_msg(__("Incorrect dimensions found", "epfl"));
    }

    $markup = epfl_google_forms_render($src, $height);
    return $markup;
}


<?php

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
    */
    
    $data = isset( $attributes['content'] ) ? $attributes['content'] : '';
    
    /* Extracting needed attributes */
    $src = epfl_google_forms_get_attribute('src', $data);
    $width = epfl_google_forms_get_attribute('width', $data);
    $height = epfl_google_forms_get_attribute('height', $data);
    
    /*
    var_dump($src);
    var_dump($width);
    var_dump($height);
    */

    /* Checking if all attributes are present */
    if($src===null || $height===null || $width===null)
    {
        return Utils::render_user_msg(__("Error extracting parameters", "epfl"));
    }
    
    /* Check that iframe has a Google Forms URL as source */
    if(strpos($src, 'https://docs.google.com/forms') > 0)
    {
        return Utils::render_user_msg(__("Incorrect URL found", "epfl"));
    }
    
    if(!is_numeric($width) || !is_numeric($height))
    {
        return Utils::render_user_msg(__("Incorrect dimensions found", "epfl"));
    }
    
    $markup = epfl_google_forms_render($src, $width, $height);
    return $markup;
    
}

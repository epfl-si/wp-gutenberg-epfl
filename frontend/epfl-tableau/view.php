<?php

function epfl_tableau_render($url, $width, $height) {

    /*
    var_dump($url);
    var_dump($width);
    var_dump($height);
    */

    $markup = '<script type="text/javascript" src="https://tableau.epfl.ch/javascripts/api/viz_v1.js"></script>';
    $markup .= '<div class="tableauPlaceholder" style="width: ' . esc_attr($width) . 'px; height: ' . esc_attr($height) . 'px;">';
    $markup .= '<object class="tableauViz" width="' . esc_attr($width) . ' height="' . esc_attr($height) . '" style="display:none;">';
    $markup .= '<param name="host_url" value="https%3A%2F%2Ftableau.epfl.ch%2F" />';
    $markup .= '<param name="embed_code_version" value="3" />';
    $markup .= '<param name="site_root" value="" />';
    $markup .= '<param name="name" value="' . esc_attr($url) . '" />';
    $markup .= '<param name="tabs" value="no" />';
    $markup .= '<param name="toolbar" value="yes" />';
    $markup .= '<param name="showAppBanner" value="false" />';
    $markup .= '<param name="filter" value="iframeSizedToWindow=true" />';
    $markup .= '</object>';
    $markup .= '</div>';
    
    // var_dump($markup);
    
    return $markup;

}
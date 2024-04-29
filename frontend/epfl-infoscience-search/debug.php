<?php

namespace EPFL\Plugins\Gutenberg\InfoscienceSearch;

require_once('render.php');

/*
 * Return a div showing information about the current block usage
 */
function get_debug_info_div(
    $attributes,
    $cache_in_use,
    $server_engine_name,  # which server engine is in use
    $publications = []  # set it to something if you want to debug data
): string {
    $debug_div = '<div class="container-full border-top border-bottom p-4">';

    $debug_div .= '<h3>Debug</h3>';

    $debug_div .= '<p>Server Engine: ' . var_export($server_engine_name, true) . '</p>';

    // server engine ID
    $debug_div .= '<p>Identified server engine: ';
    if ( $server_engine_name == null ) {
        $debug_div .= 'untested (cache may be in use)';
    } else if ( $server_engine_name == '' ) {
        $debug_div .= 'unknown';
    } else {
        $debug_div .= $server_engine_name;
    }
    $debug_div .= '</p>';


    $debug_div .= '<p>Cache in use: ' . $cache_in_use . '</p>';

    $debug_div .= '<h4>Attributes</h4>';
    $debug_div .= '<pre>'. var_export($attributes, true) . '</pre>';

    if ( $publications ) {
        $debug_div .= '<h4>Data</h4>';
        $debug_div .=  RawInfoscienceRender::render( $publications, 'infoscience.epfl.ch/xxxxxx' );
    }

    $debug_div .= '</div>';

    return $debug_div;
}

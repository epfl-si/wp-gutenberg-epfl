<?php

namespace EPFL\Plugins\Gutenberg\InfoscienceSearch;

require_once('render.php');

/*
 * Return a div showing information about the current block usage
 */
function get_debug_info_div(
    $attributes,
    $cache_in_use,
    $publications = []  # set it to something if you want to debug data
): string {
    $debug_div = '<div class="container-full border p-4">';

    $debug_div .= '<h3>Debug</h3>';

    if ( $cache_in_use ) {
        $debug_div .= '<p>Cache in use: ' . $cache_in_use . '</p>';
    }

    if ( $attributes ) {
        $debug_div .= '<p>Attributes</p>';
        $debug_div .= '<pre>'. var_export($attributes, true) . '</pre>';
    }

    if ( $publications ) {
        $debug_div .= '<h4>Data</h4>';
        $debug_div .=  RawInfoscienceRender::render( $publications, 'infoscience.epfl.ch/xxxxxx' );
    }

    $debug_div .= '</div>';

    return $debug_div;
}

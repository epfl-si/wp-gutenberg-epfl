<?php

function epfl_infoscience_search_block( $attributes ) {

    $direct_url     = sanitize_text_field( $attributes['directUrl'] ) ?: '';

    var_dump($direct_url);

    return "this is infoscience";
}

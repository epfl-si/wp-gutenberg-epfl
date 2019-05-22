<?php

function epfl_people_block( $attributes ) {

    $units    = sanitize_text_field( $attributes['units'] ) ?: '';
    $scipers  = sanitize_text_field( $attributes['scipers'] ) ?: '';
    $fonction = sanitize_text_field( $attributes['fonction'] ) ?: '';
    $columns  = sanitize_text_field( $attributes['columns'] ) ?: '';

    return '<h1>People</h1>';

}
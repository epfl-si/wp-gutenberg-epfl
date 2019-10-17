<?php

namespace EPFL\Plugins\Gutenberg\People;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');
require_once(dirname(__FILE__).'/view.php');

/**
 * Return int > 0 if $person_a->nom > $person_b->nom.
 */
function epfl_people_person_compare($person_a, $person_b) {
    // normalize replace accents
    return strnatcmp(Utils::normalize($person_a->nom), Utils::normalize($person_b->nom));
}

/**
 * Sort an array on the key with another array
 * Used for the sorting by sciper list
 */
function epfl_people_sortArrayByArray($data,$orderArray) {
    $result = array(); // result array
    foreach($orderArray as $key => $value) { // loop
        foreach ($data as $k => $val) {
            if ($data[$k]->sciper === $value) {
                $result[$key] = $data[$k];
            }
        }
    }
    return $result;
}

function epfl_people_block( $attributes ) {

    $units            = Utils::get_sanitized_attribute( $attributes, 'units' );
    $scipers          = Utils::get_sanitized_attribute( $attributes, 'scipers' );
    $doctoral_program = Utils::get_sanitized_attribute( $attributes, 'doctoralProgram' );
    $function         = Utils::get_sanitized_attribute( $attributes, 'fonction' );
    $columns          = Utils::get_sanitized_attribute( $attributes, 'columns', '3' );
    $order            = Utils::get_sanitized_attribute( $attributes, 'order', 'alphabetical' );

    /*
    var_dump($units);
    var_dump($scipers);
    var_dump($doctoral_program);
    var_dump($fonction);
    var_dump($columns);
    var_dump($order);
    */

    // Delete all whitespace (including tabs and line ends)
    $units = preg_replace('/\s+/','',$units);
    $scipers = preg_replace('/\s+/','',$scipers);
    $doctoral_program = preg_replace('/\s+/','',$doctoral_program);
    
    if ($columns !== 'list') {
        $columns = (is_numeric($columns) && intval($columns) <= 3 && intval($columns) >= 1) ? $columns : 3;
    }

    if ("" === $units && "" === $scipers && "" === $doctoral_program) {
        return Utils::render_user_msg("People shortcode: Please check required parameters");
    }

    if ("" !== $units) {
        $parameter['units'] = $units;
        $from = 'units';
    } else if ("" !== $scipers) {
        $parameter['scipers'] = $scipers;
        $from = 'scipers';
    } else {
        $parameter['progcode'] = $doctoral_program;
        $from = 'doctoral_program';
    }

    if ("" !== $function) {
        $function = str_replace(",", "+or+", $function);
        $parameter['position'] = $function;
    }

    if ("hierarchical" === $order && "" !== $units) {
      $parameter['struct'] = '1';
    }

    if (function_exists('pll_current_language')) {
        $current_language = pll_current_language();
        if ($current_language != false) {
            $parameter['lang'] = $current_language;
        }
    }

    // the web service we use to retrieve the data
    $url = "https://test-people.epfl.ch/cgi-bin/wsgetpeople/";
    $url = add_query_arg($parameter, $url);

    // retrieve the data in JSON
    $items = Utils::get_items($url);
    if (false === $items) {
        return Utils::render_user_msg("People shortcode: Error retrieving items");
    }

    // If webservice returns an error
    if(property_exists($items, 'Error'))
    {
        return Utils::render_user_msg("People shortcode: Webservice error: ".$items->Error->text);
    }

    // Create a persons list
    $persons = [];
    foreach ($items as $item) {
        $persons[] = $item;
    }

    // Sort by scipers
    if ("" !== $scipers) {
        // Respect given order when sciper
        $scipers =  array_map('intval', explode(',', $parameter['scipers']));
        $persons = epfl_people_sortArrayByArray($persons, $scipers);
    } else if ('alphabetical' === $order) {
        // Sort persons list alphabetically when units
        usort($persons, __NAMESPACE__.'\epfl_people_person_compare');
  }

    $markup = epfl_people_render($persons, $from, $columns, $order);
    return $markup;
}
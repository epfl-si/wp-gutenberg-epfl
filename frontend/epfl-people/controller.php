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

/**
 * To remove empty commas from list of entry separated by a comma
 *
 */
function epfl_people_trim_and_filter_empty($data) {
    $result = [];
    $result = explode(",", $data);
    $result = array_filter($result, 'strlen');
    return implode(",", $result) ?? "";
}

function epfl_people_block( $attributes ) {

    $units            = Utils::get_sanitized_attribute( $attributes, 'units' );
    $groups           = Utils::get_sanitized_attribute( $attributes, 'groups' );
    $scipers          = Utils::get_sanitized_attribute( $attributes, 'scipers' );
    $doctoral_program = Utils::get_sanitized_attribute( $attributes, 'doctoralProgram' );
    $function         = Utils::get_sanitized_attribute( $attributes, 'fonction' );
    $columns          = Utils::get_sanitized_attribute( $attributes, 'columns', '3' );
    $order            = Utils::get_sanitized_attribute( $attributes, 'order', ALPHABETICAL_ORDER );
    $structure        = Utils::get_sanitized_attribute( $attributes, 'structure', '1' );
    $display_function = Utils::get_sanitized_attribute( $attributes, 'displayFunction', TRUE );
    $display_room     = Utils::get_sanitized_attribute( $attributes, 'displayRoom', TRUE );
    $display_email    = Utils::get_sanitized_attribute( $attributes, 'displayEmail', TRUE );
    $display_phone    = Utils::get_sanitized_attribute( $attributes, 'displayPhone', TRUE );
    $display_custom_data    = Utils::get_sanitized_attribute( $attributes, 'displayCustomData', TRUE );
    $title            = Utils::get_sanitized_attribute( $attributes, 'title');
    $custom_data      = Utils::get_sanitized_attribute( $attributes, 'customData' );
    $filtered_fields  = Utils::get_sanitized_attribute( $attributes, 'filteredFields' );

    /*
    var_dump($units);
    var_dump($groups);
    var_dump($scipers);
    var_dump($doctoral_program);
    var_dump($function);
    var_dump($columns);
    var_dump($order);
    var_dump($structure);
    var_dump($display_function);
    var_dump($display_room);
    var_dump($display_email);
    var_dump($display_phone);
    var_dump($title);
    var_dump($custom_data);
    var_dump($filtered_fields);
    */

    $display_options = array(
      "display_function" => $display_function,
      "display_room" => $display_room,
      "display_email" => $display_email,
      "display_phone" => $display_phone,
      "display_custom_data" => $display_custom_data
    );

    // Delete all whitespace (including tabs and line ends)
    $units = preg_replace('/\s+/','',$units);
    $groups = preg_replace('/\s+/','',$groups);
    $scipers = preg_replace('/\s+/','',$scipers);
    $doctoral_program = preg_replace('/\s+/','',$doctoral_program);
    $structure = preg_replace('/\s+/','',$structure);

    // Delete whitespace before and after each comma
    // function can contain a whitespace
    $functions = explode(",", $function);
    $functions = array_map('trim', $functions);
    $function = implode(",",$functions);

    if ($columns !== 'list') {
        $columns = (is_numeric($columns) && intval($columns) <= 4 && intval($columns) >= 1) ? $columns : 4;
    }

    // The user must fill in one of the 4 fields
    if ("" === $units && "" === $scipers && "" === $doctoral_program && "" === $groups) {
        return Utils::render_user_msg("People shortcode: Please check required parameters");
    }

    if ("" !== $units) {
        $units = epfl_people_trim_and_filter_empty($units);
        $parameter['units'] = $units;
        $from = 'units';
    } else if ("" !== $groups) {
        $groups = epfl_people_trim_and_filter_empty($groups);
        $parameter['groups'] = $groups;
        $from = 'groups';
    } else if ("" !== $scipers) {
        $scipers = epfl_people_trim_and_filter_empty($scipers);
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

    if ((HIERARCHICAL_ORDER === $order || HIERARCHICAL_ORDER_WITH_TITLE === $order) && "" !== $units) {
        // People API: &struct=1 parameter corresponds to the hierarchical order
        if ("" === $structure) {
            $structure = 1;
        }
        $parameter['struct'] = $structure;
    } else {
        $order = ALPHABETICAL_ORDER;
    }

    if (function_exists('pll_current_language')) {
        $current_language = pll_current_language();
        if ($current_language != false) {
            $parameter['lang'] = $current_language;
        }
    }

    // the web service we use to retrieve the data
    $url = "https://people.epfl.ch/cgi-bin/wsgetpeople/";
    $url = add_query_arg($parameter, $url);

    // retrieve the data in JSON
    $items = Utils::get_items($url, 300, 15);

    if (false === $items) {
        return Utils::render_user_msg("People block: Error retrieving items");
    }

    // If webservice returns an error
    if(is_object($items) && property_exists($items, 'Error'))
    {
        return Utils::render_user_msg("People block: Webservice error: ".$items->Error->text);
    }

    // Create a persons list
    $persons = [];
    foreach ($items as $item) {
        $persons[] = $item;
    }

    // Sort by scipers
    if ("" !== $scipers) {
        // Respect given order when sciper
        $scipers = array_map('intval', explode(',', $parameter['scipers']));
        $persons = epfl_people_sortArrayByArray($persons, $scipers);
    } else if ("" !== $units || "" !== $doctoral_program || "" !== $groups) {
        // Sort persons list alphabetically when units, doctoral program or groups
        usort($persons, __NAMESPACE__.'\epfl_people_person_compare');
    }

    $markup = epfl_people_render($persons, $from, $columns, $order, $title, $display_options, $custom_data, $filtered_fields);
    return $markup;

}

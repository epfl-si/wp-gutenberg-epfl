<?php

    // Styleguide: https://epfl-si.github.io/elements/#/organisms/contact

    namespace EPFL\Plugins\Gutenberg\People;

    require_once(dirname(__FILE__) . '/utils.php');
    require_once(dirname(__FILE__) . '/templates/list.php');
    require_once(dirname(__FILE__) . '/templates/hierarchical-list.php');
    require_once(dirname(__FILE__) . '/templates/hierarchical-with-title-list.php');
    require_once(dirname(__FILE__) . '/templates/dynamic-card.php');
    require_once(dirname(__FILE__) . '/templates/card.php');
    require_once(dirname(__FILE__) . '/templates/hierarchical-card.php');
    require_once(dirname(__FILE__) . '/templates/hierarchical-with-title-card.php');

    function epfl_people_render($persons, $from, $columns, $order, $title, $display_options, $custom_data = "", $filtered_fields = "") {
        /*
        var_dump($persons);
        var_dump($from);
        var_dump($columns);
        var_dump($custom_data);
        var_dump($filtered_fields);
        */

        // Calling the  epfl_dynamic_people_card function directly if selected.
        if ( ALPHABETICAL_ORDER === $order && $columns === '4') {
            return epfl_dynamic_people_card($persons, $from, '3', $custom_data, $filtered_fields, $display_options);
        }

        /* You may wonder why we don't directly call "epfl_people_card" function with all
        3 parameters? Because it doesn't work... only the first 2 paramters are given to
        the function. I don't know why... there's probably a reason but I'm lazy and don't 
        want to go through documentation. But, I thought it was important to put a comment
        here to avoid others persons to want to simplify this code by directly calling 
        "epfl_people_card" and not understand why it's not working... */

        // here is a protection, so we don't call accidentally an existant function, as it happens sometimes
        // as only allowed values are 1 and 3, as there is no such function with *_2 or *_4...
        if ( intval($columns) == 2 || intval($columns) == 4 ) {
            $columns = 3;
        }

        if ( ALPHABETICAL_ORDER === $order ) {
            $function_to_be_called = __NAMESPACE__ . '\epfl_people_' . $columns;
            return $function_to_be_called($persons, $from, $title, $display_options);
        }

        if ( HIERARCHICAL_ORDER === $order ) {
            $function_to_be_called = __NAMESPACE__ . '\epfl_people_hierarchical_' . $columns;
            return $function_to_be_called($persons, $from, $title, $display_options);
        }

        if ( HIERARCHICAL_ORDER_WITH_TITLE === $order ) {
          $function_to_be_called = __NAMESPACE__ . '\epfl_people_hierarchical_with_title_' . $columns;
          return $function_to_be_called($persons, $from, $title, $display_options);
        }

        return Utils::render_user_msg("People block: Error unknown parameter for 'order'");
    }

    function epfl_people_1($persons, $from, $title, $display_options) {
        return epfl_people_card($persons, $from, '1', $title, $display_options);
    }

    function epfl_people_3($persons, $from, $title, $display_options) {
        return epfl_people_card($persons, $from, '3', $title, $display_options);
    }

    function epfl_people_hierarchical_1($persons, $from, $title, $display_options) {
        return epfl_people_hierarchical_card($persons, $from, '1', $title, $display_options);
    }

    function epfl_people_hierarchical_3($persons, $from, $title, $display_options) {
        return epfl_people_hierarchical_card($persons, $from, '3', $title, $display_options);
    }

    function epfl_people_hierarchical_with_title_1($persons, $from, $title, $display_options) {
        return epfl_people_hierarchical_with_title_card($persons, $from, '1', $title, $display_options);
    }

    function epfl_people_hierarchical_with_title_3($persons, $from, $title, $display_options) {
        return epfl_people_hierarchical_with_title_card($persons, $from, '3', $title, $display_options);
  }

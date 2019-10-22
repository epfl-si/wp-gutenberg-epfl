<?php
    namespace EPFL\Plugins\Gutenberg\People;

    require_once(dirname(__FILE__) . '/utils.php');
    require_once(dirname(__FILE__) . '/templates/list.php');
    require_once(dirname(__FILE__) . '/templates/hierarchical-list.php');
    require_once(dirname(__FILE__) . '/templates/card.php');
    require_once(dirname(__FILE__) . '/templates/hierarchical-card.php');

    function epfl_people_render($persons, $from, $columns, $order) {

        //var_dump($persons);
        //var_dump($from);
        //var_dump($columns);

        /* You may wonder why we don't directly call "epfl_people_card" function with all
        3 parameters? Because it doesn't work... only the first 2 paramters are given to
        the function. I don't know why... there's probably a reason but I'm lazy and don't 
        want to go through documentation. But, I thought it was important to put a comment
        here to avoid others persons to want to simplify this code by directly calling 
        "epfl_people_card" and not understand why it's not working... */
      
        if ( ALPHABETICAL_ORDER === $order ) {
            $function_to_be_called = __NAMESPACE__ . '\epfl_people_' . $columns;
            $markup = $function_to_be_called($persons, $from);
        } else if ( HIERARCHICAL_ORDER === $order ) {
            $function_to_be_called = __NAMESPACE__ . '\epfl_people_hierarchical_' . $columns;
            $markup = $function_to_be_called($persons, $from);
        }

        return $markup;
    }

    function epfl_people_1($persons, $from) {
        return epfl_people_card($persons, $from, '1');
    }

    function epfl_people_3($persons, $from) {
        return epfl_people_card($persons, $from, '3');
    }

    function epfl_people_hierarchical_1($persons, $from) {
      return epfl_people_hierarchical_card($persons, $from, '1');
    }

    function epfl_people_hierarchical_3($persons, $from) {
        return epfl_people_hierarchical_card($persons, $from, '3');
    }

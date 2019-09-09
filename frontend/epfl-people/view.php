<?php
    namespace EPFL\Plugins\Gutenberg\People;

    require_once(dirname(__FILE__) . '/utils.php');
    require_once(dirname(__FILE__) . '/templates/list.php');
    require_once(dirname(__FILE__) . '/templates/card.php');

    function epfl_people_render($persons, $from, $columns) {

        //error_log("epfl_people_render persons: ".$persons);
        //error_log("epfl_people_render from: ".$from);
        //error_log("epfl_people_render columns: ".$columns);

        $function_to_be_called = __NAMESPACE__.'\epfl_people_'.$columns;
        $markup = $function_to_be_called($persons, $from);
        return $markup;
    }

    function epfl_people_1($persons, $from) {
        return epfl_people_card($persons, $from, '1');
    }
    function epfl_people_3($persons, $from) {
        return epfl_people_card($persons, $from, '3');
    }


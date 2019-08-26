<?php
    namespace EPFL\Plugins\Gutenberg\People;

    require_once(dirname(__FILE__) . '/utils.php');
    require_once(dirname(__FILE__) . '/templates/list.php');
    require_once(dirname(__FILE__) . '/templates/card.php');

    function epfl_people_render($persons, $from, $columns) {

        //var_dump($persons);
        //var_dump($from);
        //var_dump($columns);

        $function_to_be_called = "epfl_people_" . $columns;
        $markup = $function_to_be_called($persons, $from);
        return $markup;
    }

    function epfl_people_1($persons, $from) {
        return epfl_people_card($persons, $from, '1');
    }

    function epfl_people_3($persons, $from) {
        return epfl_people_card($persons, $from, '3');
    }

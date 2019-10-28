<?php
    namespace EPFL\Plugins\Gutenberg\People;
    // colums = 1
    function epfl_people_hierarchical_list($persons, $from) {

        /*
        var_dump($persons);
        var_dump($from);
        */

        $markup = '<div class="container my-3">';
        $markup .= '<div class="contact-list">';

        foreach($persons as $index => $element) { 
          
            foreach($element->members as $index => $person) {

                $photo_url  = epfl_people_get_photo($person);
                $phones     = epfl_people_get_phones($person, HIERARCHICAL_ORDER);
                $function   = epfl_people_get_function($person, $from, HIERARCHICAL_ORDER);
                $room       = epfl_people_get_room($person, $from, HIERARCHICAL_ORDER);
                $room_url   = epfl_people_get_room_url($room);
                $people_url = epfl_people_get_people_url($person);
    
                include(dirname(__FILE__) . '/includes/list-part.inc.php');

            }
        }

        $markup .= '</div>';
        $markup .= '</div>';

        return $markup;

    }
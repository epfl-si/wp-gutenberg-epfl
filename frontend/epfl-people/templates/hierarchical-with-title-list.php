<?php
    namespace EPFL\Plugins\Gutenberg\People;
    // colums = 1
    function epfl_people_hierarchical_with_title_list($persons, $from, $display_options) {
        /*
        var_dump($persons);
        var_dump($from);
        */

        $markup = '<div class="container my-3">';

        foreach($persons as $index => $element) { 
            $markup .= '<h4 class="my-3">' . $element->label . '</h4>';
            $markup .= '<div class="contact-list">';

            $members = delete_duplicate_persons($element->members);
            sort_members($members);

            foreach($members as $index => $person) {

                $photo_url  = epfl_people_get_photo($person);
                $phones     = epfl_people_get_phones($person, HIERARCHICAL_ORDER);
                $function   = epfl_people_get_function($person, $from, HIERARCHICAL_ORDER);
                $room       = epfl_people_get_room($person, $from, HIERARCHICAL_ORDER);
                $room_url   = epfl_people_get_room_url($room);
                $people_url = epfl_people_get_people_url($person);
    
                include(dirname(__FILE__) . '/includes/list-part.inc.php');

            }
            $markup .= '</div>';
        }

        $markup .= '</div>';

        return $markup;

    }
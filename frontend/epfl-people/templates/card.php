<?php
namespace EPFL\Plugins\Gutenberg\People;

    // colums = 1 and 3
    function epfl_people_card($persons, $from, $columns) {

        $markup = '<div class="container my-3">';

        if ($columns === '3') {
            $markup .= '<div class="card-deck">';
        }
        
        foreach($persons as $index => $person) {
            $photo_url = epfl_people_get_photo($person);
            
            if ($photo_url) {
                $photo_url = esc_url($photo_url);
            } else {     
                $photo_url = get_template_directory_uri() . '/assets/images/defaults/person-avatar-default-small.png';    
            }
            
            $phones     = epfl_people_get_phones($person, ALPHABETICAL_ORDER);
            $function   = epfl_people_get_function($person, $from, ALPHABETICAL_ORDER);
            $room       = epfl_people_get_room($person, $from, ALPHABETICAL_ORDER);
            $room_url   = epfl_people_get_room_url($room);
            $people_url = epfl_people_get_people_url($person);
              
            include(dirname(__FILE__) . '/includes/card-part.inc.php');
        }
       
        for ($i=$index+1; $i % $columns != 0; $i++) {
            $markup .= '<div class="">';
            $markup .= '</div>';
        }
        if ($columns === '3') {
            $markup .= '</div>';
        }
        $markup .= '</div>'; 

        return $markup;
    }
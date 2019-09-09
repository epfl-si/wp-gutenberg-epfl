<?php
namespace EPFL\Plugins\Gutenberg\People;
    // colums = 1
    function epfl_people_list($persons, $from) {

        /*
        var_dump($persons);
        var_dump($from);
        */

        $markup = '<div class="container my-3">';
        $markup .= '<div class="contact-list">';
      
        foreach($persons as $index => $person){
        
            $photo_url  = epfl_people_get_photo($person);
            $phones     = epfl_people_get_phones($person);
            $function   = epfl_people_get_function($person, $from);
            $room       = epfl_people_get_room($person, $from);
            $room_url   = epfl_people_get_room_url($room);
            $people_url = epfl_people_get_people_url($person);

            $markup .= '<div class="contact-list-row" itemscope itemtype="http://schema.org/Person">';
            $markup .= '<div class="contact-list-avatar" itemprop="image">';

            if ($photo_url) {
                $markup .= '<picture>';
                $markup .= '<img src="' . esc_url($photo_url) . '" style="width:1.9rem;" class="img-fluid rounded-circle" alt="' . esc_attr($person->prenom) . '" "' . esc_attr($person->nom) . '">';
                $markup .= '</picture>';
            }
            
            $markup .= '</div>';
            $markup .= '<a href="' . esc_url($people_url) . '" class="contact-list-item" itemprop="name">' . esc_attr($person->prenom) . ' ' . esc_attr($person->nom) . '</a>';
            $markup .= '<p class="contact-list-item m-0 text-muted" itemprop="jobTitle">' . esc_html($function) . '</p>';
            $markup .= '<a class="contact-list-item text-muted" href="mailto:"' . esc_attr($person->email) . '" itemprop="email">' . esc_attr($person->email) . "</a>";
            
            if (isset($phones[0])) { 
                $markup .= '<a class="contact-list-item text-muted" href="tel:"'. esc_html($phones[0]) . '" itemprop="telephone">';
                $markup .= '+41 21 69 <b>' . esc_html($phones[0]) . '</b>';
            }

            $markup .= '</a>';
            $markup .= '<a class="contact-list-item text-muted" href="' . esc_url($room_url) . '" itemprop="workLocation">' . esc_html($room) . '</a>';
            $markup .= '</div>';
        }

        $markup .= '</div>';
        $markup .= '</div>';

        return $markup;
    }
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
            
            $phones     = epfl_people_get_phones($person);
            $function   = epfl_people_get_function($person, $from);
            $room       = epfl_people_get_room($person, $from);
            $room_url   = epfl_people_get_room_url($room);
            $people_url = epfl_people_get_people_url($person);
              
            $markup .= '<div class="card">';
            $markup .= '<div class="card-body">';
            $markup .= '<div class="my-3 align-items-center">';
            // this inline style can be removed next time we apply a new Styleguide version 
            $markup .= '<img style="height:8rem;" class="img-fluid rounded-circle mb-2 person-card-avatar" src="' . $photo_url . '" alt="' . esc_attr($person->prenom) . ' ' . esc_attr($person->nom) . '">';
            $markup .= '</div>';
            $markup .= '<h3><a class="link-pretty" href="' . esc_url($people_url) . '">' . esc_html($person->prenom) . ' ' . esc_html($person->nom) . '</a></h3>';
            $markup .= '<dl class="definition-list definition-list-grid mb-0">';      
            
            if ($function) {
                $markup .= '<dt>' . __('Position', 'epfl') . '</dt>';
                $markup .= '<dd>' . esc_html($function) . '</dd>';
            } else {
                // Quickfix until fixed in Styleguide 
                $markup .= '<dt></dt>';
                $markup .= '<dd>&nbsp;</dd>';
            }
            if ($room) {                
                $markup .= '<dt>' . __('Office', 'epfl') . '</dt>';
                $markup .= '<dd><a class="link-pretty" href="' . esc_url($room_url) . '">' . esc_html($room) . '</a></dd>';
            } else {
                // Quickfix until fixed in Styleguide 
                $markup .= '<dt></dt>';
                $markup .= '<dd>&nbsp;</dd>';
            }
            
            $markup .= '</dl>';
            $markup .= '<div class="w-100 mt-2 mt-md-0">';
            if ($person->email) {
                $markup .= '<a class="btn btn-block btn-primary mb-2" href="mailto:' . esc_attr($person->email) . '">' . esc_html($person->email) . '</a>';
            }
            if (isset($phones[0])) {
                $markup .= '<a class="btn btn-block btn-secondary" href="tel:+412169' . esc_html($phones[0]) . '">+41 21 69 ' . esc_html($phones[0]) . '</a>';
            }
            $markup .= '</div>';
            $markup .= '</div>';
            $markup .= '</div>';
            if($index % $columns == 0) {
                $markup .= '</div">';
            }
            
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
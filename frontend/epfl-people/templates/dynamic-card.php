<?php
namespace EPFL\Plugins\Gutenberg\People;

    function epfl_dynamic_people_card($persons, $from, $columns, $custom_data = "", $filtered_fields = "", $display_options) {

        $position_label =  __('Position', 'epfl');

        $office_label = __('Office', 'epfl');

        // Try to load he custom data in the script if available.
        try {
            $jsonObj = json_decode($custom_data, true);
        } catch (Exception $e) {
            $custom_data = "{}";
        }

        // Try to load the filtered_fields in the script if available.
        try {
            $fields = explode(",", $filtered_fields);
            $joined = implode("','", $fields);
            $checkbox_fields = "['$joined']";
        } catch (Exception $e) {
            $checkbox_fields = "[]";
        }

        $people_data = "";

        foreach($persons as $index => $person) {
            $person_custom_data = NULL;
            $person_sciper = $person->sciper;
            $person_name = $person->prenom;
            $person_surname = $person->nom;
            $person_email = $person->email;
            $photo_url = epfl_people_get_photo($person);
            if (!$photo_url) {
                $photo_url = get_template_directory_uri() . '/assets/images/defaults/person-avatar-default-small.png';    
            }
            $phones     = epfl_people_get_phones($person, ALPHABETICAL_ORDER);
            $function   = epfl_people_get_function($person, $from, ALPHABETICAL_ORDER);
            $room       = epfl_people_get_room($person, $from, ALPHABETICAL_ORDER);
            $room_url   = epfl_people_get_room_url($room);
            $people_url = epfl_people_get_people_url($person);

            try {
                $sciper_str = (string) $person_sciper;
                $this_custom = $jsonObj[$sciper_str];
                $person_custom = json_encode($this_custom);
            } catch (Exception $e) {
                $person_custom = 'undefined';
            }

            $people_data .= "
                {
                    sciper: '$person_sciper',
                    picture: '$photo_url',
                    position: '$function',
                    phone: '$phones[0]',
                    room: '$room',
                    roomUrl: '$room_url',
                    peopleUrl: '$people_url',
                    name: '$person_name',
                    lastname: '$person_surname',
                    email: '$person_email',
                    custom: $person_custom
                },
            ";
        }

        // Include the 'Dynamic' JS file dealing with the cards and filters
        include(dirname(__FILE__) . '/includes/dynamic-card-part.inc.php');


        // Adding class container 
        $markup .= '<div class="container my-3" id="main-people-container"><div id="dyn-filters"></div><div id="dyn-cards"><div></div>';

        return $markup; 
    }
?>
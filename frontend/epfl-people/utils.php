<?php

namespace EPFL\Plugins\Gutenberg\People;

define("HIERARCHICAL_ORDER", "hierarchical");
define("ALPHABETICAL_ORDER", "alphabetical");

function get_first_name($person, $order) {
  $first_name = "";
  if (HIERARCHICAL_ORDER === $order) {
    $first_name = $person->members[0]->prenom;
  } else if ( ALPHABETICAL_ORDER === $order ) {
    $first_name = $person->prenom;
  }
  return $first_name;
}

function get_last_name($person, $order) {
  $last_name = "";
  if (HIERARCHICAL_ORDER === $order) {
    $last_name = $person->members[0]->nom;
  } else if ( ALPHABETICAL_ORDER === $order ) {
    $last_name = $person->nom;
  }
  return $last_name;
}

function get_photo_slug($person, $order) {
  $photo_slug = '';
  if (property_exists($person, 'members') && HIERARCHICAL_ORDER === $order) {
    $photo_slug = $person->members[0]->people->photo_show;
  } else if (property_exists($person, 'people') && ALPHABETICAL_ORDER === $order) {
    $photo_slug = $person->people->photo_show;
  }
  return $photo_slug;
}

function get_sciper($person, $order) {
  $sciper = "";
  if (HIERARCHICAL_ORDER === $order) {
    $sciper = $person->members[0]->sciper;
  } else if ( ALPHABETICAL_ORDER === $order ) {
    $sciper = $person->sciper;
  }
  return $sciper;
}

function get_email($person, $order) {
  $email = "";
  if ( HIERARCHICAL_ORDER === $order ) {
    $email = $person->members[0]->email;
  } else if ( ALPHABETICAL_ORDER === $order ) {
    $email = $person->email;
  }
  return $email;
}

/**
 * Get person photo
 */
function epfl_people_get_photo($person, $order) {
    $photo_url = "";
    if( "1" == get_photo_slug($person, $order) ) {
        $photo_url = "https://test-people.epfl.ch/private/common/photos/links/" . get_sciper($person, $order) . ".jpg";
    }
    return $photo_url;
}

/**
 * Get person phones number
 */
function epfl_people_get_phones($person, $order) {
    
  $phones = [];

    if ( ALPHABETICAL_ORDER === $order ) {      
        foreach($person->unites as $current_unit) {
            $phones = array_merge($phones, array_filter($current_unit->phones));
        }
    } else if ( HIERARCHICAL_ORDER === $order ) {
        $phones = array_filter($person->members[0]->phones);
    }
    
    /* Looping through phone numbers to reformat them to have same format as the one on https://www.local.ch,
    EX: +41 21 693 22 24 */
    foreach($phones as $key => $phone){
        /* If short format (ex: 32224) */
        if(preg_match('/^([0-9])([0-9]{2,2})([0-9]{2,2})$/', $phone, $matches) === 1)
        {
            unset($matches[0]); // remove full phone number (equivalent to $phone)
            $phones[$key] = "+41 21 69".implode(" ", $matches);
        }
        /* if long format without international (ex: 0216932224) */
        elseif(preg_match('/^([0-9])([0-9]{2,2})([0-9]{3,3})([0-9]{2,2})([0-9]{2,2})$/', $phone, $matches) === 1)
        {
            unset($matches[0]); // remove full phone number (equivalent to $phone)
            unset($matches[1]); // remove first digit (0) before local indentifier
            $phones[$key] = "+41 ".implode(" ", $matches);
        }
        
        /* There's no other condition to reformat because normally there is no other format in people.epfl.ch */
    }

    return array_unique($phones);
}

/**
 * Get person function
 */
function epfl_people_get_function($person, $from, $order) {
  $function = '';
    if ( ALPHABETICAL_ORDER === $order ) {
        $nb_units = count((array)$person->unites);
        foreach($person->unites as $current_unit) {
            if ($from == 'units' || $from == 'doctoral_program' || ($from == 'scipers' && $current_unit->ordre  == 1)) {
                $language = get_current_language();
                if ($language === 'fr') {
                    $function = $current_unit->fonction_fr;
                } else {
                    $function = $current_unit->fonction_en;
                }
            }
        }
    } else if ( HIERARCHICAL_ORDER === $order ) {
        $language = get_current_language();
        if ($language === 'fr') {
            $function = $person->members[0]->fonction_fr;
        } else {
            $function = $person->members[0]->fonction_en;
        }
    }
    return $function;
}

/**
 * Get person room
 */
function epfl_people_get_room($person, $from, $order) {

    $room = '';
    if ( ALPHABETICAL_ORDER === $order ) {
      foreach($person->unites as $current_unit) {
          if ($from == 'units' || $from == 'doctoral_program' || ($from == 'scipers' && $current_unit->ordre  == 1)) {
              $room = $current_unit->rooms;
          }
      }
    } else if ( HIERARCHICAL_ORDER === $order ) {
      $room = $person->members[0]->rooms;
    }
    return $room;
}

/**
 * Get URL room
 */
function epfl_people_get_room_url($room) {
    return "https://plan.epfl.ch/?room=" . $room;
}

/**
 * Get URL people
 */
function epfl_people_get_people_url($person, $order) {

    $slug = "";
    if (get_email($person, $order)) {
        $slug = str_replace("@epfl.ch", "", get_email($person, $order));
    } else {
        $slug = get_sciper($person, $order);
    }
    return "https://people.epfl.ch/" . $slug;
}

?>
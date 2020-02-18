<?php

namespace EPFL\Plugins\Gutenberg\People;

define(__NAMESPACE__ . "\HIERARCHICAL_ORDER", "hierarchical");
define(__NAMESPACE__ . "\HIERARCHICAL_ORDER_WITH_TITLE", "hierarchical-with-title");
define(__NAMESPACE__ . "\ALPHABETICAL_ORDER", "alphabetical");

/**
 * Delete duplicate entry from array
 */
function delete_duplicate_persons($array) {
  $temp_array = array();
  $i = 0;
  $key_array = array();

  foreach($array as $val) {
      if (!in_array($val->sciper, $key_array)) {
          $key_array[$i] = $val->sciper;
          $temp_array[$i] = $val;
      }
      $i++;
  }
  return $temp_array;
}

/**
 * Sort by name members of same function (Hierarchical order)
 */
function sort_members(&$members)
{
    usort($members, function($a, $b) {return strcmp($a->nom, $b->nom);});
}

/**
 * Get person photo
 */
function epfl_people_get_photo($person) {
    $photo_url = "";
    if( property_exists($person, 'people') && "1" == $person->people->photo_show) {
        $photo_url = "https://people.epfl.ch/private/common/photos/links/" . $person->sciper.".jpg";
    }
    return $photo_url;
}

/**
 * Get person phones number
 */
function epfl_people_get_phones($person, $order) {
    $phones = [];
    if (HIERARCHICAL_ORDER == $order) {
      $phones = array_filter($person->phones);
    } else if (ALPHABETICAL_ORDER == $order) {
        foreach($person->unites as $current_unit) {
            $phones = array_merge($phones, array_filter($current_unit->phones));
        }
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
    if (HIERARCHICAL_ORDER == $order) {
        $language = get_current_language();
        if ($language === 'fr') {
            $function = $person->fonction_fr;
        } else {
            $function = $person->fonction_en;
        }
    } else if (ALPHABETICAL_ORDER == $order) {
        $nb_units = count((array)$person->unites);
        foreach($person->unites as $current_unit) {
            $one_order = (($from == 'groups' || $from == 'doctoral_program' || $from == 'scipers') && $current_unit->ordre  == 1);
            if ($from == 'units' || $one_order) {
              $language = get_current_language();
              if ($language === 'fr') {
                  $function = $current_unit->fonction_fr;
              } else {
                  $function = $current_unit->fonction_en;
              }
            }
        }
    }
    return $function;
}

/**
 * Get person room
 */
function epfl_people_get_room($person, $from, $order) {

    $room = '';
    if (HIERARCHICAL_ORDER == $order) {
        $room = $person->rooms;
    } else if (ALPHABETICAL_ORDER == $order) {
        foreach($person->unites as $current_unit) {
            $one_order = (($from == 'groups' || $from == 'doctoral_program' || $from == 'scipers') && $current_unit->ordre  == 1);
            if ($from == 'units' || $one_order) {
                $room = $current_unit->rooms;
            }
        }
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
function epfl_people_get_people_url($person) {

    $slug = "";
    if ($person->email) {
        $slug = str_replace("@epfl.ch", "", $person->email);
    } else {
        $slug = $person->sciper;
    }
    return "https://people.epfl.ch/" . $slug;
}

?>
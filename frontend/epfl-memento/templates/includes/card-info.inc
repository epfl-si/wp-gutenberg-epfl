<?php

$markup .= '<span class="card-info-date">' . esc_html($event->start_date) . '</span>';

if ($event->start_date == $event->end_date){
    $markup .= '<span>' . esc_html($event->start_time) . '</span>';
    $markup .= '<span>' . esc_html($event->end_time) . '</span>';
} else {
    $markup .= '<span>' . esc_html($event->end_date) . '</span>';
}

$markup .= '<p>';

if ($event->speaker !== '') {
    $markup .= esc_html('With', 'epfl');
    $markup .= '<b>' . strip_tags($event->speaker) . '</b>';
    $markup .= '<br>';
}

 if ($event->place_and_room !== '') {
    $markup .= esc_html('Place and room', 'epfl');
    $markup .= '<b>' . esc_html($event->place_and_room) . '</b>';
    $markup .= '<br>';
 }
    
if (get_current_language() == 'fr' and $event->category->fr_label !== ''){
    $markup .= esc_html('Category', 'epfl') . ': <b>' . esc_html($event->category->fr_label) . '</b>';
} elseif ($event->category->en_label !== '') {
    $markup .= esc_html('Category', 'epfl') . ': <b>' . esc_html($event->category->en_label) . '</b>';
}


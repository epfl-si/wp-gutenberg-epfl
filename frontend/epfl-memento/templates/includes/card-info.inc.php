<?php
namespace EPFL\Plugins\Gutenberg\Memento;

$start_date = date_format(date_create($event->start_date), 'd.m.Y');
$end_date   = date_format(date_create($event->end_date), 'd.m.Y');
$start_time = !empty($event->start_time) ? date_format(date_create($event->start_time), 'H:i') : '';
$end_time   = !empty($event->end_time)   ? date_format(date_create($event->end_time), 'H:i')   : '';

$datastart_date = date_format(date_create($event->start_date), 'Y-m-d') . 'T' . $start_time;
$dataend_date = date_format(date_create($event->end_date), 'Y-m-d') . 'T' . $end_time;


if ($event->start_date == $event->end_date){
    $markup .= '<svg class="icon feather" aria-hidden="true"><use xlink:href="#calendar"></use></svg>&nbsp;';
    $markup .= '<span class="card-info-date event-date" itemprop="startDate" content="' . $datastart_date . '">' . esc_html($start_date) . '</span>&nbsp;&nbsp;';
    if (!empty($start_time) && !empty($end_time)){
        $markup .= '<svg class="icon feather" aria-hidden="true"><use xlink:href="#clock"></use></svg> ';
        $markup .= '<span class="event-time">' . esc_html($start_time) . '</span>';
        $markup .= '<span class="event-time">' . esc_html($end_time) . '</span>';
    } 
} else {
    $markup .= '<svg class="icon feather" aria-hidden="true"><use xlink:href="#calendar"></use></svg>&nbsp;';
    $markup .= '<span class="event-time" itemprop="startDate" content="' . $datastart_date . '">' . esc_html($start_date) . '</span>';
    $markup .= '<span class="card-info-date event-date" itemprop="endDate" content="' . $dataend_date . '">' . esc_html($end_date) . '</span>&nbsp;&nbsp;';
    if (!empty($start_time) && !empty($end_time)){
        $markup .= '<svg class="icon feather" aria-hidden="true"><use xlink:href="#clock"></use></svg>&nbsp;';
        $markup .= '<span>' . esc_html($start_time) . '</span>';
        $markup .= '<span>' . esc_html($end_time) . '</span>';
    }
}

$markup .= '<p>';

if ($event->speaker !== '') {
    $markup .= '<b>' . __('Speaker', 'epfl') . ': </b>';
    $markup .= strip_tags($event->speaker);
    $markup .= '<br>';
}

if ($event->place_and_room !== '') {
    $markup .= '<b>' . __('Location', 'epfl') . ':</b>';
    $markup .= '&nbsp;<svg class="icon feather" aria-hidden="true"><use xlink:href="#map-pin"></use></svg>';
    $markup .= '&nbsp;<span itemprop="location">' . esc_html($event->place_and_room) . '</span>';
if ($event->url_online_room !== '') {
        $markup .= '&nbsp;&&nbsp;<svg class="icon feather" aria-hidden="true"><use xlink:href="#monitor"></use></svg>';
        $markup .= '&nbsp;Online';
    }
  $markup .= '<br>';
}

if (get_current_language() == 'fr' and $event->category->fr_label !== ''){
    $markup .='<b>' . __('Category', 'epfl') . ':</b> ' . esc_html($event->category->fr_label);
    $markup .= '<br>';
} elseif ($event->category->en_label !== '') {
    $markup .='<b>' . __('Category', 'epfl') . ':</b> ' . esc_html($event->category->en_label);
    $markup .= '<br>';
}

if (get_current_language() == 'fr' and $event->vulgarization->fr_label !== ''){
    $markup .= '<b>' . __('Target audience', 'epfl') . ': </b>' . esc_html($event->vulgarization->fr_label);
    $markup .= '<br>';
} elseif ($event->vulgarization->en_label !== '') {
    $markup .= '<b>' . __('Target audience', 'epfl') . ': </b>' . esc_html($event->vulgarization->en_label);
    $markup .= '<br>';
}

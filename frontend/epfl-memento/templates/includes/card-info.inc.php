<?php
namespace EPFL\Plugins\Gutenberg\Memento;

$start_date = date_format(date_create($event->start_date), 'd-m-Y');
$end_date   = date_format(date_create($event->end_date), 'd-m-Y');
$start_time = date_format(date_create($event->start_time), 'H:i');
$end_time   = date_format(date_create($event->end_time), 'H:i' );

$datastart_date = date_format(date_create($event->start_date), 'Y-m-d') . 'T' . $start_time;
$dataend_date = date_format(date_create($event->end_date), 'Y-m-d') . 'T' . $end_time;

$markup .= '<span class="card-info-date" itemprop="startDate" content="'. $datastart_date .'">' . esc_html($start_date) . '</span>';

if ($event->start_date == $event->end_date && !empty($startime) && !empty($endtime)){
    $markup .= '<span>' . esc_html($start_time) . '</span>';
    $markup .= '<span>' . esc_html($end_time) . '</span>';
} else {
    $markup .= '<span itemprop="endDate" content="'. $dataend_date .'">' . esc_html($end_date) . '</span>';
}

$markup .= '<p>';

if ($event->speaker !== '') {
    $markup .= __('With', 'epfl');
    $markup .= ': <b>' . strip_tags($event->speaker) . '</b>';
    $markup .= '<br>';
}

if ($event->place_and_room !== '') {
    $markup .= __('Place and room', 'epfl');
    $markup .= ': <b><span itemprop="location">' . esc_html($event->place_and_room) . '</span></b>';
    $markup .= '<br>';
}

if ($event->url_online_room !== '') {
  $markup .= __('Online', 'epfl');
  $markup .= ': <b>' . esc_html($event->url_online_room) . '</b>';
  $markup .= '<br>';
}

if (get_current_language() == 'fr' and $event->category->fr_label !== ''){
    $markup .= __('Category', 'epfl') . ': <b>' . esc_html($event->category->fr_label) . '</b>';
} elseif ($event->category->en_label !== '') {
    $markup .= __('Category', 'epfl') . ': <b>' . esc_html($event->category->en_label) . '</b>';
}

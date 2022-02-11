<?php
namespace EPFL\Plugins\Gutenberg\Memento;

$visual_url = get_visual_url($event, $memento_name);
$markup .= '<picture class="card-img-top">';
    if (!empty($event->academic_calendar_category)) {
        $markup .= '<span style="position: absolute; color: #FFF;padding: 10px 0 0 10px; line-height: 1.35em; font-size: 2em;">';
        $markup .= '<meta itemprop="eventStatus" content="https://schema.org/EventCancelled">';
        if ($event->lang == 'fr') {
            $markup .= esc_html($event->academic_calendar_category->fr_label);
        } else {
            $markup .= esc_html($event->academic_calendar_category->en_label);
        }
        $markup .= '</span>';
    }
    if ($event->canceled === "True" || $event->registration->id == REGISTRATION_SOLD_OUT_ID) {
        $markup .= '<span style="position: absolute; z-index: 1; background: #e43; color: #fff;" class="h4 p-2">';
        if ($event->canceled === "True") {
            $markup .= __('Cancelled', 'epfl');
        } else if ($event->registration->id == REGISTRATION_SOLD_OUT_ID) {
            $markup .= __('Sold out', 'epfl');
        }
        $markup .= '</span>';
    }
    if ($visual_url) {
        $markup .= '<img src="' . esc_url($visual_url) . '" class="img-fluid"';
        if ($event->canceled === "True" || $event->registration->id == REGISTRATION_SOLD_OUT_ID) {
            $markup .= ' style="opacity:0.3"';
        }
        $markup .= ' title="' . esc_attr($event->image_description) . '" alt="' . esc_attr($event->image_description) . '" />';
    }
$markup .= '</picture>';

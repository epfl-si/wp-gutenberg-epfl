<?php

$visual_url = get_visual_url($event, $memento_name);

$markup .= '<picture class="card-img-top">';
    if (!empty($event->academic_calendar_category)) {
        $markup .= '<span style="position: absolute; color: #FFF;padding: 10px 0 0 10px; line-height: 1.35em;">';
        $markup .= '<meta itemprop="eventStatus" content="https://schema.org/EventCancelled">';
        if ($event->lang == 'fr') {
            $markup .= esc_html($event->academic_calendar_category->fr_label);
        } else {
            $markup .= esc_html($event->academic_calendar_category->en_label);
        }
        $markup .= '</span>';
    }
    if ($visual_url) {
        $markup .= '<img src="' . esc_url($visual_url) . '" class="img-fluid" title="' . esc_attr($event->image_description) . '" alt="' . esc_attr($event->image_description) . '" />';
    }
$markup .= '</picture>';

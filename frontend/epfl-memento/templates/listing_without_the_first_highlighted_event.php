<?php
    function epfl_memento_listing_without_the_first_highlighted_event($results, $memento_name) {

        $memento_url = "https://memento.epfl.ch/" . $memento_name;
        $display_first_event = FALSE;
        $nb_events = count($results);

        $markup = '<div class="list-group">';

        if (!(bool) $results) {
            $markup .= '<div><h3>';
            $markup .= esc_html('No scheduled events', 'epfl');
            $markup .= '</h3></div>';
        }

        $count=1;
        foreach($results as $event) {
            $is_first_event = ($count==1);
            $visual_url = get_visual_url($event, $memento_name);
            $markup .= '<a href="' . esc_url($event->event_url) . '" class="list-group-item list-group-item-gray list-group-teaser link-trapeze-vertical" itemscope itemtype="http://schema.org/Event">';
            $markup .= '<div class="list-group-teaser-container">';
            $markup .= '<div class="list-group-teaser-thumbnail">';
            $markup .= '<picture class="card-img-top">';
            $markup .= '<span style="position: absolute; color: #FFF;padding: 10px 0 0 10px; line-height: 1.35em;font-size:1em;">';
            $markup .= '<meta itemprop="eventStatus" content="https://schema.org/EventCancelled">';
            if ($event->lang == 'fr') {
                $markup .= esc_html($event->academic_calendar_category->fr_label);
            } else {
                $markup .= esc_html($event->academic_calendar_category->en_label);
            }
            $markup .= '</span>';
            $markup .= '<img src="' . esc_url($visual_url) . '" class="img-fluid" title="' . esc_attr($event->image_description) . '" alt="' . esc_attr($event->image_description) .'" />';
            $markup .= '</picture>';
            $markup .= '</div>';
            $markup .= '<div class="list-group-teaser-content">';
            $markup .= '<p class="h5 card-title" itemprop="name">' . esc_html($event->title) . '</p>';
            $markup .= '<div class="card-info mt-0">';
            $markup .= include(dirname(__FILE__) . '/includes/card-info.inc');
            $markup .= '</div>';
            $markup .= '</div>';
            $markup .= '</div>';
            $markup .= '</a>';
  
            $count++;
        }
  
        $markup .= '</div>';
        return $markup;
    }

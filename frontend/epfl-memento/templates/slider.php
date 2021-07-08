<?php
    namespace EPFL\Plugins\Gutenberg\Memento;

    // template = 1
    function epfl_memento_slider($results, $template, $memento_name, $period) {
        $display_first_event = ($template == 1);

        $markup = '<div class="container-full overflow-hidden my-3 pl-5">';
        $markup .= '<div class="container">';
        $markup .= '<div class="card-slider-wrapper">';
        $markup .= '<div class="card-slider">';

        if (!(bool) $results) {
            $markup .= '<div><h3>';
            $markup .= __('No scheduled events', 'epfl');
            $markup .= '</h3></div>';
        }

        $count = 1;
        foreach($results as $event) {
            // if event hasn't start date and end date then no display event
            if (is_null($event->start_date) and is_null($event->end_date)) {
                continue;
            }

            $is_first_event = ($count==1);
            $is_just_finished = is_just_finished($event->end_date, $event->end_time);
            $is_inscription_required = is_inscription_required($event->registration);

            if ($is_first_event and $display_first_event) {

                $markup .= '<div class="card-slider-cell card-slider-cell-lg">';
                $markup .= '<a href="' . esc_url($event->event_url) . '" class="card card-gray link-trapeze-horizontal">';
                $markup .= '<div class="card-body">';

                include(dirname(__FILE__) . '/includes/card-img-top.inc.php');

                $markup .= '<h3 class="card-title">' . esc_html($event->title) . '</h3>';
                $markup .= '<p>' . esc_html(trim_text(strip_tags($event->description), 225)) . '</p>';
                $markup .= '<div class="card-info">';

                include(dirname(__FILE__) . '/includes/card-info.inc.php');

                $markup .= '</div>';
                $markup .= '</div>';
                $markup .= '</a>';
                $markup .= '</div>';

            } else {

                if ($is_just_finished) {
                    $markup .= '<div class="card-slider-cell">';
                    $markup .= '<a href="' . esc_url($event->event_url) . '" class="card card-gray card-grayscale link-trapeze-horizontal bg-gray-100">';
                    $markup .= '<div class="card-body">';

                    include(dirname(__FILE__) . '/includes/card-img-top.inc.php');

                    $markup .= '<h3 class="card-title"><span class="badge badge-dark badge-sm">' . __('Just finished', 'epfl') . '</span>';
                    $markup .= esc_html($event->title);
                    $markup .= '</h3>';
                    $markup .= '<div class="card-info">';

                    include(dirname(__FILE__) . '/includes/card-info.inc.php');

                    $markup .= '</div>';
                    $markup .= '</div>';
                    $markup .= '</a>';
                    $markup .= '</div>';

                } elseif ($is_inscription_required) {

                    $markup .= '<div class="card-slider-cell">';
                    $markup .= '<div class="card card-gray">';
                    $markup .= '<div class="card-body">';
                    $markup .= '<a href="' . esc_url($event->event_url) . '" class="card-img-top">';

                    include(dirname(__FILE__) . '/includes/card-img-top.inc.php');

                    $markup .= '</a>';
                    $markup .= '<h3 class="card-title">';
                    $markup .= '<a href="' . esc_url($event->event_url) . '">' . esc_html($event->title) . '</a>';
                    $markup .= '</h3>';
                    $markup .= '<div class="card-info">';

                    include(dirname(__FILE__) . '/includes/card-info.inc.php');

                    $markup .= '</div>';
                    $markup .= '</div>';
                    $markup .= '<div class="card-footer mt-auto">';
                    $markup .= '<a href="' . esc_url($event->event_url) . '" class="btn btn-primary btn-sm">';
                    $markup .= __('Learn more & apply', 'epfl');
                    $markup .= '</a>';
                    $markup .= '</div>';
                    $markup .= '</div>';
                    $markup .= '</div>';

                } else {

                    $markup .= '<div class="card-slider-cell">';
                    $markup .= '<a href="' . esc_url($event->event_url) . '" class="card card-gray link-trapeze-horizontal">';
                    $markup .= '<div class="card-body">';

                    include(dirname(__FILE__) . '/includes/card-img-top.inc.php');

                    $markup .= '<h3 class="card-title">' . esc_html($event->title) . '</h3>';
                    $markup .= '<div class="card-info">';

                    include(dirname(__FILE__) . '/includes/card-info.inc.php');

                    $markup .= '</div>';
                    $markup .= '</div>';
                    $markup .= '</a>';
                    $markup .= '</div>';
                }
            }
            $count++;
        }
        $markup .= '</div>';

        include(dirname(__FILE__) . '/includes/card-slider-footer.inc.php');

        $markup .= '</div>';
        $markup .= '</div>';
        $markup .= '</div>';

        return $markup;
    }

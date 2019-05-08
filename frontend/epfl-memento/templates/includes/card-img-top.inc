<?php

$visual_url = substr($event->visual_url, 0, -11) . '448x448.jpg';

//display nothing if no image available
if (!$event->visual_url) return '';

$markup .= '<picture class="card-img-top">';
$markup .= '<img src="' . esc_url($visual_url) . '" class="img-fluid" title="' . esc_attr($event->image_description) . '" alt="' . esc_attr($event->image_description) . '" />';
$markup .= '</picture>';

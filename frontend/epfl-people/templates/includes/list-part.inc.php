<?php

$markup .= '<div class="contact-list-row" itemscope itemtype="http://schema.org/Person">';
$markup .= '<div class="contact-list-avatar" itemprop="image">';

if ($photo_url) {
    $markup .= '<picture>';
    $markup .= '<img src="' . esc_url($photo_url) . '" style="width:1.9rem;" class="img-fluid rounded-circle" alt="' . esc_attr($person->prenom) . '" "' . esc_attr($person->nom) . '">';
    $markup .= '</picture>';
}

$markup .= '</div>';
$markup .= '<a href="' . esc_url($people_url) . '" class="contact-list-item" itemprop="name">' . esc_attr($person->prenom) . ' ' . esc_attr($person->nom) . '</a>';

if ($function) {
    $markup .= '<p class="contact-list-item m-0 text-muted" itemprop="jobTitle">' . esc_html($function) . '</p>';
} else {
    $markup .= '<div class="contact-list-item"></div>';
}

$markup .= '<a class="contact-list-item text-muted" style="width:250px;" href="mailto:"' . esc_attr($person->email) . '" itemprop="email">' . esc_attr($person->email) . "</a>";

if (isset($phones[0])) {
    $markup .= '<a class="contact-list-item text-muted" style="width:130px;" href="tel:"'. esc_html($phones[0]) . '" itemprop="telephone">';
    $markup .= '<b>' . esc_html($phones[0]) . '</b>';
    $markup .= '</a>';
} else {
    $markup .= '<div class="contact-list-item"></div>';
}

$markup .= '<a class="contact-list-item text-muted" style="width:130px;" href="' . esc_url($room_url) . '" itemprop="workLocation">' . esc_html($room) . '</a>';
$markup .= '</div>';

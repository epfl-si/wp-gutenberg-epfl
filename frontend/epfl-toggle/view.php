<?php

namespace EPFL\Plugins\Gutenberg\Toggle;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_toggle_block( $attributes, $inner_content ) {

    $title     = Utils::get_sanitized_attribute( $attributes, 'title' );
    $state     = Utils::get_sanitized_attribute( $attributes, 'state', 'close' );
    $toggle_id = md5($inner_content . rand());

    /*
    var_dump($title);
    var_dump($state);
    var_dump($toggle_id);
    */

    $markup = '<button';
    $markup .= ' class="collapse-title collapse-title-desktop ';
    if ($state === 'close') {
        $markup .= 'collapsed';
    }
    $markup .= '"';
    $markup .= ' type="button"';
    $markup .= ' data-toggle="collapse"';
    $markup .= ' data-target="' . esc_attr('#collapse-' . $toggle_id) . '"';
    $markup .= ' aria-expanded="false"';
    $markup .= ' aria-controls="' . esc_attr('#collapse-' . $toggle_id) . '"';
    $markup .= '>';
    $markup .= esc_html($title);
    $markup .= '</button>';
    $markup .= '<div ';
    $markup .= 'class="collapse collapse-item collapse-item-desktop ';
    if ($state === 'open') {
        $markup .= 'show';
    }
    $markup .= '"';
    $markup .= ' id="' . esc_attr('collapse-' . $toggle_id) . '"';
    $markup .= '>' . $inner_content . '</div>';

    return $markup;
}
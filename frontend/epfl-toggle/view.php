<?php

// Styleguide: https://epfl-si.github.io/elements/#/molecules/collapse-group

namespace EPFL\Plugins\Gutenberg\Toggle;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_toggle_block( $attributes, $inner_content ) {

    wp_enqueue_script('epfl-toggle.js', true);

    $title     = Utils::get_sanitized_attribute( $attributes, 'title' );
    $anchor    = Utils::get_sanitized_attribute( $attributes, 'anchor' );
    $state     = Utils::get_sanitized_attribute( $attributes, 'state', 'close' );
    $toggle_id = md5($inner_content . rand());

    /*
    var_dump($title);
    var_dump($anchor);
    var_dump($state);
    var_dump($toggle_id);
    */

    $markup = '';

    // if an anchor has been given, we add a <a> tag with an unused class just to be able to find it using JS
    // and automatically trigger 'click' function on button to open toggle
    if($anchor != '') $markup .= '<a id="'.$anchor.'" class="epfl-toggle-anchor"></a>';

    $markup .= '<button';
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

add_action( 'init', function() {
    // Adding JS file used to trigger click on toggle targeted by anchor.
    wp_register_script('epfl-toggle.js', plugins_url('js/epfl-toggle.js', __FILE__));
});

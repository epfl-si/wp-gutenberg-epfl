<?php

/**
* Plugin Name: EPFL polylex
* Description: Provide a way to search information about EPFL lexes
* @version: 1.0
* @copyright: Copyright (c) 2019 Ecole Polytechnique Federale de Lausanne, Switzerland
*/

namespace EPFL\Plugins\Shortcodes\EPFLPolylexSearch;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/controller.php');

define(__NAMESPACE__ . "\LEX_INFO_PROVIDER_URL", "https://polylex-admin.epfl.ch/api/v1/lexes");


function process_shortcode($atts) {
    $atts = shortcode_atts( array(
        'category' => '',
        'subcategory' => '',
        'search' => ''
    ), $atts );

    // search can come from the url
    if (isset($_GET['search'])) {
        $atts['search'] = stripslashes($_GET['search']);
    }

    // category can come from the url
    if (isset($_GET['category'])) {
        $atts['category'] = stripslashes($_GET['category']);
    }

    // subcategory can come from the url
    if (isset($_GET['subcategory'])) {
        $atts['subcategory'] = stripslashes($_GET['subcategory']);
    }

    // sanitize what we get
    $category = sanitize_text_field($atts["category"]);
    $subcategory = sanitize_text_field($atts["subcategory"]);
    $search = sanitize_text_field($atts["search"]);

    $url = LEX_INFO_PROVIDER_URL;
    $lexes = Utils::get_items($url);

    ob_start();

    try {
        renderLexSearch($lexes, $category, $subcategory, $search);
        return ob_get_contents();
    } finally {
        ob_end_clean();
    }
}

add_action( 'init', function() {
    // define the shortcode
   add_shortcode('epfl_polylex_search', __NAMESPACE__ . '\process_shortcode');
});

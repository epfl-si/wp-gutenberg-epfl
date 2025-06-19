<?php
/**
* Plugin Name: EPFL labs
* Description: Provide a way to search information about labs and their tags
* @version: 1.1
* @copyright: Copyright (c) 2019 Ecole Polytechnique Federale de Lausanne, Switzerland
*/

namespace EPFL\Plugins\Shortcodes\EPFLLabSearch;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/controller.php');
require_once(dirname(dirname(dirname(__FILE__))).'/frontend/lib/utils.php');

define(__NAMESPACE__ . "\LABS_INFO_PROVIDER_URL", "https://wp-veritas-next.epfl.ch/api/v1/");

function process_shortcode($atts) {
    $atts = shortcode_atts( array(
        'faculty' => '',
        'institute' => '',
        'field' => ''
    ), $atts );

    // field of research can come from the url
    if (isset($_GET['field-of-research'])) {
        $atts['field'] = stripslashes($_GET['field-of-research']);
    }

    // sanitize what we get
    $faculty = sanitize_text_field($atts["faculty"]);
    $institute = sanitize_text_field($atts["institute"]);
    $field = sanitize_text_field($atts["field"]);

    // move back any encoded html entities
    $faculty = html_entity_decode($faculty);
    $institute = html_entity_decode($institute);
    $field = html_entity_decode($field);

    # by default get all sites with at least a tag
    $url = LABS_INFO_PROVIDER_URL . 'sites?tagged=true';

    $cache_timeout = 15 * MINUTE_IN_SECONDS;
    $sites = Utils::get_items_with_fallback($url, $cache_timeout, "epfl_labs_search_list");

    ob_start();
    try {
        renderLabsSearch($sites, $faculty, $institute, $field);
        return ob_get_contents();
    } finally {
        ob_end_clean();
    }
}

add_action( 'init', function() {
    // define the shortcode
   add_shortcode('epfl_labs_search', __NAMESPACE__ . '\process_shortcode');
});

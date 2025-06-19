<?php
namespace EPFL\Plugins\Gutenberg\FieldsOfResearchList;

require_once(dirname(dirname(dirname(__FILE__))).'/frontend/lib/utils.php');
require_once(dirname(dirname(dirname(__FILE__))).'/frontend/lib/language.php');

use \EPFL\Plugins\Gutenberg\Lib\Utils;
use function EPFL\Plugins\Gutenberg\Lib\Language\get_current_or_default_language;

define(__NAMESPACE__ . "\LABS_INFO_PROVIDER_URL", "https://wp-veritas-next.epfl.ch/api/v1/");


/**
 * Simplify the sites data by removing and renaming languages fields
 */
function filter_out_unused_language($fields) {
  $current_language = get_current_language();
  $filtered_fields = [];

  foreach ($fields as $field) {
    $object = new \stdClass();
    if (strcmp($current_language, 'fr')) {
      $object->name = $field->name_fr;
      $object->url = $field->url_fr;
    } else {
      $object->name = $field->name_en;
      $object->url = $field->url_en;
    }
    $filtered_fields[] = $object;
  }
  return $filtered_fields;
}

function epfl_fields_of_research_list_render($attributes) {
    wp_enqueue_script( 'lib-listjs', plugins_url('lib/list.min.js', dirname(__FILE__)), ['jquery'], 1.5, false);
    wp_enqueue_style( 'epfl-fields-of-research-list-css', plugins_url('epfl-fields-of-research-list.css', __FILE__),false,'1.0','all');

    # by default get all sites with at least a tag
    $url = LABS_INFO_PROVIDER_URL . 'tags/?type=field-of-research';
    $fields = Utils::get_items($url, 300, 5, True);

    $fields = filter_out_unused_language($fields);

    # sort alpha
    usort($fields, function($a, $b) {
      return strcasecmp($a->name, $b->name);
    });

    ob_start();
    include(dirname(__FILE__).'/view.php');
    $content = ob_get_clean();

    return $content;
  }

add_action( 'init', function() {
    // define the shortcode
    add_shortcode('epfl_fields_of_research_list', __NAMESPACE__ . '\epfl_fields_of_research_list_render');
});

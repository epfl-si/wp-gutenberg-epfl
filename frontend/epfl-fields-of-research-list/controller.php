<?php
namespace EPFL\Plugins\Gutenberg\FieldsOfResearchList;

require_once(dirname(__FILE__).'/../lib/utils.php');
require_once(dirname(__FILE__).'/../lib/language.php');
require_once(dirname(__FILE__).'/controller.php');

use \EPFL\Plugins\Gutenberg\Lib\Utils;
use function EPFL\Plugins\Gutenberg\Lib\Language\get_current_or_default_language;

#define(__NAMESPACE__ . "\LABS_INFO_PROVIDER_URL", "https://wp-veritas.epfl.ch/api/v1/");
define(__NAMESPACE__ . "\LABS_INFO_PROVIDER_URL", "https://wp-veritas.128.178.222.83.nip.io/api/v1/");


/**
 * Simplify the sites data by removing and renaming languages fields
 */
function filter_out_unused_language($fields) {
  $current_language = get_current_language();
  $filtered_fields = [];

  foreach ($fields as $field) {

    $object = new \stdClass();
    if ($current_language === 'fr') {
      $object->name = $field->name_en;
      $object->url = $field->url_en;
    } else {
      $object->name = $field->name_fr;
      $object->url = $field->url_fr;
    }
    $filtered_fields[] = $object;
  }
  return $filtered_fields;
}

function epfl_fields_of_research_list_block($attributes) {
    # by default get all sites with at least a tag
    $lang = get_current_or_default_language();
    $url = LABS_INFO_PROVIDER_URL . 'tags/?type=field-of-research';
    # $fields = Utils::get_items($url);
    $fields = Utils::get_items($url, 300, 5, false);

    $fields = filter_out_unused_language($fields);
    # sort alpha
    usort($fields, function($a, $b) {
      return strcasecmp($a->name, $b->name);
    });

    ob_start();
?>
<div class="container-full">
  <div class="container">
    <ul class="list-group list-group-flush">
      <?php foreach($fields as $field): ?>
      <li class="list-group-item">
          <a href="<?php echo esc_attr($field->url); ?>">
            <?php echo esc_html($field->name); ?>
          </a>
      </li>
      <?php endforeach; ?>
    </ul>
  </div>
</div>
<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

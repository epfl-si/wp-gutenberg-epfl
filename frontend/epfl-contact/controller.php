<?php

// Styleguide: https://epfl-si.github.io/elements/#/organisms/contact

namespace EPFL\Plugins\Gutenberg\Contact;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

use function EPFL\Plugins\Gutenberg\Map\epfl_map_block;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_contact_block($attributes, $inner_content) {
    // sanitize parameters
    foreach($attributes as $key => $value) {
        if (strpos($key, 'information') !== false ||
        strpos($key, 'timetable') !== false) {
            $attributes[$key] = wp_kses_post($value);
        }
        else {
            $attributes[$key] = sanitize_text_field($value);
        }
    }

    $gray_wrapper  = Utils::get_sanitized_attribute($attributes, 'grayWrapper', false);
    ob_start();
?>

    <div class="container <?php echo ($gray_wrapper) ? 'bg-gray-100 py-2 my-5' : 'my-3'; ?>">
    <?php if ($gray_wrapper): ?><div class="bg-white p-4 p-md-5"><?php endif; ?>
      <div class="row">
        <div class="col-lg-6">
          <h3>Contact</h3>
          <?php if (trim($inner_content) != ""):
            echo $inner_content;
          endif; ?>

          <?php for ($i=1; $i < 5; $i++): ?>
            <?php if (Utils::richtext_content_exists($attributes, 'timetable'.$i)): ?>
          <div class="card card-body card-sm mb-2 flex-row flex-wrap justify-content-between justify-content-sm-start">
            <div class="mr-3 w-sm-50"><?php echo $attributes['timetable'.$i] ?></div>
          </div>
          <?php
          endif;
          endfor;
          ?>
          <?php for ($i=1; $i < 4; $i++): ?>
          <?php if (Utils::richtext_content_exists($attributes, 'information'.$i)): ?>
          <p><?php echo urldecode($attributes['information'.$i]) ?: '' ?></p>
          <hr>
          <?php
          endif;
          endfor;
          ?>
        </div>
        <?php
        # bad quickfix that disallow INN011 as a place
        # because INN011 was a value in shortcake and not a placeholder
        # meaning some contact shortcode have this value but don't want to show a map
        if (isset($attributes['mapQuery']) && !empty(trim($attributes['mapQuery'])) && $attributes['mapQuery'] != 'INN011'):
        ?>
        <div class="col-lg-6 d-flex flex-column">
          <?php echo
           epfl_map_block(['query' => $attributes['mapQuery'], 'lang' => pll_current_language()]); ?>
        </div>
        <?php endif; ?>
      </div>
    <?php if ($gray_wrapper): ?></div><?php endif; ?>
  </div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

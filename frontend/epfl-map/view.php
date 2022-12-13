<?php

// Styleguide: https://epfl-si.github.io/elements/#/molecules/map

namespace EPFL\Plugins\Gutenberg\Map;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/language.php');
require_once(dirname(__FILE__).'/../lib/utils.php');

use function EPFL\Plugins\Gutenberg\Lib\Language\get_current_or_default_language;

function epfl_map_block( $attributes ) {
    $lang    = get_current_or_default_language();

    $search_type   = Utils::get_sanitized_attribute( $attributes, 'searchType' );
    $display_type = Utils::get_sanitized_attribute( $attributes, 'displayType', 'large' );
    $no_wrapper =  Utils::get_sanitized_attribute( $attributes, 'noWrapper', false );  // no need for a *container* div ?

    if ($search_type == 'searchURL') {
        # sanitize url
        $map_url = Utils::get_sanitized_url( $attributes, 'query' );

        # assert we have iframe in url, or add it
        if  (strpos($map_url, 'plan.epfl.ch/iframe') === false) {
            $map_url = str_replace("plan.epfl.ch/", "plan.epfl.ch/iframe", $map_url);
        }

    } else {
        $query   = Utils::get_sanitized_attribute( $attributes, 'query' );

        if ($search_type == 'searchRoom') {
            $map_url = 'https://plan.epfl.ch/iframe?q==' . $query . '&amp;lang=' . $lang . '&amp;map_zoom=10';
        } else {
            $map_url = 'https://plan.epfl.ch/iframe?q=' . $query . '&amp;lang=' . $lang . '&amp;map_zoom=10';
        }
    }

  $classes = ['my-3'];
  if(!isset($display_type) || $display_type == 'large') {
    $classes[] = "container";
  } else if($display_type == 'standard') {
    $classes[] = "container-grid";
  }

    ob_start();
?>
<?php if (!$no_wrapper) : ?>
<div class="<?= implode(" ", $classes) ?>">
<?php endif; ?>

    <div class="embed-responsive embed-responsive-16by9">
        <iframe frameborder="0" scrolling="no" src="<?php echo esc_url($map_url); ?>" class="embed-responsive-item" ></iframe>
    </div>

<?php if (!$no_wrapper) : ?>
</div>
<?php endif; ?>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

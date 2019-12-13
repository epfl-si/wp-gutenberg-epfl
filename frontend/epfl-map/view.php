<?php
namespace EPFL\Plugins\Gutenberg\Map;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/language.php');
require_once(dirname(__FILE__).'/../lib/utils.php');

use function EPFL\Plugins\Gutenberg\Lib\Language\get_current_or_default_language;

function epfl_map_block( $attributes ) {
    $query   = Utils::get_sanitized_attribute( $attributes, 'query' );
    $lang    = get_current_or_default_language();
    $map_url = 'https://plan.epfl.ch/iframe/?q=' . $query . '&amp;lang=' . $lang . '&amp;map_zoom=10';

    ob_start();
?>    
<div class="container my-3">
    <div class="embed-responsive embed-responsive-16by9">
        <iframe frameborder="0" scrolling="no" src="<?PHP echo esc_url($map_url); ?>" class="embed-responsive-item" ></iframe>
    </div>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}
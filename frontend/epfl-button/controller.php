<?php

namespace EPFL\Plugins\Gutenberg\Button;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_button_block( $attributes ) {
    if (!$attributes) return;

    $text               = Utils::get_sanitized_attribute( $attributes, 'text' );
    $link               = Utils::get_sanitized_attribute( $attributes, 'link' );
    $button_style       = Utils::get_sanitized_attribute( $attributes, 'buttonStyle', 'primary' );
    $button_align       = Utils::get_sanitized_attribute( $attributes, 'buttonAlign', 'left' );
    $open_link_new_tab  = Utils::get_sanitized_attribute( $attributes, 'openLinkNewTab', False);
    
    ob_start();

    if($button_align == 'centered') echo '<center>';
?>
    
    <a href="<?PHP echo $link; ?>" <?php if($open_link_new_tab): ?>target="_blank" rel="noopener"<?php endif; ?>>
        <button class="btn btn-<?PHP echo $button_style; ?>"><?PHP echo $text; ?></button>
    </a>
    

<?php
    if($button_align == 'centered') echo '</center>';

    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}
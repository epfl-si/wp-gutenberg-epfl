<?php

namespace EPFL\Plugins\Gutenberg\FAQ;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');


/**
 * Render a FAQ Item block
 */
function epfl_faq_item_block($attributes, $inner_content)
{
    $question     = Utils::get_sanitized_attribute( $attributes, 'question' );
    $answer       = Utils::get_sanitized_attribute( $attributes, 'answer' );

    if(empty(trim($question))) return "";

    $anchor = "faq-item-".md5($inner_content);

    //$faq_ref_table .= '<li><a href="#'.$anchor.'">'.$question.'</a></li>';

    ob_start();
?>
  <div class="faq-item" style="border-top: 1px solid #c1c1c1; padding-top: 10px; padding-bottom: 10px;" id="<?PHP echo $anchor; ?>">
    <h4 style="font-weight: bold;" class="faq-item-question"><?PHP echo $question ?></h4>
    <?PHP echo $inner_content ?>
  </div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

/**
 * Render a FAQ
 */
function epfl_faq_block($data, $inner_content) {

  // Adding needed scripts
  wp_enqueue_script('epfl-faq-header.js', true);

  ob_start();

  // random generated ID for DIV
  $ul_id = "faq-header".md5(microtime(true). $inner_content);
?>

<div class="container py-3">
  <ul class="link-list epfl-faq-header" id="<?PHP echo $ul_id; ?>">
  </ul>
  <?php 
     echo $inner_content;
  ?>
  
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

add_action( 'init', function() {
  // using JS file present in theme
    wp_register_script('epfl-faq-header.js', plugins_url('js/faq-header.js', __FILE__));
});
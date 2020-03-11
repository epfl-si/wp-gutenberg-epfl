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

    $anchor = "faq-item-".md5(microtime(true). $inner_content);

    ob_start();
?>
  <div class="faq-item" style="border-top: 1px solid #c1c1c1; padding-top: 10px; padding-bottom: 10px;" id="<?php echo $anchor; ?>">
    <h4 style="font-weight: bold;" class="faq-item-question"><?php echo $question ?></h4>
    <?php echo $inner_content ?>
  </div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

/**
 * Render a FAQ block
 *
 * A FAQ block includes epfl/faq-item blocks (one for each couple "question/answer") and displays an index with links to each questions
 * before the first question/answer is displayed.
 * This link list is generated using jQuery on client side. Code which do this is in "js/faq-header.js". This means we have to add some
 * unused CSS class to elements to be able to easily get them using jQuery an build the link index.
 */
function epfl_faq_block($data, $inner_content) {

  // Adding needed scripts
  wp_enqueue_script('epfl-faq-header.js', true);

  ob_start();

?>

<div class="container py-3">
  <ul class="link-list epfl-faq-header">
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
    wp_register_script('epfl-faq-header.js', plugins_url('js/faq-header.js', __FILE__));
});
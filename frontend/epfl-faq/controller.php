<?php

// Styleguide: Not present in styleguide

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

    // We assume that the question won't change in the future so we use it to create the anchor.
    // and we also assume that there will be only one question with this name on current page
    $anchor = "faq-item-".md5($question);

    ob_start();
?>
  <div class="faq-item" id="<?php echo $anchor; ?>">
    <h4 class="faq-item-question"><?php echo $question ?></h4>
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

<div class="grid">
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

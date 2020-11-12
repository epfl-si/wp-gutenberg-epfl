<?php

// Styleguide: https://epfl-si.github.io/elements/#/molecules/card-deck >> Mini cards

namespace EPFL\Plugins\Gutenberg\MiniCardDeck;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');


/**
 * Render a Mini Card panel block
 */
function epfl_mini_card_panel_block($attributes)
{
    $legend         = Utils::get_sanitized_attribute( $attributes, 'legend' );
    $link           = Utils::get_sanitized_attribute( $attributes, 'link' );
    $image_id       = Utils::get_sanitized_attribute( $attributes, 'imageId' );
    $image_url      = Utils::get_sanitized_attribute( $attributes, 'imageUrl' );
    $openLinkNewTab = Utils::get_sanitized_attribute( $attributes, 'openLinkNewTab' , false);

    if(empty(trim($link))) return "";

    $image_post = empty($image_id)? null : get_post($image_id) ;

    ob_start();
?>
    <div class="card">
        <a href="<?php echo $link ?>" class="link-trapeze-horizontal" <?php if($openLinkNewTab): ?> target="_blank" <?php endif; ?>>
        <?php if ($image_post): ?>
          <picture class="card-img-top">
        <?php echo wp_get_attachment_image(
          $image_id,
          'thumbnail_16_9_large_40p', // see functions.php
          '',
          [
            'class' => 'img-fluid'
          ]
          ) ?>
        </picture>

        <?php endif; /* End if image post */ ?>

        <div class="card-body">

          <h3 class="card-title"><?php echo $legend ?></h3>

        </div>
      </a>
    </div>


      <?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;

}

/**
 * Render a Mini Card Deck Block
 */
function epfl_mini_card_deck_block($attributes, $inner_content) {

  $title        = Utils::get_sanitized_attribute( $attributes, 'title' );
  $gray_wrapper = Utils::get_sanitized_attribute( $attributes, 'grayWrapper', false);

  /* $inner_content already contains HTML with "card" representation. So we can count the number of
  card with content and then adapt "deck-line" as needed */
  preg_match_all('/\<div class=\"card\"\>/', $inner_content, $matches);

  ob_start();
?>

<div class="container-full py-3 px-4<?php echo ($gray_wrapper) ? ' bg-gray-100' : '' ?>">
  <div class="card-deck mini-cards <?php echo (count($matches[0]) == 5) ? ' card-deck-line' : '' ?>">
    <h2 class="deck-title"><?php echo $title; ?></h2>
    <?php
    echo $inner_content;
    ?>
  </div>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

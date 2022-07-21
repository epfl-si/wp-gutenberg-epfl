<?php

// Styleguide: https://epfl-si.github.io/elements/#/molecules/card-deck

namespace EPFL\Plugins\Gutenberg\CardDeck;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');


/**
 * Render a Card panel block
 */
function epfl_card_panel_block($attributes, $inner_content)
{
    $title      = Utils::get_sanitized_attribute( $attributes, 'title' );
    $link       = Utils::get_sanitized_url( $attributes, 'link' );
    $image_id   = Utils::get_sanitized_attribute( $attributes, 'imageId' );
    $image_url  = Utils::get_sanitized_attribute( $attributes, 'imageUrl' );

    if(empty(trim($title))) return "";

    $image_post = empty($image_id)? null : get_post($image_id) ;

    $link = empty($link)? null : esc_url($link);

    ob_start();
?>
    <div class="card">
      <?php if ($image_post): ?>
        <?php if ($link): ?>
      <a href="<?php echo $link ?>" class="card-img-top">
        <?php else: ?>
      <div class="card-img-top">
        <?php endif; ?>
        <picture>
        <?php echo wp_get_attachment_image(
          $image_id,
          'thumbnail_16_9_large_40p', // see functions.php
          '',
          [
            'class' => 'img-fluid',
            'title' => $image_post->post_excerpt
          ]
          ) ?>
        </picture>
        <?php if ($link): ?>
      </a>
        <?php else: ?>
      </div>
        <?php endif; ?>
      <?php endif; /* End if image post */ ?>
      <div class="card-body">
        <?php if ($link): ?>
        <div class="card-title"><a href="<?php echo $link ?>" class="h3"><?php echo $title ?></a></div>
        <?php else: ?>
        <div class="card-title"><div class="h3"><?php echo $title ?></div></div>
        <?php endif; ?>
        <?php echo $inner_content ?>
      </div>
    </div>


      <?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;

}

/**
 * Render a Card Block
 */
function epfl_card_deck_block($data, $inner_content) {

  $gray_wrapper = Utils::get_sanitized_attribute($data, 'grayWrapper', false);
  $display_type = Utils::get_sanitized_attribute($data, 'displayType', 'full' );

  /* $inner_content already contains HTML with "card" representation. So we can count the number of
  card with content and then adapt "deck-line" as needed */
  preg_match_all('/\<div class=\"card\"\>/', $inner_content, $matches);

  $classes = ['py-3', 'px-4'];

  if ($gray_wrapper) $classes[] = 'bg-gray-100';

  if(isset($display_type) && $display_type == 'large') {
    $classes[] = "container";
  } else {  // default
  if (count($matches[0]) == 2) {
    $classes[] = 'card-deck-line';
  }
    $classes[] = "container-full";
  }

  ob_start();
?>

<div class="<?= implode(" ", $classes); ?>">
  <div class="card-deck <?php echo (count($matches[0]) == 2) ? ' card-deck-line' : '' ?>">
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

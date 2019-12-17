<?php

namespace EPFL\Plugins\Gutenberg\Hero;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_hero_block( $attributes ) {


    $title       = Utils::get_sanitized_attribute( $attributes, 'title' );
    $image_id    = Utils::get_sanitized_attribute( $attributes, 'imageId' );
    $description = Utils::get_sanitized_attribute( $attributes, 'description' );

    $text = "";
    if (array_key_exists('text', $attributes)) {
      $text = wp_kses_post($attributes['text']);
    }

    $image = wp_get_attachment_image(
        $image_id,
        'thumbnail_16_9_large_80p', // see functions.php
        '',
        [
          'class' => 'img-fluid'
        ]
    );

    ob_start();
?>

<div class="container-full my-3">
  <div class="hero">
    <div class="hero-content-container">
      <h1 class="hero-title"><?php echo $title; ?></h1>
    <?php
if (!empty($text)) { ?>
      <div class="hero-content"><?php echo $text ?></div>
<?php } ?>

    </div>
    <div class="hero-img">
      <figure class="cover">
        <picture><?php echo $image; ?></picture>
        <figcaption>
          <button aria-hidden="true" type="button" class="btn-circle" data-toggle="popover" data-content="<?php echo esc_html($description); ?>">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-info"></use>
            </svg>
            <svg class="icon icon-rotate-90" aria-hidden="true">
              <use xlink:href="#icon-chevron-right"></use>
            </svg>
          </button>
          <p class="sr-only"><?php echo esc_html($description); ?></p>
        </figcaption>
      </figure>
    </div>
  </div>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

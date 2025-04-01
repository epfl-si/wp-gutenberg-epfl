<?php

// Styleguide: https://epfl-si.github.io/elements/#/organisms/sponsor-list

namespace EPFL\Plugins\Gutenberg\Sponsor;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');


/**
 * Render a sponsor panel block
 */
function epfl_sponsor_panel_block($attributes, $inner_content)
{
    $name      = Utils::get_sanitized_attribute( $attributes, 'name' );
    $link       = Utils::get_sanitized_url( $attributes, 'link' );
    $image_id   = Utils::get_sanitized_attribute( $attributes, 'imageId' );
    $image_url  = Utils::get_sanitized_attribute( $attributes, 'imageUrl' );

    if(empty(trim($name))) return "";

    $image_post = empty($image_id)? null : get_post($image_id) ;

    $link = empty($link)? null : esc_url($link);

    ob_start();
?>

  <div class="col-md-3">
        <figure>
        <?php if ($link): ?>
          <a href="<?php echo $link ?>">
        <?php endif; ?>
        <?php echo wp_get_attachment_image(
          $image_id,
          'thumbnail_16_9_large_40p', // see functions.php
          '',
          [
            'class' => 'img-fluid',
            'title' => $image_post->post_excerpt
          ]
          ) ?>
        <?php if ($link): ?>
          </a>
        <?php endif; ?>
        <hr>
        <figcaption><?php if ($link): ?><a target_=_blank" rel="noreferrer noopener" href="<?php echo $link ?>"><?php endif; ?><?php echo $name ?><?php if ($link): ?></a><?php endif; ?></figcaption>
        <hr class="bold">
        </figure>
</div>


      <?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;

}

/**
 * Render a sponsor Block
 */
function epfl_sponsor_deck_block($data, $inner_content) {
  ob_start();
?>

<div class="container">
  <div class="row justify-content-center">
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

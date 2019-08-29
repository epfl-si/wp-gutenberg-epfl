<?php

namespace EPFL\Plugins\Gutenberg\CustomTeaser;

function epfl_custom_teaser_block( $attributes ) {
    $elementCount = 0;

    for($i = 1; $i <= 3; $i++){
        # sanitize and count titles first
        if (isset($attributes['title'.$i])) {
          $attributes['title'.$i] = sanitize_text_field( $attributes['title'.$i]);

          if ($attributes['title'.$i] !== '') {
            $elementCount++;
          }
        } else {
          $attributes['title'.$i] = '';
        }

        $attributes['imageId'.$i] = isset( $attributes['imageId'.$i] ) ? sanitize_text_field( $attributes['imageId'.$i] ) : '';
        $attributes['url'.$i] = isset( $attributes['url'.$i] ) ? sanitize_text_field( $attributes['url'.$i] ) : '';
        $attributes['excerpt'.$i] = isset( $attributes['excerpt'.$i] ) ? sanitize_text_field( $attributes['excerpt'.$i] ) : '';
        $attributes['buttonLabel'.$i] = isset( $attributes['buttonLabel'.$i] ) ? sanitize_text_field( $attributes['buttonLabel'.$i] ) : '';
        $attributes['titleSection'.$i] = isset( $attributes['titleSection'.$i] ) ? sanitize_text_field( $attributes['titleSection'.$i] ) : '';
    }

    $greyClasses = '';
    if (isset($attributes['grayBackground']) && $attributes['grayBackground'] === true) {
      $greyClasses = 'bg-gray-100 py-4 mt-4';
    }

    ob_start();
?>

<div class="container-full p-lg-5 <?php echo $greyClasses ?>">
  <div class="container">
    <?php if ($attributes['titleSection']): ?>
    <h3 class="h6 mb-3<?php echo ($elementCount < 3) ? ' text-center' : '' ?>"><?php echo $attributes['titleSection'] ?></h3>
    <?php endif; ?>
    <div class="card-deck<?php echo ($elementCount < 3) ? ' card-deck-line' : '' ?>">
      <?php
      for($i = 1; $i <= 3; $i++):
        if ($attributes['title'.$i]) :
        $image = get_post($attributes['imageId'.$i]);
      ?>
      <div class="card">
      <?php if ($attributes['imageId'.$i]): ?>
        <a href="<?php echo $attributes['url'.$i] ?: '#' ?>" class="card-img-top">
          <picture>
          <?php echo wp_get_attachment_image(
            $attributes['imageId'.$i],
            'thumbnail_16_9_crop', // see functions.php
            '',
            [
              'class' => 'img-fluid',
              'title' => $image->post_excerpt
            ]
            ) ?>
          </picture>
        </a>
        <?php endif; ?>
        <div class="card-body">
          <h3 class="card-title">
            <a href="<?php echo $attributes['url'.$i] ?: '#' ?>"><?php echo $attributes['title'.$i] ?: __('Title', 'epfl') ?></a>
          </h3>
          <p><?php echo $attributes['excerpt'.$i] ?></p>
        </div>
        <div class="card-footer mt-auto">
          <a href="<?php echo $attributes['url'.$i] ?: '#' ?>" class="btn btn-secondary btn-sm"><?php echo $attributes['buttonLabel'.$i] ?: __('See more', 'epfl') ?></a>
        </div>
      </div>
      <?php
        endif;
        endfor;
      ?>
    </div>
  </div>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}
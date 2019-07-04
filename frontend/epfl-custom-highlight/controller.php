<?php 

function epfl_custom_highlight_block( $attributes ) {
    
    $title          = isset( $attributes['title'] ) ? sanitize_text_field( $attributes['title'] ) : '';
    $description    = isset( $attributes['description'] ) ? sanitize_text_field( $attributes['description'] ) : '';
    $image_id       = isset( $attributes['imageId'] ) ? sanitize_text_field( $attributes['imageId'] ) : '';
    $link           = isset( $attributes['link'] ) ? sanitize_text_field( $attributes['link'] ) : '';
    $button_label   = isset( $attributes['buttonLabel'] ) ? sanitize_text_field( $attributes['buttonLabel'] ) : '';
    $layout         = isset( $attributes['layout'] ) ? sanitize_text_field( $attributes['layout'] ) : '';

    $image = wp_get_attachment_image(
        $image_id,
        'thumbnail_16_9_large_80p', // see functions.php
        '',
        [
          'class' => 'img-fluid'
        ]
    );
    // error_log($title);
    // error_log($description);
    // error_log($link);
    // error_log($button_label);
    // error_log($image_id);

    ob_start();

    /* Mapping between layout and classes */
    $layout_to_classes = array('right'      => 'fullwidth-teaser-right',
                                'bottom'    => 'fullwidth-teaser-horizontal',
                                'left'      => 'fullwidth-teaser-left');
    /* Init correct classe or let it empty */
    $classes = array_key_exists($layout, $layout_to_classes) ? $layout_to_classes[$layout] : '';
?>

<div class="container-full">
  <div class="fullwidth-teaser my-3  <?php echo $classes; ?>">
    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject" class="cover">
      <!-- <picture> -->
        <?php // get/slice image informations
        $image_src = wp_get_attachment_image_src($image_id, 'thumbnail_16_9_large')[0]; // see functions.php
        $image_caption = wp_get_attachment_caption($image_id);
        $image_alt = get_post_meta($image_id , '_wp_attachment_image_alt', true);
         ?>
        <img src="<?php echo $image_src ?>" alt="<?php echo $image_alt ?>" />
      <!-- </picture> -->
      <?php if ($image_caption): ?>
        <figcaption>
          <button aria-hidden="true" type="button" class="btn-circle" data-toggle="popover" data-content="<?php echo $image_caption ?>">
            <svg class="icon" aria-hidden="true"><use xlink:href="#icon-info"></use></svg>
            <svg class="icon icon-rotate-90" aria-hidden="true"><use xlink:href="#icon-chevron-right"></use></svg>
          </button>
          <p class="sr-only"><?php echo $image_caption ?></p>
        </figcaption>
      <?php endif; ?>
    </figure>
    <div class="fullwidth-teaser-text">

      <div class="fullwidth-teaser-header">
        <div class="fullwidth-teaser-title">
          <h3>
            <?php echo $title ?>
          </h3>
        </div>
        <a href="<?php echo $link ?>" aria-label="Link to read more of that page" class="btn btn-primary triangle-outer-bottom-right d-none d-xl-block"><?php echo $button_label ?: __('See more', 'epfl') ?></a>
      </div>

      <?php if (!empty($description)): ?>
        <div class="fullwidth-teaser-content">
          <p>
            <?php echo $description ?>
          </p>
        </div>
      <?php endif; ?>

      <div class="fullwidth-teaser-footer">
        <a href="<?php echo $link ?>" aria-label="Link to read more of that page" class="btn btn-primary btn-block d-xl-none"><?php echo $button_label ?: __('See more', 'epfl') ?></a>
      </div>
    </div>
  </div>
</div>



<?PHP
    $content = ob_get_contents();

    ob_end_clean();


    return $content;
}
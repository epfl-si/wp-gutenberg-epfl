<?php

// Styleguide: https://epfl-si.github.io/elements/#/content-types/basic-page >> Default Teaser

namespace EPFL\Plugins\Gutenberg\CustomTeaser;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_custom_teaser_block( $attributes ) {
    $elementCount = 0;

    for($i = 1; $i <= 3; $i++){
        # sanitize and count titles first
        $attributes['title'.$i]       = Utils::get_sanitized_attribute( $attributes, 'title'.$i );

        if ($attributes['title'.$i] !== '') {
          $elementCount++;
        }

        $attributes['imageId'.$i]       = Utils::get_sanitized_attribute( $attributes, 'imageId'.$i );
        $attributes['url'.$i]           = Utils::get_sanitized_attribute( $attributes, 'url'.$i );
        $attributes['buttonLabel'.$i]   = Utils::get_sanitized_attribute( $attributes, 'buttonLabel'.$i );
        $attributes['excerpt'.$i]       = Utils::get_sanitized_attribute( $attributes, 'excerpt'.$i );
        
    }

    $attributes['grayBackground'] = Utils::get_sanitized_attribute( $attributes, 'grayBackground', False);
    $greyClasses = '';
    if ($attributes['grayBackground']) {
      $greyClasses = 'bg-gray-100 py-4 mt-4';
    }

    $open_links_new_tab = Utils::get_sanitized_attribute( $attributes, 'openLinksNewTab', False);

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
        <a <?php if($open_links_new_tab): ?>target="_blank" rel="noopener"<?php endif; ?> href="<?php echo $attributes['url'.$i] ?: '#' ?>" class="card-img-top">
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
            <a <?php if($open_links_new_tab): ?>target="_blank" rel="noopener"<?php endif; ?> href="<?php echo $attributes['url'.$i] ?: '#' ?>"><?php echo $attributes['title'.$i] ?: __('Title', 'epfl') ?></a>
          </h3>
          <p><?php echo $attributes['excerpt'.$i] ?></p>
        </div>
        <div class="card-footer mt-auto">
          <a <?php if($open_links_new_tab): ?>target="_blank" rel="noopener"<?php endif; ?> href="<?php echo $attributes['url'.$i] ?: '#' ?>" class="btn btn-secondary btn-sm"><?php echo $attributes['buttonLabel'.$i] ?: __('See more', 'epfl') ?></a>
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
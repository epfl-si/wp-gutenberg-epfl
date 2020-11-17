<?php

// Styleguide: https://epfl-si.github.io/elements/#/content-types/news >> Highlighted Carousel

namespace EPFL\Plugins\Gutenberg\Carousel;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_carousel_block( $attributes ) {
    $elementCount = 0;

    $MAX_ELEMENTS = 5;

    for($i = 1; $i <= $MAX_ELEMENTS; $i++){
        # sanitize and count titles first
        $attributes['title'.$i]       = Utils::get_sanitized_attribute( $attributes, 'title'.$i );

        if ($attributes['title'.$i] !== '') {
          $elementCount++;
        }

        $attributes['imageId'.$i]       = Utils::get_sanitized_attribute( $attributes, 'imageId'.$i );
        $attributes['url'.$i]           = Utils::get_sanitized_url( $attributes, 'url'.$i );
        $attributes['description'.$i]   = Utils::get_sanitized_attribute( $attributes, 'description'.$i );

    }

    $open_links_new_tab = Utils::get_sanitized_attribute( $attributes, 'openLinksNewTab', '') != '';

    ob_start();
?>

<div class="container-full">
<div id="carouselNews" class="carousel slide carousel-highlighted-news" data-ride="carousel" data-interval="6000">
  <div class="carousel-inner">


    <?php
      for($i = 1; $i <= $MAX_ELEMENTS; $i++):
        if ($attributes['title'.$i]) :
        $image = get_post($attributes['imageId'.$i]);
      ?>
      <div class="carousel-item <?php if($i==1) echo 'active'; ?>">
      <div class="fullwidth-teaser fullwidth-teaser-horizontal">
        <picture>
        <?php echo wp_get_attachment_image(
            $attributes['imageId'.$i],
            'thumbnail_16_9_large_80p', // see functions.php
            '',
            [
              'title' => $image->post_excerpt
            ]
            ) ?>
        </picture>

        <div class="fullwidth-teaser-text">

          <div class="fullwidth-teaser-header">
            <div class="fullwidth-teaser-title">
              <h3>
              <?php echo $attributes['title'.$i] ?>
              </h3>
            </div>
            <a href="<?php echo esc_url($attributes['url'.$i]); ?>" <?php if($open_links_new_tab) echo 'target="_blank"'; ?>  aria-label="Link to read more of that page" class="btn btn-primary triangle-outer-top-right d-none d-xl-block">
            <?php echo __("Read more", 'epfl'); ?>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-chevron-right"></use>
              </svg>
            </a>
          </div>

          <div class="fullwidth-teaser-content">
            <p>
              <?php echo $attributes['description'.$i] ?>
            </p>
          </div>

          <div class="fullwidth-teaser-footer">
            <a href="#" aria-label="Link to read more of that page" class="btn btn-primary btn-block d-xl-none"><?php echo __("Read more", 'epfl'); ?></a>
          </div>
        </div>
      </div>
    </div>
    <?php
      endif;
      endfor;
    ?>
  </div>

  <ol class="carousel-indicators">
  <?php
  $slide_index = 0;
  for($i = 1; $i <= $MAX_ELEMENTS; $i++)
  {

    if ($attributes['title'.$i])
    {
      $class = ($i==1)?'class="active"':'';

      echo '<li data-target="#carouselNews" data-slide-to="'.($slide_index).'" '.$class.'></li>';

      $slide_index++;
    }
  }
  ?>
  </ol>

  <button role="button" class="carousel-control carousel-control-prev" role="button" data-slide="prev" data-target="#carouselNews">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-chevron-left"></use>
    </svg>
    <span class="sr-only">Previous</span>
  </button>
  <button role="button" class="carousel-control carousel-control-next" role="button" data-slide="next" data-target="#carouselNews">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-chevron-right"></use>
    </svg>
    <span class="sr-only">Next</span>
  </button>
</div>
</div>



<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

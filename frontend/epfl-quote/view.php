<?php

// Styleguide: https://epfl-si.github.io/elements/#/molecules/quote

namespace EPFL\Plugins\Gutenberg\Quote;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_quote_block( $attributes ) {

    $image_id = Utils::get_sanitized_attribute( $attributes, 'imageId' );
    $quote    = Utils::get_sanitized_attribute( $attributes, 'quote' );
    $author   = Utils::get_sanitized_attribute( $attributes, 'author' );
    $position = Utils::get_sanitized_attribute( $attributes, 'position' );

    $attachment = wp_get_attachment_image(
        $image_id,
        'thumbnail_square_crop', // see functions.php
        '',
        [
          'class' => 'img-fluid rounded-circle',
          'alt' => esc_attr($author)
        ]
    );

    /*
    var_dump($image_id);
    var_dump($quote);
    var_dump($author);
    var_dump($position);
    */

    ob_start();
?>
<div class="row my-3">
  <div class="col-6 offset-3 col-sm-4 offset-sm-4 col-md-2 offset-md-0 text-center text-md-right">
    <picture><?php echo $attachment; ?></picture>
  </div>
  <blockquote class="blockquote mt-3 col-md-10 border-0">
    <p class="mb-0"><?php echo esc_attr($quote); ?></p>
    <footer class="blockquote-footer"><cite title="<?php echo esc_attr($author); ?>"><?php echo esc_html($author); ?></cite>, <?php echo esc_html($position); ?></footer>
  </blockquote>
</div>


<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}
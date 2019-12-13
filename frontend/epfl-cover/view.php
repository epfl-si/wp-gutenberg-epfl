<?php

namespace EPFL\Plugins\Gutenberg\Cover;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_cover_block( $attributes ) {

    $image_id    = Utils::get_sanitized_attribute( $attributes, 'imageId' );
    $description = Utils::get_sanitized_attribute( $attributes, 'description' );

    /*
    var_dump($image_id);
    var_dump($description);
    */

    $attachement = wp_get_attachment_image(
        $image_id,
        'thumbnail_16_9_large_80p', // see functions.php
        '',
        [
            'class' => 'img-fluid',
            'alt' => esc_attr($description)
        ]
    );

    ob_start();
?>    
<div class="container my-3">
    <figure class="cover">
        <picture><?PHP echo $attachement; ?></picture>

<?PHP if (!empty($description)) { ?>

        <figcaption>
            <button aria-hidden="true" type="button" class="btn-circle" data-toggle="popover" data-content="<?PHP echo esc_attr($description); ?>">
                <svg class="icon" aria-hidden="true"><use xlink:href="#icon-info"></use></svg>
                <svg class="icon icon-rotate-90" aria-hidden="true"><use xlink:href="#icon-chevron-right"></use></svg>
            </button>
            <p class="sr-only"><?PHP echo esc_html($description); ?></p>
        </figcaption>
<?PHP } ?>

    </figure>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}
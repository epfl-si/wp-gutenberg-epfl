<?php

namespace EPFL\Plugins\Gutenberg\CaptionCards;

function epfl_caption_cards_block( $attributes ) {
    if (!$attributes) return;

    for ($i = 1; $i <= 10; $i++) {
        if (array_key_exists('title'.$i, $attributes)) {
            $attributes['title'.$i]    = sanitize_text_field($attributes['title'.$i]);
            $attributes['subtitle'.$i] = isset( $attributes['subtitle'.$i] ) ? sanitize_text_field( $attributes['subtitle'.$i] ) : '';
            $attributes['link'.$i]     = isset( $attributes['link'.$i] ) ? sanitize_text_field( $attributes['link'.$i] ) : '';

            if (!array_key_exists('imageId'.$i, $attributes)) {
                $attributes['imageId'.$i] = '';
            }
        }
    }

    ob_start();
?>

    <div class="container-full p-lg-5">
        <div class="row">
            <?php for($i = 1; $i <= 10; $i++): ?>
            <?php if (!empty($attributes['title'.$i])) : ?>
                <div class="col-sm-6 col-xl-4">
                <a href="<?php echo $attributes['link'.$i]; ?>" class="card card-overlay link-trapeze-horizontal">
                    <?php if (!empty($attributes['imageId'.$i])):
                        $image = get_post($attributes['imageId'.$i]);
                    ?>
                    <picture class="card-img">
                    <?php echo wp_get_attachment_image($attributes['imageId'.$i], 'thumbnail_16_9_large_40p', '', ['class' => 'img-fluid']) ?>
                    </picture>
                    <?php endif; ?>
                    <div class="card-img-overlay">
                    <h3 class="h4 card-title">
                        <span class="text-padded"><?php echo $attributes['title'.$i]; ?></span>
                    </h3>
                    <p class="h4">
                        <strong class="text-padded"><?php echo $attributes['subtitle'.$i]; ?></strong>
                    </p>
                    </div>
                </a>
                </div>
            <?php endif; ?>
            <?php endfor; ?>
        </div>
    </div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}
<?php

// Styleguide: https://epfl-si.github.io/elements/#/organisms/fullwidth-teaser

namespace EPFL\Plugins\Gutenberg\PostHighlight;

require_once(dirname(__FILE__).'/../lib/utils.php');
require_once(dirname(__FILE__).'/../lib/templates.php');

use \EPFL\Plugins\Gutenberg\Lib\Utils;
use function EPFL\Plugins\Gutenberg\Lib\Templates\epfl_excerpt;


function epfl_post_highlight_block( $attributes ) {

    $layout = Utils::get_sanitized_attribute( $attributes, 'layout' );
    $post   = Utils::get_sanitized_attribute( $attributes, 'post' );
    $post   = json_decode($post, true);

    $post   = get_post($post["value"]);

    // get excerpt
    $content = reset(explode('<!--more-->', $post->post_content));

    // manage layout
    $classes = '';
    if ($layout == 'bottom') $classes = 'fullwidth-teaser-horizontal';
    if ($layout == 'left') $classes = 'fullwidth-teaser-left';

    ob_start();
?>    
<div class="container-full my-3">
    <div class="fullwidth-teaser <?php echo $classes; ?>">

<?php if (has_post_thumbnail( $post )) { ?>
        <picture>
            <source media="(min-width: 1140px)" srcset="<?php echo get_the_post_thumbnail_url( $post, 'large' ) ?>">
                <img src="<?php echo get_the_post_thumbnail_url( $post ); ?>" aria-labelledby="background-label" alt="" />
        </picture>
<?php } ?>

        <div class="fullwidth-teaser-text">
            <div class="fullwidth-teaser-header">
                <div class="fullwidth-teaser-title">
                    <h3><?php echo $post->post_title; ?></h3>
                </div>
                <a href="<?php echo  get_permalink( $post ) ?>" aria-label="<?php echo __("Link to read more of that post", 'epfl'); ?>" class="btn btn-primary triangle-outer-bottom-right d-none d-xl-block"><?php echo __( "Read more", 'epfl' ); ?></a>
            </div>

<?php if (!empty($content)) { ?>
            <div class="fullwidth-teaser-content">
                <p><?php echo epfl_excerpt( $post ); ?></p>
            </div>
<?php } ?>

            <div class="fullwidth-teaser-footer">
                <a href="<?php echo  get_permalink( $post ) ?>" aria-label="<?php echo __("Link to read more of that post", 'epfl'); ?>" class="btn btn-primary triangle-outer-bottom-right d-none d-xl-block"><?php echo __( "Read more", 'epfl' ); ?></a>
            </div>
        </div>
    </div>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}
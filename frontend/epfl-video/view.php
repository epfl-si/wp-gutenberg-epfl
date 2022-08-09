<?php

// Styleguide: https://epfl-si.github.io/elements/#/atoms/video

namespace EPFL\Plugins\Gutenberg\Video;

/**
 * Returns HTML code to display video player
 *
 * @param String $url Video URL
 * @param String $display_type Should be'standard', 'large' or 'full'
 */
function epfl_video_render($url, $display_type) {
    $classes = ['my-3'];

    if($display_type == 'large') $classes[] = "container";
    if($display_type == 'full') $classes[] = "container-full";

    ob_start();
?>
<div class="<?php echo implode(" ", $classes) ?>">
    <div class="embed-responsive embed-responsive-16by9">
        <iframe src="<?php echo esc_url($url); ?>" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay; encrypted-media" frameborder="0" class="embed-responsive-item"></iframe>
    </div>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

<?php

// Styleguide: https://epfl-si.github.io/elements/#/atoms/video

namespace EPFL\Plugins\Gutenberg\Video;

/**
 * Returns HTML code to display video player
 * 
 * @param String $url Video URL
 * @param Boolean $large_display To tell if we have to display video with big or small width
 */
function epfl_video_render($url, $large_display) {

    ob_start();
?>
<div class="<?php if($large_display) echo "container "; ?>my-3">
    <div class="embed-responsive embed-responsive-16by9">
        <iframe src="<?php echo esc_url($url); ?>" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay; encrypted-media" frameborder="0" class="embed-responsive-item"></iframe>
    </div>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

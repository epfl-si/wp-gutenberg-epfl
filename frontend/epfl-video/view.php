<?php

// Styleguide: https://epfl-si.github.io/elements/#/atoms/video

namespace EPFL\Plugins\Gutenberg\Video;

/**
 * Returns HTML code to display browser Kaltura video player
 *
 * @param String $url Video URL
 * @param String $display_type Should be'standard', 'large' or 'full'
 */
function epfl_video_kaltura_render(
  $mediaspace_video_id,
  $partner_id,
  $uiconf_id,
  $display_type
) {
  $classes = ['my-3'];

  $target_id = 'kaltura_player_' . $mediaspace_video_id;
  $height = '20rem';

  if($display_type == 'large') {
    $classes[] = "container";
    $height = '39rem';
  }
  if($display_type == 'full') {
    $classes[] = "container-full";
    $height = '75.6rem';
  }

  ob_start();
  ?>
  <div class="<?php echo implode(" ", $classes) ?>">
    <div class="embed-responsive">
      <div id="<?= $target_id ?>" style="width: 100%;height: <?php echo $height ?>"></div>
      <script
        type="text/javascript"
        src='https://api.cast.switch.ch/p/<?= $partner_id ?>/embedPlaykitJs/uiconf_id/<?= $uiconf_id ?>?autoembed=true&targetId=<?= $target_id ?>&entry_id=<?= $mediaspace_video_id ?>&config[playback]={"autoplay":true}'
      >
      </script>
    </div>
  </div>

<?php
  $content = ob_get_contents();
  ob_end_clean();
  return $content;
}

/**
 * Returns HTML code to display browser native video player
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

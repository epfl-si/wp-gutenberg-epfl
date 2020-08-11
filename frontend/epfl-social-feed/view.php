<?php

// Styleguide: https://epfl-si.github.io/elements/#/molecules/social-feed

function epfl_social_feed_view( $twitter_url,
                                $twitter_limit,
                                $instagram_url,
                                $facebook_url,
                                $height,
                                $width
                              ) {
    # build a [url, template path] array
    $social_feed_data = [
      [$twitter_url, 'twitter_view.php'],
      [$instagram_url, 'instagram_view.php'],
      [$facebook_url, 'facebook_view.php'],
    ];

    ob_start();
    ?>
<div class="container my-3">
  <div class="social-feed-group justify-content-center">
    <?php foreach ($social_feed_data as $social_feed): ?>
      <?php if (!empty($social_feed[0])): ?>
    <div class="social-feed-container">
      <?php include_once($social_feed[1]); ?>
    </div>
      <?php endif; ?>
    <?php endforeach ?>
  </div>
</div>
<?php
    return ob_get_clean();
} ?>

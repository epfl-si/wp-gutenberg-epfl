<?php
    $instagram_url = trailingslashit(esc_url($instagram_url));
?>

<div class="social-feed">
  <span class="social-icon social-icon-instagram social-icon-round">
    <svg class="icon" aria-hidden="true"><use xlink:href="#icon-instagram"></use></svg>
  </span>

  <div class="social-feed-content">
    <div style="width:<?php esc_html_e($width) ?>px;">

      <blockquote class="instagram-media"
                  data-instgrm-captioned
                  data-instgrm-permalink="<?= $instagram_url ?>"
                  data-instgrm-version="13"
      >
        <div style="height:2px;"></div>
      </blockquote>
      <script async src="//www.instagram.com/embed.js"></script>
    </div>
    <div>
      <a class="btn btn-secondary mt-4" href="<?= $instagram_url ?>" target="_blank"><?php esc_html_e('View this post on Instagram', 'epfl'); ?></a>
    </div>
  </div>
</div>

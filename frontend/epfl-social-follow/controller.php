<?php
// Styleguide: https://epfl-si.github.io/elements/#/molecules/social

namespace EPFL\Plugins\Gutenberg\SocialFollow;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');


function epfl_social_follow_block( $attributes ) {

    $blueskyUrl = Utils::get_sanitized_url( $attributes, 'blueskyUrl' );
    $facebookUrl  = Utils::get_sanitized_url( $attributes, 'facebookUrl' );
    $githubUrl  = Utils::get_sanitized_url( $attributes, 'githubUrl' );
    $gitlabUrl  = Utils::get_sanitized_url( $attributes, 'gitlabUrl' );
    $instagramUrl = Utils::get_sanitized_url( $attributes, 'instagramUrl' );
    $linkedinUrl  = Utils::get_sanitized_url( $attributes, 'linkedinUrl' );
    $mastodonUrl  = Utils::get_sanitized_url( $attributes, 'mastodon' );
    $tiktokUrl  = Utils::get_sanitized_url( $attributes, 'tiktok' );
    $twitterUrl   = Utils::get_sanitized_url( $attributes, 'twitterUrl' );
    $youtubeUrl   = Utils::get_sanitized_url( $attributes, 'youtubeUrl' );

    ob_start();
?>


  <div class="row">
    <div class="social-share-container social-share-light">

      <div class="social-share">
        <p class="social-share-text">
          <?php echo __("Follow us", "epfl"); ?> <span class="sr-only"><?php echo __("in social networks", "epfl"); ?></span>
        </p>

        <ul class="social-icon-list list-inline">
          <?php if (!empty($blueskyUrl)): ?>
            <li>
              <a href="<?php echo $blueskyUrl ?>" class="social-icon social-icon-bluesky social-icon-discrete" target="_blank" rel="nofollow noopener">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bluesky"></use>
                </svg>
                <span class="sr-only"><?php echo __("Follow us on Bluesky", "epfl"); ?></span>
              </a>
            </li>
          <?php endif; ?>
          <?php if (!empty($facebookUrl)): ?>
            <li>
              <a href="<?php echo $facebookUrl ?>" class="social-icon social-icon-facebook social-icon-discrete" target="_blank" rel="nofollow noopener">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-facebook"></use>
                </svg>
                <span class="sr-only"><?php echo __("Follow us on Facebook", "epfl"); ?></span>
              </a>
            </li>
          <?php endif; ?>
          <?php if (!empty($githubUrl)): ?>
            <li>
              <a href="<?php echo $githubUrl ?>" class="social-icon social-github social-icon-discrete" target="_blank" rel="nofollow noopener">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#github"></use>
                </svg>
                <span class="sr-only"><?php echo __("Follow us on GitHub", "epfl"); ?></span>
              </a>
            </li>
          <?php endif; ?>
          <?php if (!empty($gitlabUrl)): ?>
            <li>
              <a href="<?php echo $gitlabUrl ?>" class="social-icon social-gitlab social-icon-discrete" target="_blank" rel="nofollow noopener">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#gitlab"></use>
                </svg>
                <span class="sr-only"><?php echo __("Follow us on GitLab", "epfl"); ?></span>
              </a>
            </li>
          <?php endif; ?>
          <?php if (!empty($instagramUrl)): ?>
            <li>
              <a href="<?php echo $instagramUrl ?>" class="social-icon social-icon-instagram social-icon-discrete" target="_blank" rel="nofollow noopener">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-instagram"></use>
                </svg>
                <span class="sr-only"><?php echo __("Follow us on Instagram", "epfl"); ?></span>
              </a>
            </li>
          <?php endif; ?>
          <?php if (!empty($linkedinUrl)): ?>
            <li>
              <a href="<?php echo $linkedinUrl ?>" class="social-icon social-icon-linkedin social-icon-discrete" target="_blank" rel="nofollow noopener">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-linkedin"></use>
                </svg>
                <span class="sr-only"><?php echo __("Follow us on LinkedIn", "epfl"); ?></span>
              </a>
            </li>
          <?php endif; ?>
          <?php if (!empty($mastodonUrl)): ?>
            <li>
              <a href="<?php echo $mastodonUrl ?>" class="social-icon social-icon-mastodon social-icon-discrete" target="_blank" rel="nofollow noopener">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-mastodon"></use>
                </svg>
                <span class="sr-only"><?php echo __("Follow us on Mastodon", "epfl"); ?></span>
              </a>
            </li>
          <?php endif; ?>
          <?php if (!empty($tiktokUrl)): ?>
            <li>
              <a href="<?php echo $tiktokUrl ?>" class="social-icon social-icon-tiktok social-icon-discrete" target="_blank" rel="nofollow noopener">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-tiktok"></use>
                </svg>
                <span class="sr-only"><?php echo __("Follow us on TikTok", "epfl"); ?></span>
              </a>
            </li>
          <?php endif; ?>
          <?php if (!empty($youtubeUrl)): ?>
            <li>
              <a href="<?php echo $youtubeUrl ?>" class="social-icon social-icon-youtube social-icon-discrete" target="_blank" rel="nofollow noopener">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-youtube"></use>
                </svg>
                <span class="sr-only"><?php echo __("Follow us on YouTube", "epfl"); ?></span>
              </a>
            </li>
          <?php endif; ?>
          <?php if (!empty($twitterUrl)): ?>
            <li>
              <a href="<?php echo $twitterUrl ?>" class="social-icon social-icon-x social-icon-discrete" target="_blank" rel="nofollow noopener">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-x"></use>
                </svg>
                <span class="sr-only"><?php echo __("Follow us on X", "epfl"); ?></span>
              </a>
            </li>
          <?php endif; ?>
        </ul>
      </div>

    </div>
  </div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

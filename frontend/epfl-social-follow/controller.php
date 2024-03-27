<?php
// Styleguide: https://epfl-si.github.io/elements/#/molecules/social

namespace EPFL\Plugins\Gutenberg\SocialFollow;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');


function epfl_social_follow_block( $attributes ) {

    $facebookUrl  = Utils::get_sanitized_url( $attributes, 'facebookUrl' );
    $twitterUrl   = Utils::get_sanitized_url( $attributes, 'twitterUrl' );
    $instagramUrl = Utils::get_sanitized_url( $attributes, 'instagramUrl' );
    $youtubeUrl   = Utils::get_sanitized_url( $attributes, 'youtubeUrl' );
    $linkedinUrl  = Utils::get_sanitized_url( $attributes, 'linkedinUrl' );

    ob_start();
?>


  <div class="container">
    <div class="social-share-container social-share-light">

      <div class="social-share ">
        <p class="social-share-text">
          <?php echo __("Follow us", "epfl"); ?> <span class="sr-only"><?php echo __("in social networks", "epfl"); ?></span>
        </p>

        <ul class="social-icon-list list-inline">
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
        </ul>
      </div>

    </div>
  </div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

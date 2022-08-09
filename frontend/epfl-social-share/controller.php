<?php
// Styleguide: https://epfl-si.github.io/elements/#/molecules/social

namespace EPFL\Plugins\Gutenberg\SocialShare;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');


function epfl_social_share_block( $attributes ) {

    $openFacebook = Utils::get_sanitized_attribute( $attributes, 'openFacebook', true );
    $openTwitter  = Utils::get_sanitized_attribute( $attributes, 'openTwitter', true );
    $openEmail    = Utils::get_sanitized_attribute( $attributes, 'openEmail', true );
    $openLinkedin = Utils::get_sanitized_attribute( $attributes, 'openLinkedin', true );
    $openCopyUrl  = Utils::get_sanitized_attribute( $attributes, 'openCopyUrl', true );

    $url          = get_permalink();
    $title        = get_the_title();

    ob_start();
?>

  <div class="container">
    <div class="social-share-container">
      <div class="social-share ">
        <p class="social-share-text">
          <?php echo __("Share on", "epfl"); ?>
        </p>
        <ul class="social-icon-list list-inline">
          <?php if ($openFacebook): ?>
          <li>
            <a href="https://www.facebook.com/sharer/sharer.php?u=<?php echo $url ?>&title=<?php echo $title ?>" class="social-icon social-icon-facebook social-icon-discrete" target="_blank" rel="nofollow noopener">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-facebook"></use>
              </svg>
              <span class="sr-only"><?php echo __("Share on Facebook", "epfl"); ?></span>
            </a>
          </li>
          <?php endif; ?>
          <?php if ($openTwitter): ?>
          <li>
            <a href="https://twitter.com/intent/tweet?url=<?php echo $url ?>&text=<?php echo $title ?>&hashtags=epfl" class="social-icon social-icon-twitter social-icon-discrete" target="_blank" rel="nofollow noopener">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-twitter"></use>
              </svg>
              <span class="sr-only"><?php echo __("Share on Twitter", "epfl"); ?></span>
            </a>
          </li>
          <?php endif; ?>
          <?php if ($openLinkedin): ?>
          <li>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=<?php echo $url ?>" class="social-icon social-icon-linkedin social-icon-discrete" target="_blank" rel="nofollow noopener">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-linkedin"></use>
              </svg>
              <span class="sr-only"><?php echo __("Share on LinkedIn", "epfl"); ?></span>
            </a>
          </li>
          <?php endif; ?>
          <?php if ($openEmail): ?>
          <li>
            <a href="mailto:?subject=<?php echo $title ?>&body=<?php echo $url ?>" class="social-icon social-icon-mail-plane social-icon-discrete" target="_blank" rel="nofollow noopener">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-mail-plane"></use>
              </svg>
              <span class="sr-only"><?php echo __("Share by e-mail", "epfl"); ?></span>
            </a>
          </li>
          <?php endif; ?>
        </ul>
      </div>
      <?php if ($openCopyUrl): ?>
      <div class="social-share-copylink">
        <div class="input-group">
          <input type="text" class="form-control sr-only" value="<?php echo $url ?>" aria-label="<?php echo __("Shared link", "epfl"); ?>">
          <button class="btn btn-primary btn-sm social-share-copy" title="<?php echo __("Copy the URL of the page", "epfl"); ?>" type="button" data-success="<?php echo __("URL copied !", "epfl"); ?>"><?php echo __("Copy URL", "epfl"); ?></button>
        </div>
      </div>
      <?php endif; ?>
    </div>
  </div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}


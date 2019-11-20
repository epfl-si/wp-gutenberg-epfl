<?php

namespace EPFL\Plugins\Gutenberg\Lib\Templates;

/**
 * custom function for epfl excerpts. With a given post, returns a formatted excerpt.
 * it will have the same behaviour whether it takes a user-defined excerpt or generates one from the content
 * @arg $post a WP_Post object
 */
function epfl_excerpt($post = null) {
	if(!$post) return '';
	$excerpt = $post->post_excerpt;
	if (strlen($excerpt) == 0) {
		// custom excerpt is empty, let's generate one
		$excerpt = strip_shortcodes($post->post_content);
		$excerpt = str_replace(array("\r\n", "\r", "\n", "&nbsp;"), "", $excerpt);
		$excerpt = wp_trim_words($excerpt, apply_filters('excerpt_length', ''), apply_filters('excerpt_more', ''));
	} else {
		// custom excerpt is set, let's trim it
		$excerpt = wp_trim_words($excerpt, apply_filters('excerpt_length', ''), apply_filters('excerpt_more', ''));
	}
	return $excerpt;
}


function card_img_top($img, $url, $islink = true){
  //display nothing if no image available
  if (!$img) return '';
  ?>

  <?php if ($islink): ?>
    <a href="<?php echo $url; ?>" class="card-img-top">
      <picture class="card-img-top">
        <?php echo $img; ?>
      </picture>
    </a>
  <?php else: ?>
    <picture class="card-img-top">
      <?php echo $img; ?>
    </picture>
  <?php endif; ?>

<?php } ?>

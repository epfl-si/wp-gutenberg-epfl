<?php

// Styleguide: https://epfl-si.github.io/elements/#/molecules/links-group

namespace EPFL\Plugins\Gutenberg\LinksGroup;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_links_group_block( $attributes ) {
  $main_url           = Utils::get_sanitized_url( $attributes, 'mainUrl' );
  $title              = Utils::get_sanitized_attribute( $attributes, 'title' );
  $open_links_new_tab = Utils::get_sanitized_attribute( $attributes, 'openLinksNewTab' );

  unset($attributes['mainUrl']);
  unset($attributes['title']);

  $is_links_teaser = ("" !== $main_url);

  $links = [];

  for($i=1; $i<=10; $i++)
  {
    $link_label = Utils::get_sanitized_attribute( $attributes, 'label'.$i );
    $link_url = Utils::get_sanitized_attribute( $attributes, 'url'.$i );
    // we skip empty values
    if($link_label=="" || $link_url == "") continue;

    $links[] = array('label' => $link_label,
                     'url'   => $link_url);
  }


  ob_start();
?>
<div class="my-3">
  <div class="links-group <?php if ($is_links_teaser):?>links-group-teaser<?php endif; ?>">
    <h5 id="links-group-title">
      <?php if($is_links_teaser): ?>
      <a class="link-pretty" <?php if($open_links_new_tab): ?>target="_blank" rel="noopener"<?php endif; ?> href="<?php echo esc_url($main_url) ?>"><?php echo esc_html($title) ?></a>
      <?php else: ?>
      <?php echo esc_html($title) ?>
      <?php endif; ?>
    </h5>
	<ul>
		<?php foreach($links as $link): ?>
			<li><a <?php if($open_links_new_tab): ?>target="_blank" rel="noopener"<?php endif; ?> href="<?php echo esc_url($link['url']) ?>"><?php echo esc_html($link['label']) ?></a></li>
		<?php endforeach ?>
	</ul>
  </div>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

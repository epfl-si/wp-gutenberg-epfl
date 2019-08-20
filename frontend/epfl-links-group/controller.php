<?php
namespace EPFL\Plugins\Gutenberg\LinksGroup;

function epfl_links_group_block( $attributes ) {
  $main_url = isset( $attributes['mainUrl'] ) ? sanitize_text_field( $attributes['mainUrl'] ) : '';
  $title = isset( $attributes['title'] ) ? sanitize_text_field( $attributes['mainUrl'] ) : '';
  unset($attributes['mainUrl']);
  unset($attributes['title']);

  $is_links_teaser = ("" !== $main_url);

  $links = [];
  foreach ($attributes as $key => $value) {
    $field_key = substr($key, -1);
    $field_name = substr($key, 0, -1);
    $value = isset( $value ) ? sanitize_text_field( $value ) : '';
    $links[$field_key][$field_name] = $value;
  }

  ob_start();
?>
<div class="container-grid my-3">
  <div class="links-group <?php if ($is_links_teaser):?>links-group-teaser<?php endif; ?>">
    <h5 id="links-group-title">
      <?php if($is_links_teaser): ?>
      <a class="link-pretty" href="<?php echo esc_url($main_url) ?>"><?php echo esc_html($title) ?></a>
      <?php else: ?>
      <?php echo esc_html($title) ?>
      <?php endif; ?>
    </h5>
    <nav
      class="nav flex-column flex-wrap align-items-start"
      role="navigation"
      aria-labelledby="links-group-title"
    >
    <?php foreach($links as $link): ?>
      <a class="nav-link link-pretty" href="<?php echo esc_url($link['url']) ?>"><?php echo esc_html($link['label']) ?></a>
    <?php endforeach ?>
    </nav>
  </div>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}
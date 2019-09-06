<?php

namespace EPFL\Plugins\Gutenberg\Card;

function epfl_card_block($data) {
  if (!$data) return;

    // sanitize parameters
  foreach($data as $key => $value) {
      if (strpos($key, 'content') !== false)
      {
          $atts[$key] = wp_kses_post($value);
      } else {
          $atts[$key] = sanitize_text_field($value);
      }
  }

  $gray_wrapper = Utils::get_sanitized_attribute($data, 'grayWrapper', false);


  $elementCount = 0;
  for($i = 1; $i < 4; $i++){
    # sanitize and count titles first
    if (array_key_exists('title'.$i, $data)){
      if (strlen(esc_html($data['title'.$i])) > 0) {
        $data['title'.$i] = esc_html($data['title'.$i]);
        $elementCount++;
      } else {
        unset($data['title'.$i]);
      }
    }
  }

  if ($elementCount == 0) {
    return;
  }

  ob_start();
?>

<div class="container-full py-3<?php echo ($gray_wrapper) ? ' bg-gray-100' : '' ?>">
  <div class="card-deck <?php echo ($elementCount < 3) && ($elementCount > 1) ? ' card-deck-line' : '' ?>">
    <?php
    for($i = 1; $i < 4; $i++):
      if (!(array_key_exists('title'.$i, $data))) {
        # show the card only if the title is set
        continue;
      }

      $title = esc_html($data['title'.$i]);

      if (array_key_exists('imageId'.$i, $data)) {
        $image_id = $data['imageId'.$i];
        $image_post = get_post($image_id);
      } else {
        $image_id = '';
        $image_post = null;
      }

      if (array_key_exists('link'.$i, $data)) {
        $url = esc_url($data['link'.$i]);
      } else {
        $url = null;
      }

      if (array_key_exists('content'.$i, $data)) {
        $content = urldecode($data['content'.$i]);
      } else {
        $content = null;
      }
    ?>
    <div class="card">
      <?php if ($image_id): ?>
        <?php if ($url): ?>
      <a href="<?php echo $url ?>" class="card-img-top">
        <?php else: ?>
      <div class="card-img-top">
        <?php endif; ?>
        <picture>
        <?php echo wp_get_attachment_image(
          $image_id,
          'thumbnail_16_9_large_40p', // see functions.php
          '',
          [
            'class' => 'img-fluid',
            'title' => $image_post->post_excerpt
          ]
          ) ?>
        </picture>
        <?php if ($url): ?>
      </a>
        <?php else: ?>
      </div>
        <?php endif; ?>
      <?php endif; ?>
        <div class="card-body">
          <?php if ($url): ?>
          <div class="card-title"><a href="<?php echo $url ?>" class="h3"><?php echo $title ?></a></div>
          <?php else: ?>
          <div class="card-title"><div class="h3"><?php echo $title ?></div></div>
          <?php endif; ?>
          <p><?php echo $content ?></p>
        </div>
      </div>
    <?php
      endfor;
    ?>
  </div>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

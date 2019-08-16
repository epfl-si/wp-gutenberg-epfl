<?php

namespace EPFL\Plugins\Gutenberg\DefinitionList;

function epfl_definition_list_block($data) {
  if (!$data) return true;

  // sanitize parameters
  if (in_array('tableDisplay', $data)) {
    $tabledisplay = $data['tableDisplay'];
  } else {
    $tabledisplay = false;
  }

  if (in_array('largeDisplay', $data)) {
    $largedisplay = $data['largeDisplay'];
  } else {
    $largedisplay = false;
  }

  for($i = 1; $i <= 10; $i++){
    # sanitize and count titles first
    $attributes['label'.$i] = isset( $attributes['label'.$i] ) ? sanitize_text_field( $attributes['label'.$i] ) : '';
    $attributes['desc'.$i] = isset( $attributes['desc'.$i] ) ? sanitize_text_field( $attributes['desc'.$i] ) : '';
  }

  ob_start();
?>
<?php if ($largedisplay): ?>
<div class="container-full"><div class="container">
<?php endif; ?>

<dl class="definition-list<?php echo $tabledisplay ? ' definition-list-grid' : ''?>">

  <?php foreach ($data as $key => $value) {
    // if definition is empty, skip this entry
    if ($skipNext) {
      $skipNext = false;
      continue;
    }

    if (strlen($value) === 0) {
      $skipNext = true;
      continue;
    }

    if (strpos($key, 'label') === 0) {
      echo '<dt>' . $value . '</dt>';
    }
    else if (strpos($key, 'desc') === 0) {
      echo '<dd>' . $value . '</dd>';
    }

  } //foreach
  ?>
  </dl>
<?php if ($largedisplay): ?>
</div></div>
<?php endif; ?>
<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

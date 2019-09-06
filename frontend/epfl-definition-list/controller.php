<?php

namespace EPFL\Plugins\Gutenberg\DefinitionList;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_definition_list_block($attributes) {
  if (!$attributes) return;

  // sanitize parameters
  if (in_array('tableDisplay', $attributes)) {
    $tabledisplay = $attributes['tableDisplay'];
  } else {
    $tabledisplay = false;
  }

  if (in_array('largeDisplay', $attributes)) {
    $largedisplay = $attributes['largeDisplay'];
  } else {
    $largedisplay = false;
  }

  for($i = 1; $i <= 10; $i++){
    # sanitize and count titles first
    $attributes['label'.$i] = Utils::get_sanitized_attribute( $attributes, 'label'.$i );
    $attributes['desc'.$i]  = Utils::get_sanitized_attribute( $attributes, 'desc'.$i );
  }

  ob_start();
?>
<?php if ($largedisplay): ?>
<div class="container-full"><div class="container">
<?php endif; ?>

<dl class="definition-list<?php echo $tabledisplay ? ' definition-list-grid' : ''?>">

  <?php foreach ($attributes as $key => $value) {
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

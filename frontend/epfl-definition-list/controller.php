<?php

// Styleguide: https://epfl-si.github.io/elements/#/atoms/definition-list

namespace EPFL\Plugins\Gutenberg\DefinitionList;

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

  # We will put all definitions in an array
  $definitions = array();

  for($i = 1; $i <= 10; $i++){
    
    $label = (array_key_exists('label'.$i, $attributes)) ? wp_kses_post($attributes['label' . $i]) : '';
    $desc = (array_key_exists('desc'.$i, $attributes)) ? wp_kses_post($attributes['desc' . $i]) : '';
    
    $definitions[] = array('label' => $label,
                           'desc'  => $desc);
  }

  ob_start();
?>
<?php if ($largedisplay): ?>
<div class="container-full"><div class="container">
<?php endif; ?>

<dl class="definition-list<?php echo $tabledisplay ? ' definition-list-grid' : ''?>">

  <?php
  foreach ($definitions as $definition) {
    
    if($definition['label'] == "" || $definition['desc'] == "") continue;

    echo '<dt>' . $definition['label'] . '</dt>';
    echo '<dd>' . $definition['desc'] . '</dd>';
    

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

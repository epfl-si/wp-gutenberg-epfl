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

  # We will put all definitions in an array
  $definitions = array();

  for($i = 1; $i <= 10; $i++){
    $definitions[] = array('label' => Utils::get_sanitized_attribute( $attributes, 'label'.$i ),
                           'desc'  => Utils::get_sanitized_attribute( $attributes, 'desc'.$i ));
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

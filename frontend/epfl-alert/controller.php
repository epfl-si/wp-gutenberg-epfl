<?php

namespace EPFL\Plugins\Gutenberg\Alert;

use \EPFL\Plugins\Gutenberg\Lib\Utils;


/**
 * Handle alert rendering
 * 
 * @param Array $attributes Parameters given by user in form.
 */
function epfl_alert_block( $attributes ) {

  $content        = $attributes['content'] ?? '';
  $alert_type     = Utils::get_sanitized_attribute( $attributes, 'alertType' , 'info');
  $large_display  = Utils::get_sanitized_attribute( $attributes, 'largeDisplay', false ) === '1';
  $can_be_closed  = Utils::get_sanitized_attribute( $attributes, 'canBeClosed', false ) === '1';

  ob_start();
  ?>
  <div class="<?php if($large_display) echo "container"; ?> my-3">
    <div class="alert alert-<?php echo $alert_type; echo ($can_be_closed)?' alert-dismissible':' '; ?>  fade show" role="alert">
      <?php echo $content; ?>
      <?php if($can_be_closed): ?>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      <?php endif; ?>
    </div>
  </div>

<?php
      $content = ob_get_contents();
      ob_end_clean();
      return $content;
}
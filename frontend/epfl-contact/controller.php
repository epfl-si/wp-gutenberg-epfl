<?php

namespace EPFL\Plugins\Gutenberg\Contact;

function epfl_contact_block($atts) {
    // sanitize parameters
    foreach($atts as $key => $value) {
        if (strpos($key, 'information') !== false ||
        strpos($key, 'timetable') !== false) {
            $atts[$key] = wp_kses_post($value);
        }
        elseif ($key == 'introduction')
        {
            $atts[$key] = sanitize_textarea_field($value);
        } else {
            $atts[$key] = sanitize_text_field($value);
        }
    }

    $gray_wrapper = $atts['gray_wrapper'];
    ob_start();
?>

    <div class="container <?php echo ($gray_wrapper) ? 'bg-gray-100 py-2 my-5' : 'my-3'; ?>">
    <?php if ($gray_wrapper): ?><div class="bg-white p-4 p-md-5"><?php endif; ?>
      <div class="row">
        <div class="col-md-6">
          <h3>Contact</h3>
          <p><?php esc_html_e($atts['introduction']) ?></p>

          <?php for ($i=1; $i < 5; $i++): ?>
            <?php if ($atts['timetable'.$i]): ?>
          <div class="card card-body card-sm mb-2 flex-row flex-wrap justify-content-between justify-content-sm-start">
            <div class="mr-3 w-sm-50"><?php echo $atts['timetable'.$i] ?></div>
          </div>
          <?php
          endif;
          endfor;
          ?>
          <?php for ($i=1; $i < 4; $i++): ?>
            <?php if ($atts['information'.$i]): ?>
          <p><?php echo urldecode($atts['information'.$i]) ?: '' ?></p>
          <?php if ($atts['information'.($i+1)]): ?>
          <hr>
          <?php endif; ?>
          <?php
          endif;
          endfor;
          ?>
        </div>
        <?php
        # bad quickfix that disallow INN011 as a place
        # because INN011 was a value in shortcake and not a placeholder
        # meaning some contact shortcode have this value but don't want to show a map
        if ($atts['map_query'] && $atts['map_query'] != 'INN011'):
        ?>
        <div class="col-md-6 d-flex flex-column">
          <?php echo
           epfl_map_block(['query' => $atts['map_query'], 'lang' => pll_current_language()]); ?>
        </div>
        <?php endif; ?>
      </div>
    <?php if ($gray_wrapper): ?></div><?php endif; ?>
  </div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

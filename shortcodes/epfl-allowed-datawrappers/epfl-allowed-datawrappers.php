<?php

namespace EPFL\Plugins\Shortcodes\EPFLAllowedDatawrappers;

use \EPFL\Plugins\Gutenberg\Lib\Utils;


// Logic to validate the ID attribute with the whitelist
function allowed_id_checker($id, $allowed_id)
{
	return substr($id, 0, strlen($allowed_id)) === $allowed_id;
}

// Validate the URL against the whitelist
function is_this_id_allowed($id)
{
	$allowed_ids = file(WP_PLUGIN_DIR . '/wp-gutenberg-epfl/shortcodes/epfl-allowed-datawrappers/allowed_id.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
	foreach ($allowed_ids as $allowed_id) {
		if (!empty($allowed_id) && allowed_id_checker($id, $allowed_id)) {
			return true;
		}
	}
	return false;
}

function epfl_allowed_datawrappers_process_shortcode($atts, $content = null)
{
	$atts = shortcode_atts([
					'id' => '',
					'display' => ''
	], $atts);
	if ($atts['display'] == 'large') {
		$displayType = 'container';
	} else {
		$displayType = 'container-grid';
	}
	if (is_this_id_allowed($atts['id'])) {
		ob_start();
		?>

		<div class="my-3 <?php echo $displayType; ?>">
			<iframe
							id="datawrapper-chart-bdqZJ"
							src="https://datawrapper.dwcdn.net/<?php echo esc_attr($atts['id']); ?>"
							scrolling="no"
							frameborder="0"
							style="width: 0;min-width: 100% !important; border: none;"
							height="359"
							class="w-100"
			></iframe>
			<script type="text/javascript">!function() {
			  'use strict'
			  window.addEventListener('message', ( function(e) {
				  if (void 0 !== e.data['datawrapper-height']) {
					  var t = document.querySelectorAll('iframe')
					  for (var a in e.data['datawrapper-height']) for (var r = 0; r < t.length; r++) {if (t[r].contentWindow === e.source) t[r].style.height = e.data['datawrapper-height'][a] + 'px'}
				  }
			  } ))
		  }()</script>
		</div>
		<?php
		$content = ob_get_contents();
		ob_end_clean();
		return $content;

	} else {
		// Only display the error when the user is logged in
		if (is_user_logged_in()) {
			return Utils::render_user_msg("datawrappers id not allowed");
		}
	}
}

add_action('init', function () {
	// define the shortcode
	add_shortcode('epfl_allowed_datawrappers', __NAMESPACE__ . '\epfl_allowed_datawrappers_process_shortcode');
});

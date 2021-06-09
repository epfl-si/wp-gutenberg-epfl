<?php

namespace EPFL\Plugins\Shortcodes\EPFLAllowedIframe;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

function epfl_allowed_iframe_process_shortcode( $atts, $content = null ) {
    $atts = shortcode_atts( array(
            'url' => ''
    ), $atts );

    if (strpos(file_get_contents("./wp-content/plugins/wp-gutenberg-epfl/shortcodes/epfl-allowed-iframe/allowed_url.txt"),$atts['url']) !== false) {
    	$url = sanitize_text_field($atts['url']);
    }
    else
    {
       if ( $screen->parent_base != 'edit' ) {
          return Utils::render_user_msg("iframe url not allowed");
       }	
    }
?>

<div class="my-3 container">
    <div class="embed-responsive embed-responsive-16by9">
	<iframe src="<?php echo esc_url($url); ?>" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay; encrypted-media" frameborder="0" class="embed-responsive-item"></iframe>
    </div>
</div>

<?php

    return ob_get_clean();
}

add_action( 'init', function() {
  // define the shortcode
  add_shortcode('epfl_allowed_iframe', __NAMESPACE__ . '\epfl_allowed_iframe_process_shortcode');
});


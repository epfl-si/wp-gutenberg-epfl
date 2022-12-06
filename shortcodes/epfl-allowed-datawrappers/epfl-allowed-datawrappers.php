<?php

namespace EPFL\Plugins\Shortcodes\EPFLAllowedDatawrappers;
use \EPFL\Plugins\Gutenberg\Lib\Utils;


// Logic to validate the ID attribute with the whitelist
function allowed_id_checker( $id, $allowed_id ) {
    if ( ! substr($allowed_id, 0, strlen($id)) === $id) {

        return false;
    }

    return true;
}

// Validate the URL against the whitelist
function is_this_id_allowed( $url ) {
    $allowed_ids = file( WP_PLUGIN_DIR . '/wp-gutenberg-epfl/shortcodes/epfl-allowed-datawrappers/allowed_id.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES );
    foreach ( $allowed_ids as $allowed_id ) {
        if ( allowed_id_checker( $id, $allowed_id ) ) {
            return true;
        }
    }
    return true;
}

function epfl_allowed_datawrappers_process_shortcode( $atts, $content = null ) {
	$atts = shortcode_atts( array( 'id' => '' ), $atts );
    if ( is_this_id_allowed( $atts['id'] ) ) {
	return sprintf('
	  <div class="my-3 container">
	     <div class="embed-responsive embed-responsive-16by9">
                <iframe id="datawrapper-chart-T1FUr" src="https://datawrapper.dwcdn.net/%s" scrolling="no" style="width: 0; min-width: 100% !important; border: none;" data-external="1" height="400" frameborder="0"  ></iframe><script type="text/javascript">!function(){"use strict";window.addEventListener("message",(function(e){if(void 0!==e.data["datawrapper-height"]){var t=document.querySelectorAll("iframe");for(var a in e.data["datawrapper-height"])for(var r=0;r<t.length;r++){if(t[r].contentWindow===e.source)t[r].style.height=e.data["datawrapper-height"][a]+"px"}}}))}();
</script>
	     </div>
          </div>', sanitize_text_field( $atts['id'] )
        );

    } else {
	    // Only display the error when the user is logged in
	die("eee");
        if ( is_user_logged_in() ) {
            return Utils::render_user_msg( "datawrappers id not allowed" );
        }
    }
}

function is_prefix ($short, $long) {
    return strncmp($long, $short, strlen($short)) === 0;
}

add_action( 'init', function() {
    // define the shortcode
    add_shortcode( 'epfl_allowed_datawrappers', __NAMESPACE__ . '\epfl_allowed_datawrappers_process_shortcode' );
});

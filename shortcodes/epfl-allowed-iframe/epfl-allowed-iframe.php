<?php

namespace EPFL\Plugins\Shortcodes\EPFLAllowedIframe;
use \EPFL\Plugins\Gutenberg\Lib\Utils;


// Logic to validate the sortcode URL attribute with the whitelist
function allowed_url_checker( $url, $allowed_url ) {
    if ( false === filter_var( $url, FILTER_VALIDATE_URL ) ) {
        return false;
    }
    if ( false === filter_var( $allowed_url, FILTER_VALIDATE_URL ) ) {
        return false;
    }
    $url = parse_url( $url );
    // HTTPS only
    if ( ( isset( $url['scheme'] ) && 'https' !== $url['scheme'] ) || empty( $url['scheme'] ) ) {
        return false;
    }

    $allowed_url = parse_url( $allowed_url );
    // host has to be the same
    if ( $allowed_url['host'] !== $url['host'] ) {
        return false;
    }

    // path has to start with the configured URL
    if ( ! is_prefix($allowed_url['path'], $url['path']) ) {
        return false;
    }

    return true;
}

// Validate the URL against the whitelist
function is_this_url_allowed( $url ) {
    $allowed_urls = file( WP_PLUGIN_DIR . '/wp-gutenberg-epfl/shortcodes/epfl-allowed-iframe/allowed_url.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES );
    foreach ( $allowed_urls as $allowed_url ) {
        if ( allowed_url_checker( $url, $allowed_url ) ) {
            return true;
        }
    }
    return false;
}


function epfl_allowed_iframe_process_shortcode( $atts, $content = null ) {
    $atts = shortcode_atts(
        array(
            'url' => '',
            'height' => '100%',
            'width' => '100%',
        ),
        $atts
    );

    if ( is_this_url_allowed( $atts['url'] ) ) {

        $url = esc_url( sanitize_text_field( $atts['url'] ) );
        $height = esc_attr( sanitize_text_field( $atts['height'] ) );
        $width = esc_attr( sanitize_text_field( $atts['width'] ) );

        return sprintf('
            <div class="my-3 container" style="height: %2$s; width: %3$s">
                <div class="embed-responsive embed-responsive-16by9 h-100">
                    <iframe src="%1$s" webkitallowfullscreen mozallowfullscreen allowfullscreen allow="autoplay; encrypted-media" class="embed-responsive-item border-0"></iframe>
                </div>
            </div>', $url, $height, $width
        );

    } else {
        // Only display the error when the user is logged in
        if ( is_user_logged_in() ) {
            return Utils::render_user_msg( "iframe url not allowed" );
        }
    }
}

function is_prefix ($short, $long) {
    return strncmp($long, $short, strlen($short)) === 0;
}

add_action( 'init', function() {
    // define the shortcode
    add_shortcode( 'epfl_allowed_iframe', __NAMESPACE__ . '\epfl_allowed_iframe_process_shortcode' );
});

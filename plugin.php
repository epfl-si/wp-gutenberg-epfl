<?php
/**
 * Plugin Name: wp-gutenberg-epfl
 * Description: EPFL Gutenberg Blocks
 * Author: greglebarbar
 * Version: 1.0.0
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'frontend/init.php';

// load .mo file for translation
function epfl_gutenberg_load_textdomain() {

	//load_plugin_textdomain( 'epflgutenberg', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	load_plugin_textdomain( 'wp-gutenberg-epfl', FALSE, basename( dirname( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'epfl_gutenberg_load_textdomain' );


function my_plugin_allowed_block_types( $allowed_block_types, $post ) {

    $blocks = array(
        'epfl/news',
        'epfl/memento',
        'epfl/cover',
        'epfl/cover-dynamic',
        'epfl/toggle',
        'epfl/quote',
        'epfl/people',
        'epfl/map',
        'epfl/introduction',
        'epfl/hero',
        'epfl/google-forms',
        'epfl/video',
        'epfl/scheduler',
        'epfl/tableau',
        'epfl/infoscience-search',
        'core/paragraph',
    );

    // Add epfl/scienceqa block for WP instance https://www.epfl.ch only
    if (get_option('blogname') == 'EPFL') {
        array_push($blocks, 'epfl/scienceqa');
    }

  	return $blocks;
    // return True; // if you want all natifs blocks.
}

add_filter( 'allowed_block_types', 'my_plugin_allowed_block_types', 10, 2 );

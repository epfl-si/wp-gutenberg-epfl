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

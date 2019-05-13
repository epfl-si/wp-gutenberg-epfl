<?php
/**
 * Plugin Name: wp-gutenberg-epfl — CGB Gutenberg Block Plugin
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: wp-gutenberg-epfl — is a Gutenberg plugin created via create-guten-block.
 * Author: mrahmadawais, maedahbatool
 * Author URI: https://AhmadAwais.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'frontend/init.php';

function epfl_gutenberg_load_textdomain() {
	load_plugin_textdomain( 'epfl', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'epfl_gutenberg_load_textdomain' );


function editor_assets() {
  
	// Déclaration du JS de l'éditeur
	wp_register_script(
		'epfl-editor-js',
		plugins_url('assets/editor.build.js'),
		[ 'wp-editor', 'wp-blocks', 'wp-element', 'wp-i18n' ]
	);
  
	// Premier paramètre : le nom du script (handle)
	// Second paramètre : le textdomain
	if ( function_exists('wp_set_script_translations') ) {
		wp_set_script_translations( 'epfl-editor-js', 'epfl' );
	}	
  }
add_action( 'enqueue_block_editor_assets' , 'editor_assets' );

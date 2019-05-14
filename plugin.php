<?php
/**
 * Plugin Name: wp-gutenberg-epfl
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


// load .mo file for translation
function epfl_gutenberg_load_textdomain() {	

	//load_plugin_textdomain( 'epflgutenberg', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
	load_plugin_textdomain( 'wp-gutenberg-epfl', FALSE, basename( dirname( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'epfl_gutenberg_load_textdomain' );

function editor_assets() {

	// $path = plugins_url('dist/blocks.build.js', __FILE__);
	$path = plugins_url('src/epfl-memento/index.js', __FILE__);

	var_dump($path);
	error_log($path);

	// Déclaration du JS de l'éditeur
	wp_register_script(
		'wp-gutenberg-epfl-editor',
		$path,
		array( 'wp-editor', 'wp-blocks', 'wp-element', 'wp-i18n' )
	);
  
	// Premier paramètre : le nom du script (handle)
	// Second paramètre : le textdomain
	if ( function_exists('wp_set_script_translations') ) {

		wp_set_script_translations( 'wp-gutenberg-epfl-editor', 'wp-gutenberg-epfl' );
	}	
  }

add_action( 'enqueue_block_editor_assets' , 'editor_assets' );

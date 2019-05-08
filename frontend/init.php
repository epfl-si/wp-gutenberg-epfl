<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since 	1.0.0
 * @package CGB
 */

require_once 'epfl-news/controller.php';
require_once 'epfl-memento/controller.php';

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function capitainewp_bases_block_assets() {

	// Styles.
	wp_enqueue_style(
		'capitainewp-bases-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor' )
	);
}
add_action( 'enqueue_block_assets', 'capitainewp_bases_block_assets' );


function capitainewp_bases_editor_assets() {

	// Scripts.
	wp_enqueue_script(
		'capitainewp-bases-block',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-editor', 'wp-blocks', 'wp-i18n', 'wp-element' )
	);

	// Envoyer les traductions au JS
	// Premier paramètre : le nom du script (handle)
  // Second paramètre : le textdomain
  if ( function_exists('wp_set_script_translations') ) {
  	wp_set_script_translations( 'capitainewp-bases-block', 'capitainewp-gutenberg-blocks' );
  }	

	// Styles.
	wp_enqueue_style(
		'capitainewp-bases-block-editor',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' )
	);
}
add_action( 'enqueue_block_editor_assets', 'capitainewp_bases_editor_assets' );

// Déclarer les blocs qui ont un rendu côté PHP
function wp_gutenberg_epfl_register_blocks() {

	// Vérifier que Gutenberg est actif
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	
	register_block_type( 'greglebarbar/news', array(
		'render_callback' => 'epfl_news_block',
	));

	register_block_type( 'greglebarbar/memento', array(
		'render_callback' => 'epfl_memento_block',
	));
	
}
add_action( 'init', 'wp_gutenberg_epfl_register_blocks' );

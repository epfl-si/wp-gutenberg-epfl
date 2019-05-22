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
require_once 'epfl-cover/view.php';
require_once 'epfl-toggle/view.php';
require_once 'epfl-quote/view.php';

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function wp_gutenberg_epfl_bases_block_assets() {

	// Styles.
	wp_enqueue_style(
		'wp-gutenberg-epfl-bases-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor' )
	);
}
add_action( 'enqueue_block_assets', 'wp_gutenberg_epfl_bases_block_assets' );


function wp_gutenberg_epfl_editor_assets() {

	// Scripts.
	wp_enqueue_script(
		'wp-gutenberg-epfl-block',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-editor', 'wp-blocks', 'wp-i18n', 'wp-element' )
	);

	// Envoyer les traductions au JS
	// Premier paramètre : le nom du script (handle)
	// Second paramètre : le textdomain
	if ( function_exists('wp_set_script_translations') ) {
		wp_set_script_translations( 'wp-gutenberg-epfl-block', 'wp-gutenberg-epfl' );
	}

	// Styles.
	wp_enqueue_style(
		'wp-gutenberg-epfl-block-editor',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' )
    );
  
}
add_action( 'enqueue_block_editor_assets', 'wp_gutenberg_epfl_editor_assets' );

// Déclarer les blocs qui ont un rendu côté PHP
function wp_gutenberg_epfl_register_blocks() {

	// Vérifier que Gutenberg est actif
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	
	register_block_type( 'epfl/news', array(
		'render_callback' => 'epfl_news_block',
	));

	register_block_type( 'epfl/memento', array(
		'render_callback' => 'epfl_memento_block',
	));

	register_block_type( 'epfl/cover', array(
		'render_callback' => 'epfl_cover_block',
    ));
    
    register_block_type( 'epfl/toggle', array(
		'render_callback' => 'epfl_toggle_block',
    ));

    register_block_type( 'epfl/quote', array(
		'render_callback' => 'epfl_quote_block',
    ));
	
}
add_action( 'init', 'wp_gutenberg_epfl_register_blocks' );

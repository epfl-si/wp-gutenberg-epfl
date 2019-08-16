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
    // see ./src/blocks.js for the right list
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
        'epfl/page-teaser',
        'epfl/custom-highlight',
        'epfl/page-highlight',
        'epfl/post-teaser',
        'epfl/post-highlight',
        'epfl/infoscience-search',
        'epfl/social-feed',
        'epfl/contact',
        'epfl/caption-cards',
        'epfl/card',
        'epfl/definition-list',
        'core/paragraph',
        'core/heading',
    );

    // Add epfl/scienceqa block for WP instance https://www.epfl.ch only
    if (get_option('blogname') == 'EPFL') {
        array_push($blocks, 'epfl/scienceqa');
    }

  	return $blocks;
    // return True; // if you want all natifs blocks.
}

add_filter( 'allowed_block_types', 'my_plugin_allowed_block_types', 10, 2 );

# allow to fetch rest api with the lang parameter
function polylang_json_api_init(){
    global $polylang;
    $default = pll_default_language();
    $langs = pll_languages_list();
    $cur_lang = $_GET['lang'];
    if (!in_array($cur_lang, $langs)) {
        $cur_lang = $default;
    }
    $polylang->curlang = $polylang->model->get_language($cur_lang);
    $GLOBALS['text_direction'] = $polylang->curlang->is_rtl ? 'rtl' : 'ltr';
}

function polylang_json_api_languages(){
    return pll_languages_list();
}

// fix polylang language segmentation
add_action( 'rest_api_init' ,  'polylang_json_api_init' );
add_action( 'rest_api_init' ,  'polylangroute' );

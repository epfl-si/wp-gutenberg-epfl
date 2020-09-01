<?php
/**
 * Plugin Name: wp-gutenberg-epfl
 * Description: EPFL Gutenberg Blocks
 * Author: WordPress EPFL Team
 * Version: 1.25.3
 */

namespace EPFL\Plugins\Gutenberg;

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
	load_plugin_textdomain( 'epfl', FALSE, basename( dirname( __FILE__ ) ) . '/languages/' );
}
add_action( 'plugins_loaded',  __NAMESPACE__ . '\epfl_gutenberg_load_textdomain' );

# allow to fetch rest api with the lang parameter
function polylang_json_api_init() {
    global $polylang;

    $default = pll_default_language();
    $langs = pll_languages_list();

    if (isset($_GET['lang'])) {
        $cur_lang = $_GET['lang'];
        if (!in_array($cur_lang, $langs)) {
            $cur_lang = $default;
        }
        $polylang->curlang = $polylang->model->get_language($cur_lang);
        $GLOBALS['text_direction'] = $polylang->curlang->is_rtl ? 'rtl' : 'ltr';
    }
}

function polylang_json_api_languages() {
    return pll_languages_list();
}

// fix polylang language segmentation
add_action( 'rest_api_init' , __NAMESPACE__ . '\polylang_json_api_init' );

/**
 * Only allow blocks starting with "epfl/" in editor. If others blocks have to be allowed too, comoing from WordPress
 * or others plugins, you'll have to add another filter to add them, for example in a MU-Plugin. But be careful to
 * register the filter (add_filter) with a lower priority (ex: 99) to ensure it will be executed after this function.
 * And also use the content of $allowed_block_types to know which blocks are already allowed and add the new ones.
 *
 * @param Array|Boolean $allowed_block_types Array (or bool=True if all block allowed) with blocks already allowed.
 * @param Object $post Post resource data
 */
function allow_epfl_blocks( $allowed_block_types, $post ) {

    // Reset value
    $allowed_block_types = [];
    // We explicitely deny usage of epfl/card-panel block so we can't add more than 3 blocks inside an epfl/card-deck
    $explicitly_denied_blocks = ['epfl/card-panel',
                                 'epfl/mini-card-panel'];

    // Blocks allowed in Posts
    $posts_blocks_white_list = ['epfl/button',
                                'epfl/links-group',
                                'epfl/map',
                                'epfl/gallery',
                                'epfl/toggle',
                                'epfl/quote',
                                'epfl/video',
                                'epfl/pdf-flipbook'];

    // Retrieving currently registered blocks
    $registered = \WP_Block_Type_Registry::get_instance()->get_all_registered();

    // Looping through registered blocks to find "epfl/" ones
    foreach(array_keys($registered) as $block_name)
    {
        if(preg_match('/^epfl\//', $block_name)===1 && !in_array($block_name, $explicitly_denied_blocks))
        {
            if($post->post_type == 'post')
            {
                $block_ok = in_array($block_name, $posts_blocks_white_list);
            }
            else
            {
                $block_ok = true;
            }

            if($block_ok)
            {
                $allowed_block_types[] = $block_name;
            }
        }
    }

  	return $allowed_block_types;
}

add_filter( 'allowed_block_types', __NAMESPACE__.'\allow_epfl_blocks', 10, 2 );


/**
 * Shortcodes
 */
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl-labs-search/epfl-labs-search.php';
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl-magistrale/epfl-magistrale.php';
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl-polylex-search/epfl-polylex-search.php';
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl-servicenow-search/epfl-servicenow-search.php';
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl-study-plan/epfl-study-plan.php';
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl-study-plan/epfl-study-plan.php';
require_once plugin_dir_path( __FILE__ ).'shortcodes/epfl-fields-of-research-list/controller.php';

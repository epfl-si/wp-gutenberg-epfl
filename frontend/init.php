<?php
/**
 * Block renders Initializer
 *
 */

namespace EPFL\Plugins\Gutenberg;

require_once 'epfl-news/controller.php';
require_once 'epfl-memento/controller.php';
require_once 'epfl-cover/view.php';
require_once 'epfl-toggle/view.php';
require_once 'epfl-quote/view.php';
require_once 'epfl-people/controller.php';
require_once 'epfl-courses/controller.php';
require_once 'epfl-map/view.php';
require_once 'epfl-introduction/view.php';
require_once 'epfl-hero/view.php';
require_once 'epfl-google-forms/controller.php';
require_once 'epfl-video/controller.php';
require_once 'epfl-tableau/controller.php';
require_once 'epfl-scheduler/controller.php';
require_once 'epfl-page-teaser/controller.php';
require_once 'epfl-custom-highlight/controller.php';
require_once 'epfl-custom-teaser/controller.php';
require_once 'epfl-page-highlight/controller.php';
require_once 'epfl-post-teaser/controller.php';
require_once 'epfl-post-highlight/controller.php';
require_once 'epfl-infoscience-search/controller.php';
require_once 'epfl-social-feed/controller.php';
require_once 'epfl-social-follow/controller.php';
require_once 'epfl-social-share/controller.php';
require_once 'epfl-contact/controller.php';
require_once 'epfl-caption-cards/controller.php';
require_once 'epfl-card-deck/controller.php';
require_once 'epfl-mini-card-deck/controller.php';
require_once 'epfl-definition-list/controller.php';
require_once 'epfl-links-group/controller.php';
require_once 'lib/tags.php';
require_once 'epfl-table-filter/controller.php';
require_once 'epfl-table/controller.php';
require_once 'epfl-faq/controller.php';
require_once 'epfl-button/controller.php';
require_once 'epfl-gallery/controller.php';
require_once 'epfl-student-projects/controller.php';
require_once 'epfl-carousel/controller.php';
require_once 'epfl-pdf-flipbook/view.php';
require_once 'epfl-alert/controller.php';

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Déclarer les blocs qui ont un rendu côté PHP
function wp_gutenberg_epfl_register_blocks() {

	// Vérifier que Gutenberg est actif
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type( 'epfl/news', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\News\epfl_news_block',
	));

	register_block_type( 'epfl/memento', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Memento\epfl_memento_block',
	));

	register_block_type( 'epfl/cover', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Cover\epfl_cover_block',
    ));

    register_block_type( 'epfl/toggle', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Toggle\epfl_toggle_block',
    ));

    register_block_type( 'epfl/quote', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Quote\epfl_quote_block',
    ));

    register_block_type( 'epfl/people', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\People\epfl_people_block',
	));

	register_block_type( 'epfl/courses', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Courses\epfl_courses_block',
    ));

    register_block_type( 'epfl/map', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Map\epfl_map_block',
    ));

    register_block_type( 'epfl/introduction', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Introduction\epfl_introduction_block',
    ));

    register_block_type( 'epfl/hero', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Hero\epfl_hero_block',
    ));

    register_block_type( 'epfl/google-forms', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\GoogleForms\epfl_google_forms_block',
    ));

    register_block_type( 'epfl/video', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Video\epfl_video_block',
    ));

    register_block_type( 'epfl/tableau', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Tableau\epfl_tableau_block',
    ));

    register_block_type( 'epfl/scheduler', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Scheduler\epfl_scheduler_block',
	));

	register_block_type( 'epfl/custom-highlight', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\CustomHighlight\epfl_custom_highlight_block',
		));

	register_block_type( 'epfl/custom-teaser', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\CustomTeaser\epfl_custom_teaser_block',
		));

    register_block_type( 'epfl/page-teaser', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\PageTeaser\epfl_page_teaser_block',
    ));

    register_block_type( 'epfl/page-highlight', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\PageHighlight\epfl_page_highlight_block',
    ));

    register_block_type( 'epfl/post-teaser', array(
		  'render_callback' => 'EPFL\Plugins\Gutenberg\PostTeaser\epfl_post_teaser_block',
    ));

    register_block_type( 'epfl/post-highlight', array(
		  'render_callback' => 'EPFL\Plugins\Gutenberg\PostHighlight\epfl_post_highlight_block',
    ));

	register_block_type( 'epfl/infoscience-search', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\InfoscienceSearch\epfl_infoscience_search_block',
		));

    register_block_type( 'epfl/social-feed', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\SocialFeed\epfl_social_feed_block',
		));

    register_block_type( 'epfl/social-follow', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\SocialFollow\epfl_social_follow_block',
		));

    register_block_type( 'epfl/social-share', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\SocialShare\epfl_social_share_block',
		));

    register_block_type( 'epfl/contact', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\Contact\epfl_contact_block',
		));

	register_block_type( 'epfl/caption-cards', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\CaptionCards\epfl_caption_cards_block',
		));

    register_block_type( 'epfl/card-deck', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\CardDeck\epfl_card_deck_block',
		));

	register_block_type( 'epfl/card-panel', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\CardDeck\epfl_card_panel_block',
		));
	register_block_type( 'epfl/definition-list', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\DefinitionList\epfl_definition_list_block',
		));

	register_block_type( 'epfl/links-group', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\LinksGroup\epfl_links_group_block',
		));

	register_block_type( 'epfl/table-filter', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\TableFilter\epfl_table_filter_block',
		));
	register_block_type( 'epfl/faq', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\FAQ\epfl_faq_block',
		));
	register_block_type( 'epfl/faq-item', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\FAQ\epfl_faq_item_block',
		));
	register_block_type( 'epfl/button', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\Button\epfl_button_block',
		));
	register_block_type( 'epfl/table', array(
			'render_callback' => 'EPFL\Plugins\Gutenberg\Table\epfl_table_block',
		));
	register_block_type( 'epfl/gallery', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Gallery\epfl_gallery_block',
		));

	register_block_type( 'epfl/mini-card-deck', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\MiniCardDeck\epfl_mini_card_deck_block',
		));

	register_block_type( 'epfl/mini-card-panel', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\MiniCardDeck\epfl_mini_card_panel_block',
		));
	register_block_type( 'epfl/student-projects', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\StudentProjects\epfl_student_projects_block',
		));

	register_block_type( 'epfl/carousel', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Carousel\epfl_carousel_block',
		));

	register_block_type( 'epfl/pdf-flipbook', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\PDFFlipbook\epfl_pdf_flipbook_block',
		));

	register_block_type( 'epfl/alert', array(
		'render_callback' => 'EPFL\Plugins\Gutenberg\Alert\epfl_alert_block',
		));
}

add_action( 'init', __NAMESPACE__ . '\wp_gutenberg_epfl_register_blocks' );

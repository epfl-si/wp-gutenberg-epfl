<?php

// Styleguide: https://epfl-si.github.io/elements/#/molecules/card-deck >> Mini cards

namespace EPFL\Plugins\Gutenberg\MiniCardDeck;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');


/**
 * Render a Mini Card panel block
 */
function epfl_mini_card_panel_block($attributes)
{
	$link = $attributes['link'] ?? '';
	if(empty(trim($link))) return '';

    return Utils::render_php(
			dirname(plugin_dir_path(__FILE__)) . '/lib/templates/card.php',
			[
					"title" => $attributes['legend'] ?? '',
					"image_id" => $attributes['imageId'] ?? null,
					"image_url" => $attributes['imageUrl'] ?? null,
					"image_format" => "thumbnail_16_9_large_40p",
					"link" => $link,
					"link_in_new_tab" =>  $attributes['openLinkNewTab'] ?? '',
			]
	);
}

/**
 * Render a Mini Card Deck Block
 */
function epfl_mini_card_deck_block($attributes, $inner_content) {

  $title        = Utils::get_sanitized_attribute( $attributes, 'title' );
  $gray_wrapper = Utils::get_sanitized_attribute( $attributes, 'grayWrapper', false);

  ob_start();
?>

<div class="container py-3 px-4<?php echo ($gray_wrapper) ? ' bg-gray-100' : '' ?>">
  <div class="card-deck mini-cards">
    <h2 class="deck-title text-center"><?php echo $title; ?></h2>
    <?php
    echo $inner_content;
    ?>
  </div>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

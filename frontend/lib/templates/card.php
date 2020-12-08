<?php
namespace EPFL\Plugins\Gutenberg\Lib\Templates;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

$title = Utils::get_sanitized_attribute( $params, 'title', '');
$link = Utils::get_sanitized_url( $params, 'link', '#' );
$link_in_new_tab = $params['link_in_new_tab'] ?? false;
?>

<a href="<?= $link ?>" class="card link-trapeze-horizontal" <?= $link_in_new_tab ? ' target="_blank"' : '' ?>>
	<?= Utils::render_php(dirname(__FILE__) . '/picture.php', $params) ?>
	<div class="card-body">
		<h3 class="card-title"><?= $title ?></h3>
	</div>
</a>

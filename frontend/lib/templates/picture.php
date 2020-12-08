<?php
namespace EPFL\Plugins\Gutenberg\Lib\Templates;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

$image_id = Utils::get_sanitized_attribute( $params, 'image_id' );
$image_data = empty($image_id) ? null : get_post($image_id);

// see functions.php
// Commons for cards are:
//   thumbnail_16_9_large_40p
//   thumbnail_16_9_large
//   thumbnail_16_9_crop
$image_format = $params['image_format'] ?? 'thumbnail_16_9_large_40p';
$image_attributes = ['class' => 'img-fluid'];
if (isset($image_data->post_excerpt) && !empty($image_data->post_excerpt)) {
	$image_attributes['title'] = $image_data->post_excerpt;
}
?>

<?php if ($image_id): ?>
<picture class="card-img-top">
	<?= wp_get_attachment_image(
			$image_id,
			$image_format,
			false,  // not an icon
			$image_attributes
	) ?>
</picture>
<?php endif ?>

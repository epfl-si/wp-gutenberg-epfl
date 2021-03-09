<?php
namespace EPFL\Plugins\Gutenberg\News;

/**
 * Get url channel
 *
 * $data: all data from back-end
 */
function epfl_news_get_url_channel($data, $lang) {
    $url_channel = "";
    if (is_countable($data) && count($data) > 0) {
        $url_channel .= BASE_NEWS_URL . "/search/";
        if ($lang == 'fr') {
            $url_channel .= "fr/";
        } else if ($lang == 'de') {
            $url_channel .= "de/";
        } else {
            $url_channel .= "en/";
        }
        $url_channel .= $data[0]->channel->name;
    }
    return $url_channel;
}

/**
 * Get image description
 *
 * $news: news to display
 */
function epfl_news_get_image_description($news) {
    $image_description = (property_exists($news, 'visual_description'))? $news->visual_description: "";
    return $image_description;
}

/**
 * Get label category
 *
 * $news: news to display
 */
function epfl_news_get_label_category($news, $lang) {
    if ($lang == 'fr') {
        $label_category = $news->category->fr_label;
    } else if ($lang == 'de') {
        $label_category = $news->category->de_label;
    } else {
        $label_category = $news->category->en_label;
    }
    return $label_category;
}

/**
 * Get publish date
 *
 * $news: news to display
 */
function epfl_news_get_publish_date($news) {
    $publish_date = new \DateTime($news->publish_date);
    $publish_date = $publish_date->format('d.m.y');
    return $publish_date;
}

/**
 * Get subtitle
 *
 * $news: news to display
 */
function epfl_news_get_subtitle($news) {
    return strip_tags($news->subtitle);
}

/**
 * Get visual url
 *
 * $news: news to display
 */
function epfl_news_get_visual_url($news) {
  if ($news->visual_url) {
      $visual_url = substr($news->visual_url, 0, -11) . '1296x728.jpg';
  } else {
      $visual_url = 'https://actu.epfl.ch/static/img/placeholder.png';
  }
  return $visual_url;
}

/**
 * Get attachment url by slug
 */
function get_attachment_url_by_slug( $slug ) {

    $args = array(
      'post_type'      => 'attachment',
      'name'           => sanitize_title($slug),
      'posts_per_page' => 1,
      'post_status'    => 'inherit',
    );

    $_header = get_posts( $args );
    $header  = $_header ? array_pop($_header) : null;

    return $header ? wp_get_attachment_url($header->ID) : '';
  }

?>

<?php
/**
 * Plugin Name: EPFL News shortcode
 * Description: provides a shortcode to display news feed
 * @version: 1.1
 * @copyright: Copyright (c) 2017 Ecole Polytechnique Federale de Lausanne, Switzerland
 */

define("NEWS_API_URL", "https://actu.epfl.ch/api/v1/channels/");
define("NEWS_API_URL_IFRAME", "https://actu.epfl.ch/webservice_iframe/");
require_once(dirname(__FILE__).'/../utils.php');
require_once(dirname(__FILE__).'/view.php');

/**
 * Returns the number of news according to the template
 * @param $template: id of template
 * @return the number of news to display
 */
function epfl_news_get_limit($template)
{
    switch ($template){
        case "listing":
            $limit = 10;
            break;
        case "highlighted_with_3_news":
        case "card_with_3_news":
            $limit = 3;
            break;
        case "highlighted_with_1_news":
        case "card_with_1_news":
            $limit = 1;
            break;
        case "card_with_2_news":
            $limit = 2;
            break;
        default:
            $limit = 4;
    }
    return $limit;
}

/**
 * Build api URL of news
 *
 * @param $channel: id of news channel
 * @param $template: id of template
 * @param $lang: lang of news
 * @param $category: id of news category
 * @param $themes: The list of news themes id. For example: 1,2,5
 * @return the api URL of news
 */
function epfl_news_build_api_url($channel, $template, $nb_news, $lang, $category, $themes, $projects)
{
    // returns the number of news according to the template
    $limit = epfl_news_get_limit($template);
    if ("1" == $template) {
        $limit = $nb_news;
    }

    // define API URL
    $url = NEWS_API_URL . $channel . '/news/?format=json&lang=' . $lang . '&limit=' . $limit;

    // filter by category
    if ($category !== '') {
        $url .= '&category=' . $category;
    }

    // filter by themes
    if ($themes !== '' && $themes != '[]') {
        $themes = explode(',', $themes);
        foreach ($themes as $theme) {
            $url .= '&themes=' . $theme;
        }
    }

    // filter by projects
    if ($projects != '') {
        $projects = explode(',', $projects);
        foreach ($projects as $project) {
            $url .= '&projects=' . $project;
        }
    }
    return $url;
}

/**
 * Check the required parameters
 *
 * @param $channel: id of channel
 * @param $lang: lang of news (fr or en)
 * @return True if the required parameters are right.
 */
function epfl_news_check_required_parameters($channel, $lang) {

    // check lang
    if ($lang !==  "fr" && $lang !== "en" ) {
        return FALSE;
    }

    // check channel
    if ($channel === "") {
        return FALSE;
    }

    return TRUE;
}

function epfl_news_block( $attributes ) {

  $channel       = sanitize_text_field( $attributes['channel'] ) ?: '1';
  $lang          = sanitize_text_field( $attributes['lang'] ) ?: 'fr';
  $template      = sanitize_text_field( $attributes['template'] ) ?: 'listing';
  $all_news_link = sanitize_text_field( $attributes['displayLinkAllNews'] ) ?: FALSE;
  $nb_news       = sanitize_text_field( $attributes['nbNews'] ) ?: 10;
  $category      = sanitize_text_field( $attributes['category'] );
  $themes        = sanitize_text_field( $attributes['themes'] );
  $projects      = sanitize_text_field( $attributes['projects'] );

  /*
  var_dump("Channel: " . $channel);
  var_dump("Lang: " . $lang);
  var_dump("Template: " . $template);
  var_dump("All news link: " . $all_news_link);
  var_dump("Nb news: " . $nb_news);
  var_dump("Category: " . $category);
  var_dump("Themes: " . $themes);
  var_dump("Projects: " . $projects);
  */

  if (epfl_news_check_required_parameters($channel, $lang) == FALSE) {
      return Utils::render_user_msg("News shortcode: Please check required parameters");
  }

  $url = epfl_news_build_api_url(
      $channel,
      $template,
      $nb_news,
      $lang,
      $category,
      $themes,
      $projects
  );

  $actus = Utils::get_items($url);
  if (property_exists($actus, 'detail') && $actus->detail === "Not found.") {
      return Utils::render_user_msg("News shortcode: Please check required parameters");
  }

  $markup = epfl_news_render($actus->results, $template, $all_news_link);
  return $markup;
}
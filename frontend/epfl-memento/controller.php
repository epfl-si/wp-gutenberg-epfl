<?php

/**
 * Plugin Name: EPFL Memento shortcode
 * Description: provides a shortcode to display events feed
 * @version: 1.4
 * @copyright: Copyright (c) 2017 Ecole Polytechnique Federale de Lausanne, Switzerland
 *
 * Text Domain: epfl-memento
 * Domain Path: /languages
 */

namespace EPFL\Plugins\Gutenberg\Memento;

use \EPFL\Plugins\Gutenberg\Lib\Utils;

define(__NAMESPACE__ . "\MEMENTO_API_URL", "https://memento.epfl.ch/api/v1/mementos/");
define(__NAMESPACE__ . "\MEMENTO_API_URL_IFRAME", "https://memento.epfl.ch/webservice/?frame=1");
define('REGISTRATION_SOLD_OUT_ID', '4');

require_once(dirname(__FILE__).'/../lib/utils.php');
require_once(dirname(__FILE__).'/view.php');

/**
 * Call memento REST api to get the memento slug
 * 
 * @param $memento_id: ID of memento
 * @return the slug of memento
 */
function get_memento_slug($memento_id) {

  $url = MEMENTO_API_URL . $memento_id . '/?format=json';
  $memento = Utils::get_items($url, 300, 20);

  return $memento->slug;
}

/**
 * Build api URL of events
 *
 * @param $memento: slug of memento
 * @param $template: id of the template
 * @param $lang: lang of the event (fr or en)
 * @param $categories: id of the event categories
 * @param $keyword: keyword to filter events
 * @param $period: period to filter past event or upcoming events
 * @return the API URL of the memento
 */
function epfl_memento_build_api_url($memento_id, $lang, $template, $nb_events, $categories, $keyword, $period, $year)
{    
    // return events in FR if events exist in this language.
    // otherwise return events in EN (if events exist in this language).
    if ('fr' === $lang) {
        $lang = 'fr,en';
    } else {
        $lang = 'en,fr';
    }

    // define API URL
    $url = MEMENTO_API_URL . $memento_id . '/events/?format=json&lang=' . $lang . '&limit=' . $nb_events;

    // filter by categories
    $categories = json_decode($categories, true);
    if(is_array($categories))
    {
        foreach ($categories as $category) {
            $url .= '&category=' . $category['value'];
        }
    }

    // keyword
    if ($keyword !== '') {
        $url .= '&keywords=' . $keyword;
    }

    // period
    if ($period === 'past' or $period === 'upcoming') {
        $url .= '&period=' . $period;
    }

    if ($period === 'past' and $year !== '') {
        $url .= '&start_year=' . $year;
    }

    return $url;
}

/**
 * Check the required parameters
 *
 * @param $memento: slug of memento
 * @param $lang: lang of event
 */
function epfl_memento_check_required_parameters($memento, $lang)
{

    // check lang
    if ($lang !==  "fr" && $lang !== "en" ) {
        return FALSE;
    }

    // check memento
    if ($memento === "") {
        return FALSE;
    }

    return TRUE;
}

/**
 * Main function of shortcode
 */
function epfl_memento_block( $attributes ) {

    // sanitize parameters
    $memento_id = Utils::get_sanitized_attribute( $attributes, 'memento', 1 );
    $lang       = Utils::get_sanitized_attribute( $attributes, 'lang', 'en' );
    $template   = Utils::get_sanitized_attribute( $attributes, 'template', 'slider_with_the_first_highlighted_event' );
    $nb_events  = Utils::get_sanitized_attribute( $attributes, 'nbEvents', 10 );
    $categories = Utils::get_sanitized_attribute( $attributes, 'categories', 0 );
    $keyword    = Utils::get_sanitized_attribute( $attributes, 'keyword' );
    $period     = Utils::get_sanitized_attribute( $attributes, 'period', 'upcoming');
    $year       = Utils::get_sanitized_attribute( $attributes, 'year' );

    /*
    var_dump("Memento Id: " . $memento_id);
    var_dump("Lang: " . $lang);
    var_dump("Template: " . $template);
    var_dump("nb_events: " . $nb_events);
    var_dump("categories: " . $categories);
    var_dump("keyword: " . $keyword);
    var_dump("period: " . $period);
    var_dump("year: " . $year);
    */

    if (epfl_memento_check_required_parameters($memento_id, $lang) == FALSE) {
        return Utils::render_user_msg("Memento shortcode: Please check required parameters");
    }

    $url = epfl_memento_build_api_url(
        $memento_id,
        $lang,
        $template,
        $nb_events,
        $categories,
        $keyword,
        $period,
        $year
    );

    $events = Utils::get_items($url, 300, 20);
    $memento_slug = get_memento_slug($memento_id);
    $markup = epfl_memento_render($events->results, $template, $memento_slug, $period);
  
    return $markup;
}

?>
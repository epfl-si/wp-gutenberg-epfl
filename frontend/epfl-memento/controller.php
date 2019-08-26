<?php

/**
 * Plugin Name: EPFL Memento shortcode
 * Description: provides a shortcode to display events feed
 * @version: 1.0
 * @copyright: Copyright (c) 2017 Ecole Polytechnique Federale de Lausanne, Switzerland
 *
 * Text Domain: epfl-memento
 * Domain Path: /languages
 */

namespace EPFL\Plugins\Gutenberg\Memento;

use \EPFL\Plugins\Gutenberg\Lib\Utils;

define(__NAMESPACE__ . "\MEMENTO_API_URL", "https://memento.epfl.ch/api/v1/mementos/");
define(__NAMESPACE__ . "\MEMENTO_API_URL_IFRAME", "https://memento.epfl.ch/webservice/?frame=1");
require_once(dirname(__FILE__).'/../lib/utils.php');
require_once(dirname(__FILE__).'/view.php');

/**
 * Build api URL of events
 *
 * @param $memento: slug of memento
 * @param $template: id of the template
 * @param $lang: lang of the event (fr or en)
 * @param $category: id of the event category
 * @param $keyword: keyword to filter events
 * @param $period: period to filter past event or upcoming events
 * @return the API URL of the memento
 */
function epfl_memento_build_api_url($memento, $lang, $template, $nb_events, $category, $keyword, $period)
{
    // call REST API to get the number of mementos
    $memento_response = Utils::get_items(MEMENTO_API_URL);

    // build URL with all mementos
    $url = MEMENTO_API_URL . '?limit=' . $memento_response->count;
    $mementos = Utils::get_items($url);

    // FIXME: we must improve REST API MEMENTO to be able to filter by memento_slug
    $memento_id = $memento;
    /*
    if(property_exists($mementos, 'results'))
    {
        foreach($mementos->results as $current_memento) {
            if ($current_memento->slug === $memento) {
                $memento_id = $current_memento->id;
                break;
            }
        }
    }*/

    // return events in FR if events exist in this language.
    // otherwise return events in EN (if events exist in this language).
    if ('fr' === $lang) {
        $lang = 'fr,en';
    } else {
        $lang = 'en,fr';
    }

    // define API URL
    $url = MEMENTO_API_URL . $memento_id . '/events/?format=json&lang=' . $lang . '&limit=' . $nb_events;

    // filter by category
    if ($category !== '') {
        $url .= '&category=' . $category;
    }

    // keyword
    if ($keyword !== '') {
        $url .= '&keywords=' . $keyword;
    }

    // period
    if ($period === 'past' or $period === 'upcoming') {
        $url .= '&period=' . $period;
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
    $memento   = isset($attributes['memento']) ? sanitize_text_field($attributes['memento']) : '1';
    $lang      = isset($attributes['lang']) ? sanitize_text_field($attributes['lang']) : 'en';
    $template  = isset($attributes['template']) ? sanitize_text_field($attributes['template']) : 'slider_with_the_first_highlighted_event';
    $nb_events = isset($attributes['nbEvents']) ? sanitize_text_field($attributes['nbEvents']) : 10;
    $category  = isset($attributes['category']) ? sanitize_text_field($attributes['category']) : '';
    $keyword   = isset($attributes['keyword']) ? sanitize_text_field($attributes['keyword']) : '';
    $period    = isset($attributes['period']) ? sanitize_text_field($attributes['period']) : '';

    /*
    var_dump("Memento: " . $memento);
    var_dump("Lang: " . $lang);
    var_dump("Template: " . $template);
    */

    if (epfl_memento_check_required_parameters($memento, $lang) == FALSE) {
        return Utils::render_user_msg("Memento shortcode: Please check required parameters");
    }

    $url = epfl_memento_build_api_url(
        $memento,
        $lang,
        $template,
        $nb_events,
        $category,
        $keyword,
        $period
    );
    $events = Utils::get_items($url);

    // $memento => memento_name
    $markup = epfl_memento_render($events->results, $template, $memento);
    return $markup;
}

?>
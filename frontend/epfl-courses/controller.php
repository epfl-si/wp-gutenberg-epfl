<?php

/**
 * There's no specific design for this block in the Styleguide so we use "Links-Group" design
 * https://epfl-si.github.io/elements/#/molecules/links-group
 */

namespace EPFL\Plugins\Gutenberg\Courses;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');


function epfl_courses_block( $attributes ) {

    // To avoid to execute all code below (useless) when we just click on "Update" to save page while editing it
    if(is_admin()) return "";


    $title            = Utils::get_sanitized_attribute( $attributes, 'title' );
    $unit             = Utils::get_sanitized_attribute( $attributes, 'unit' );
    $scipers          = Utils::get_sanitized_attribute( $attributes, 'scipers' );
    $section          = Utils::get_sanitized_attribute( $attributes, 'section' );
    $course_code      = Utils::get_sanitized_attribute( $attributes, 'courseCode' );
    $teaching_lang    = Utils::get_sanitized_attribute( $attributes, 'teachingLang');
    $semester         = Utils::get_sanitized_attribute( $attributes, 'semester');
    $orientation      = Utils::get_sanitized_attribute( $attributes, 'orientation');
    
    // var_dump($title);
    // var_dump($unit);
    // var_dump($scipers);
    // var_dump($section);
    // var_dump($course_code);
    // var_dump($teaching_lang);
    // var_dump($semester);
    // var_dump($orientation);
    
    $parameters = [];

    if($unit != "")
    {
        $parameters['unit'] = $unit;
    }
    else if($scipers != "")
    {
        $scipers = preg_replace('/\s+/','',$scipers);
        $parameters['scipers'] = $scipers;
    }
    else if($section != "")
    {
        $parameters['section'] = $section;
    }

    /* Filters */
    if($teaching_lang != ""){ $parameters['langueens'] = $teaching_lang; }
    if($semester != "")     { $parameters['sem'] = $semester; }
    if($course_code != "")  { $parameters['code'] = urlencode($course_code); }
    if($orientation != "")  { $parameters['orient'] = urlencode($orientation); }
    

    /* Presentation */
    if (function_exists('pll_current_language')) {
        $current_language = pll_current_language();
        if ($current_language != false) {
            $parameters['lang'] = $current_language;
        }
    }
    
    $parameters['format'] = 'json';


    // the web service we use to retrieve the data
    $url = "https://people.epfl.ch/cgi-bin/getCours";
    $url = add_query_arg($parameters, $url);

    // retrieve the data in JSON
    $items = Utils::get_items($url, 300, 15);


    if (false === $items) {
        return Utils::render_user_msg("Course Block: Error retrieving items");
    }

    // If webservice returns an error
    if(property_exists($items, 'Error'))
    {
        return Utils::render_user_msg("Course Block: Webservice error: ".$items->Error->text);
    }


    if(sizeof($items) == 0)
    {
        return '<i>No course found for given parameters</i>';
    }
    else
    {

        $html = '<div class="container mb-4">'.
                    '<div class="links-group">'.
                        '<h5 id="links-group-title">'.$title.'</h5>'.
                        '<nav class="nav flex-column flex-wrap align-items-start" role="navigation" aria-labelledby="links-group-title">';

        foreach($items as $item)
        {
            $desc = (property_exists($item, 'X_OBJECTIFS') && $item->X_OBJECTIFS != "") ? '<small style="margin:-12px 0px 12px 0px">'.utf8_decode($item->X_OBJECTIFS).'</small>' : '';
            // lang can not exist... in case, for example, if it's a course to learn German (why does someone want to learn German by the way?!? lost a bet?? )
            $lang = (property_exists($item, 'C_LANGUEENS') && $item->C_LANGUEENS != "") ? '<small>('.$item->C_LANGUEENS.')</small>' : '';

            $html .= '<a class="nav-link nav-pretty" href="'.$item->X_URL.'">'.utf8_decode($item->X_MATIERE).' '.$lang.'</a>'.$desc;
        }


        $html .= '</nav>'.
                '</div></div>';
    }

    return $html;

}
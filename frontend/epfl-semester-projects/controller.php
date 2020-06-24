<?php

namespace EPFL\Plugins\Gutenberg\SemesterProjects;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_semester_projects_block($attributes, $inner_content) {
    
    // To avoid to execute all code below (useless) when we just click on "Update" to save page while editing it
    if(is_admin()) return "";


    $title            = Utils::get_sanitized_attribute( $attributes, 'title' );

    $url = "https://isatest.epfl.ch/services/projects/PROJETS_GM";

    $items = Utils::get_items($url, 0, 5, false);


    $html = '<div class="container mb-4">'.
    '<div class="links-group">'.
        '<h5 id="links-group-title">'.$title.'</h5>'.
        '<nav class="nav flex-column flex-wrap align-items-start" role="navigation" aria-labelledby="links-group-title">';

    foreach($items as $item)
    {

      $html .= '<a class="nav-link nav-pretty" href="'.'#'.'">'.$item->project->description.'</a>';
    }


    $html .= '</nav>'.
    '</div></div>';

    return $html;
  }
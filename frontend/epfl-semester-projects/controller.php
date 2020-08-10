<?php

namespace EPFL\Plugins\Gutenberg\SemesterProjects;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_semester_projects_block($attributes, $inner_content) {
    
    // To avoid to execute all code below (useless) when we just click on "Update" to save page while editing it
    if(is_admin()) return "";


    $title                  = Utils::get_sanitized_attribute( $attributes, 'title' );
    $section                = Utils::get_sanitized_attribute( $attributes, 'section' );
    $only_current_projects  = Utils::get_sanitized_attribute( $attributes, 'onlyCurrentProjects', '' ) != '';
    $professor_scipers      = Utils::get_sanitized_attribute( $attributes, 'professorScipers' );
    $professor_scipers      = preg_replace('/\s/', '', $professor_scipers);

    if($section == '') return '';

    $url = "https://ditex-web.epfl.ch/services/v1/projects/STI/".$section;

    // to store parameters
    $search_params = array();

    if($only_current_projects) $search_params[] = 'date-active='.date("Y-m-d");
    if($professor_scipers != "")
    {
      foreach(explode(',', $professor_scipers) as $sciper)
      {
        // yes, we can have multiple 'professor' key defined in query string... it's how the Webservice works...
        $search_params[] = 'professor='.$sciper;
      }
    }

    if(sizeof($search_params)>0) $url .= "/search?".implode('&', $search_params);

    $items = Utils::get_items($url, 0, 5, false);

    $html = "<h3>".$title."</h3>";

    foreach($items as $item)
    {
      $attributes = array('title' => $item->project->title);

      $types = array();
      foreach($item->project->types as $type){ $types[] = $type->fr;}

      $content_array = array('No project'   => $item->project->noProjet->fr,
                            'Image'         => $item->project->image->fr,
                            'Types'         => implode(", ", $types),
                            'Section'       => $item->project->section->fr,
                            'Principal 1'   => '<a href="https://people.epfl.ch/'.$item->project->enseignants->principal1->sciper.'" target="_blank">'.$item->project->enseignants->principal1->name->fr. '</a>',
                            'Rapport'       => $item->project->rapport->fr,
                            'Présentation'  => $item->project->presentation->fr,
                            'Archivage'     => $item->project->archivage->fr,
                            'Descriptif'    => $item->project->descriptif->fr,
                            'Commentaires'  => $item->project->commentaire->fr,
                            'Professors'    => '<a href="https://people.epfl.ch/'.$item->project->enseignants->principal1->sciper.'" target="_blank">'.$item->project->enseignants->principal1->name->fr.'</a>, '.
                                                '<a href="https://people.epfl.ch/'.$item->project->enseignants->principal2->sciper.'" target="_blank">'.$item->project->enseignants->principal2->name->fr. '</a>',
                            'Resp. Admin'   => $item->project->administrateur->fr,
                            'Site'          => $item->project->site->fr,
                            'Labo, site, mail' => $item->project->externe->laboratoire->fr. ", ".
                                                  $item->project->externe->site->fr." ,".
                                                  $item->project->externe->email->fr
                          );

      $inner_content = array();
      foreach($content_array as $title => $value)
      {
        $inner_content[] = "<b>".$title.": </b>".$value;
      }

      $html .= \EPFL\Plugins\Gutenberg\Toggle\epfl_toggle_block( $attributes, implode("<br>", $inner_content) );
    }


    return $html;
  }
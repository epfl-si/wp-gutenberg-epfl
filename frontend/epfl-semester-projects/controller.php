<?php

namespace EPFL\Plugins\Gutenberg\SemesterProjects;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function epfl_semester_projects_block($attributes, $inner_content) {
    
    // To avoid to execute all code below (useless) when we just click on "Update" to save page while editing it
    if(is_admin()) return "";


    $title            = Utils::get_sanitized_attribute( $attributes, 'title' );
    $section          = Utils::get_sanitized_attribute( $attributes, 'section' );

    if($section == '') return '';

    $url = "https://ditex-web.epfl.ch/services/v1/projects/STI/".$section;

    $items = Utils::get_items($url, 0, 5, false);


    foreach($items as $item)
    {
      $attributes = array('title' => $item->project->title);

      $types = array();
      foreach($item->project->types as $type){ $types[] = $type->fr;}

      $content_array = array('No project'   => $item->project->noProjet->fr,
                            'Image'         => $item->project->image->fr,
                            'Types'         => implode(", ", $types),
                            'Section'       => $item->project->section->fr,
                            'Principal 1'   => $item->project->enseignants->principal1->name->fr,
                            'Rapport'       => $item->project->rapport->fr,
                            'Présentation'  => $item->project->presentation->fr,
                            'Archivage'     => $item->project->archivage->fr,
                            'Descriptif'    => $item->project->descriptif->fr,
                            'Commentaires'  => $item->project->commentaire->fr,
                            'Professors'    => $item->project->enseignants->principal1->name->fr.", ".
                                                $item->project->enseignants->principal2->name->fr,
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
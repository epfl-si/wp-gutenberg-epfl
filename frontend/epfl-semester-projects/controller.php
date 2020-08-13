<?php

namespace EPFL\Plugins\Gutenberg\SemesterProjects;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

// Return HTML code with a link to given URL
function get_link($url)
{
  if(preg_match('/https?/', $url) === 0) $url = 'https://'.$url;

  return '<a href="'.$url.'" target="_blank">'. $url.'</a>';
}


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
      $attributes = array('title' => '['.$item->project->noProjet->fr.'] '.$item->project->title);

      $types = array();
      foreach($item->project->types as $type){ $types[] = $type->fr;}

      $content_array = array();
      $content_array['No project'] = $item->project->noProjet->fr;
      if($item->project->image->fr != '') $content_array['Image'] = $item->project->image->fr;
      if(sizeof($types)>0) $content_array['Types'] = implode(", ", $types);
      $content_array['Section'] = $item->project->section->fr;
      $content_array['Principal 1'] = '<a href="https://people.epfl.ch/'.$item->project->enseignants->principal1->sciper.'" target="_blank">'.$item->project->enseignants->principal1->name->fr. '</a>';
      if($item->project->rapport->fr != '') $content_array['Rapport'] = $item->project->rapport->fr;
      if($item->project->presentation->fr != '') $content_array['Présentation'] = $item->project->presentation->fr;
      if($item->project->archivage->fr != '') $content_array['Archivage'] = $item->project->archivage->fr;
      if($item->project->descriptif->fr != '') $content_array['Descriptif'] = $item->project->descriptif->fr;
      if($item->project->commentaire->fr != '') $content_array['Commentaires'] = $item->project->commentaire->fr;
      
      $professors = array();
      if($item->project->enseignants->principal1->sciper != '') $professors[] = '<a href="https://people.epfl.ch/'.$item->project->enseignants->principal1->sciper.'" target="_blank">'.$item->project->enseignants->principal1->name->fr.'</a>';
      if($item->project->enseignants->principal2->sciper != '') $professors[] = '<a href="https://people.epfl.ch/'.$item->project->enseignants->principal2->sciper.'" target="_blank">'.$item->project->enseignants->principal2->name->fr.'</a>';
        
      if(sizeof($professors)>0) $content_array['Professors'] = implode(', ', $professors);
      
      if($item->project->administrateur->fr != '') $content_array['Resp. Admin'] = $item->project->administrateur->fr;
      if($item->project->site->fr != '') $content_array['Site'] = get_link($item->project->site->fr);

      $external = array();
      if($item->project->externe->laboratoire->fr != '') $external[] = $item->project->externe->laboratoire->fr;
      if($item->project->externe->site->fr != '') $external[] = get_link($item->project->externe->site->fr);
      if($item->project->externe->email->fr != '') $external[] = '<a href="mailto:'.$item->project->externe->email->fr.'">'.$item->project->externe->email->fr.'</a>';
      
      if(sizeof($external)>0) $content_array['Externe'] = implode(", ", $external);

      $inner_content = array();
      foreach($content_array as $title => $value)
      {
        $inner_content[] = "<b>".$title.": </b>".$value;
      }

      $html .= \EPFL\Plugins\Gutenberg\Toggle\epfl_toggle_block( $attributes, implode("<br>", $inner_content) );
    }


    return $html;
  }
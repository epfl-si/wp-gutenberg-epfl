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

    $target_host = 'isa.epfl.ch';
    //$target_host = 'ditex-web.epfl.ch';

    $url = "https://".$target_host."/services/v1/projects/".$section;


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

    ob_start();

?>
<div class="container">
  <h2><?php echo $title ?></h2>

<?php foreach($items as $item): 
  // To use ad ID for collapsing/expanding project
  $project_id = md5($title.$item->project->noProjet->fr); 
  
  $types = array();
  foreach($item->project->types as $type){ $types[] = $type->fr;}

  $professors = array();
  if($item->project->enseignants->principal1->sciper != '') $professors[] = $item->project->enseignants->principal1->name->fr;
  if($item->project->enseignants->principal2->sciper != '') $professors[] = $item->project->enseignants->principal2->name->fr;

  ?>

<section class="collapse-container">
    <header class="collapse-title collapse-title-desktop collapsed" data-toggle="collapse" data-target="#project-available-<?php echo $project_id; ?>" aria-expanded="false" aria-controls="project-available-<?php echo $project_id; ?>">
      <p class="title"><?php echo $item->project->title; ?></p>
      <ul class="project-data list-inline has-sep small text-muted">
        <li>ID: <?php echo $item->project->noProjet->fr; ?></li>
        <li><span class="sr-only">Semester: </span>????</li>
        <li><span class="sr-only">Type(s): </span><?php echo implode(", ", $types); ?></li>
        <li><span class="sr-only">Section(s): </span><?php echo $item->project->section->fr; ?></li>
        <li class="available"><span class="sr-only">Status: </span><?php echo $item->project->status->label; ?></li>
        <li><span class="sr-only">Professor: </span><?php echo $item->project->enseignants->principal1->name->fr; ?></li>
      </ul>
    </header>

    <div class="collapse collapse-item collapse-item-desktop" id="project-available-<?php echo $project_id; ?>">
    <?php if($item->project->image->link->href != ''): ?>
      <div class="project-thumb alignright">
        <picture>
          <img src="<?php echo 'https://'.$target_host.'/'.$item->project->image->link->href; ?>" class="img-fluid" style="width:150px;" alt="ALT">
        </picture>
      </div>
    <?php endif; ?>
      <p><?php echo $item->project->descriptif->fr; ?></p>

      <dl class="definition-list definition-list-grid">
        <dt>Requirements</dt>
        <dd>Background in System and Control Theory, experience with C++ and Matlab (or Python).
          Knowledge of ROS and mathematical optimization will be a big plus.</dd>
        <dt>Professor(s)</dt>
        <dd><?php echo implode(", ", $professors); ?></dd>
        <dt>Supervisor</dt>
        <dd><?php echo $item->project->administrateur->fr; ?></dd>
      </dl>
    </div>
  </section>


<?php endforeach; ?>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;



    $html = '<div class="container"><h2>'.$title.'</h2>';

    foreach($items as $item)
    {

      // To use ad ID for collapsing/expanding project
      $project_id = md5($title.$item->project->noProjet->fr);

      $html .= '<section class="collapse-container">'.
               '<header class="collapse-title collapse-title-desktop collapsed" data-toggle="collapse" data-target="#project-available-'.$project_id.'" aria-expanded="false" aria-controls="project-available-'.$project_id.'">';


      

      $content_array = array();
      if($item->project->image->fr != '') $content_array['Image'] = $item->project->image->fr;
      
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

      $item_html = "";

      if($item->project->image->link->href != '')
      {
        $item_html .= '<img src="https://'.$target_host.'/'.$item->project->image->link->href.'" style="width:500px;"><br>';
      }

      $item_html .= implode("<br>", $inner_content);

      $html .= '</div></section>';

    }


    return $html;
  }
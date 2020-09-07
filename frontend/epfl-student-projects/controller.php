<?php

namespace EPFL\Plugins\Gutenberg\StudentProjects;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

// Return HTML code with a link to given URL
function get_link($url)
{
  if(preg_match('/https?/', $url) === 0) $url = 'https://'.$url;

  return '<a href="'.$url.'" target="_blank">'. $url.'</a>';
}


function epfl_student_projects_block($attributes, $inner_content) {
    
    // To avoid to execute all code below (useless) when we just click on "Update" to save page while editing it
    if(is_admin()) return "";


    $title                  = Utils::get_sanitized_attribute( $attributes, 'title' );
    $section                = Utils::get_sanitized_attribute( $attributes, 'section' );
    $only_current_projects  = Utils::get_sanitized_attribute( $attributes, 'onlyCurrentProjects', '' ) != '';
    $professor_scipers      = Utils::get_sanitized_attribute( $attributes, 'professorScipers' );
    $professor_scipers      = preg_replace('/\s/', '', $professor_scipers);

    if($section == '') return '';

    $target_host = 'isa.epfl.ch';
    $target_host = 'ditex-web.epfl.ch';

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

    if($items === false)
    {
      return Utils::render_user_msg("Error getting project list");
    }
    
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
  if($item->project->enseignants->principal1->sciper != '') $professors[] = '<a href="https://people.epfl.ch/'.$item->project->enseignants->principal1->sciper.'" target="_blank">'.$item->project->enseignants->principal1->name->fr.'</a>';
  if($item->project->enseignants->principal2->sciper != '') $professors[] = '<a href="https://people.epfl.ch/'.$item->project->enseignants->principal2->sciper.'" target="_blank">'.$item->project->enseignants->principal2->name->fr.'</a>';

  $details = array();

  if($item->project->commentaire !== null)
  {
    $details[] = array('Comment', str_replace('\r\n', '</p><p>', $item->project->commentaire->fr));
  }
  $details[] = array('Professor(s)', implode(", ", $professors));
  
  if($item->project->administrateur !== null)  $details[] = array('Supervisor', $item->project->administrateur->fr);
  if($item->project->externe->laboratoire !== null) $details[] = array('Laboratory', $item->project->externe->laboratoire->fr);
  if($item->project->externe->site !== null && preg_match('/^ĥttp/', $item->project->externe->site->fr)===1) $details[] = array('Website', '<a href="'.$item->project->externe->site->fr.'" target="_blank">'.$item->project->externe->site->fr.'</a>');

  if($item->project->externe->email !== null) $details[] = array('Email', '<a href="mailto:'.$item->project->externe->email->fr.'">'.$item->project->externe->email->fr.'</a>');

?>

<section class="collapse-container">
    <header class="collapse-title collapse-title-desktop collapsed" data-toggle="collapse" data-target="#project-available-<?php echo $project_id; ?>" aria-expanded="false" aria-controls="project-available-<?php echo $project_id; ?>">
      <p class="title"><?php echo $item->project->title; ?></p>
      <ul class="project-data list-inline has-sep small text-muted">
        <li>ID: <?php echo $item->project->noProjet->fr; ?></li>
        <li><span class="sr-only">Type(s): </span><?php echo implode(", ", $types); ?></li>
        <li><span class="sr-only">Section(s): </span><?php echo $item->project->section->fr; ?></li>
        <li><span class="sr-only">Status: </span><?php echo $item->project->status->label; ?></li>
        <li><span class="sr-only">Professor: </span><?php echo $item->project->enseignants->principal1->name->fr; ?></li>
      </ul>
    </header>

    <div class="collapse collapse-item collapse-item-desktop" id="project-available-<?php echo $project_id; ?>">
    <?php if($item->project->image->link !== null): ?>
      <div class="project-thumb alignright">
        <picture>
          <img src="<?php echo 'https://'.$target_host.'/'.$item->project->image->link->href; ?>" class="img-fluid" style="width:250px;" alt="ALT">
        </picture>
      </div>
    <?php endif; ?>
      <p><?php echo str_replace('\r\n', '</p><p>', $item->project->descriptif->fr); ?></p>

      <dl class="definition-list definition-list-grid">
        <?php foreach($details as $detail): ?>
          <dt><?php echo $detail[0]; ?></dt>
          <dd><?php echo $detail[1]; ?></dd>
        <?php endforeach; ?>

      </dl>
    </div>
  </section>
<?php endforeach; ?>
</div>

<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;

}
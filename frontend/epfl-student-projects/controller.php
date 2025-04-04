<?php

namespace EPFL\Plugins\Gutenberg\StudentProjects;

use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__) . '/../lib/utils.php');

function get_link($url)
{
  if (preg_match('/https?/', $url) === 0)
    $url = 'https://' . $url;
  return '<a href="' . $url . '" target="_blank">' . $url . '</a>';
}

function sortByProjectNameIsa($a, $b)
{
  return strcmp($a->project->title, $b->project->title);
}

function sortByProjectNameZen($a, $b)
{
  return strcmp($a->title, $b->title);
}

function handle_isa($attributes)
{
  $title = Utils::get_sanitized_attribute($attributes, 'title');
  $section = Utils::get_sanitized_attribute($attributes, 'section');
  $only_current_projects = Utils::get_sanitized_attribute($attributes, 'onlyCurrentProjects', '') != '';
  $professor_scipers = Utils::get_sanitized_attribute($attributes, 'professorScipers');
  $professor_scipers = preg_replace('/\s/', '', $professor_scipers);

  if ($section == '')
    return '';

  $target_host = 'isa.epfl.ch';
  //$target_host = 'ditex-web.epfl.ch';

  $url = "https://" . $target_host . "/services/v1/projects/" . $section;

  $search_params = array();

  if ($only_current_projects)
    $search_params[] = 'date-active=' . date("Y-m-d");
  if ($professor_scipers != "") {
    foreach (explode(',', $professor_scipers) as $sciper) {
      $search_params[] = 'professor=' . $sciper;
    }
  }

  if (count($search_params) > 0)
    $url .= "/search?" . implode('&', $search_params);
  $items = Utils::get_items($url, 0, 5, false);

  if ($items === false) {
    return Utils::render_user_msg("Error getting project list");
  }

  usort($items, 'EPFL\Plugins\Gutenberg\StudentProjects\sortByProjectNameIsa');

  ob_start();
  ?>
  <div id='student-projects-list' class="container">
    <h2><?php echo $title ?></h2>
    <div class="form-group">
      <input type="text" id="student-projects-search-input" class="form-control search mb-2"
        placeholder="<?php _e('Search', 'epfl') ?>" aria-describedby="student-projects-search-input">
      <button class="btn btn-secondary sort asc" data-sort="title"><?php _e('Sort by project name', 'epfl') ?></button>
      <button class="btn btn-secondary sort" data-sort="project-id"><?php _e('Sort by project ID', 'epfl') ?></button>
      <button class="btn btn-secondary sort" data-sort="professor1-name"><?php _e('Sort by professor', 'epfl') ?></button>
      <button class="btn btn-secondary sort" data-sort="project-type"><?php _e('Sort by type', 'epfl') ?></button>
    </div>

    <div class="list">

      <?php foreach ($items as $item):

        // to skip "deleted" projects
        if ($item->project->status->code == 'STATUT_STAGE_SUPPR') {
          continue;
        }

        // To use ad ID for collapsing/expanding project
        $project_id = md5($title . $item->project->noProjet->fr);

        $types = array();
        foreach ($item->project->types as $type) {
          $types[] = $type->fr;
        }


        $professors = array();
        $professors_name_only = array();
        if ($item->project->enseignants->principal1->sciper != '') {
          // To extract beginning of the string if exists: "Laboratoire d'automatique 3, IGM – Gestion" to "Laboratoire d'automatique 3"
          $parts = explode(',', $item->project->enseignants->principal1->laboratory->fr);
          $first_part = reset($parts);
          $first_part ? $first_part = ' <small>(' . $first_part . ')</small>' : '';

          $professors[] = '<a href="https://people.epfl.ch/' . $item->project->enseignants->principal1->sciper . '" target="_blank" class="professor1-name">' . $item->project->enseignants->principal1->name->fr .
            '</a>' . $first_part;
          $professors_name_only[] = $item->project->enseignants->principal1->name->fr;
        }
        if ($item->project->enseignants->principal2->sciper != '') {
          $professors[] = '<a href="https://people.epfl.ch/' . $item->project->enseignants->principal2->sciper . '" target="_blank">' . $item->project->enseignants->principal2->name->fr . '</a>';
          $professors_name_only[] = $item->project->enseignants->principal2->name->fr;
        }

        $details = array();

        if ($item->project->commentaire !== null) {
          $details[] = array('Comment', str_replace("\r\n", '</p><p>', $item->project->commentaire->fr));
        }
        $details[] = array('Professor(s)', implode(", ", $professors));

        if ($item->project->administrateur !== null) {
          // Format is "<firstName> <lastName> (<sciper>)" and we need to explode to have "name" and "sciper"...
          $matches = array();
          preg_match('/(.*?)\s\(([0-9]+)\)/', $item->project->administrateur->fr, $matches);
          $details[] = array('Administration', '<a href="https://people.epfl.ch/' . $matches[2] . '" target="_blank">' . $matches[1] . '</a>');
        }


        $external = array();
        if ($item->project->externe->laboratoire !== null)
          $external[] = $item->project->externe->laboratoire->fr;
        if ($item->project->externe->site !== null) {
          // website is a link
          if (preg_match('/^http/', $item->project->externe->site->fr) === 1) {
            $external[] = '<a href="' . $item->project->externe->site->fr . '" target="_blank">' . $item->project->externe->site->fr . '</a>';
          } else {
            $external[] = $item->project->externe->site->fr;
          }
        }

        if ($item->project->externe->email !== null)
          $external[] = '<a href="mailto:' . $item->project->externe->email->fr . '">' . $item->project->externe->email->fr . '</a>';
        if (count($external) > 0)
          $details[] = array('External', implode(", ", $external));

        if ($item->project->site !== null)
          $details[] = array('Site', '<a href="' . $item->project->site->fr . '" target="_blank">' . $item->project->site->fr . '</a>');

        ?>

        <section class="collapse-container">
          <header class="collapse-title collapse-title-desktop collapsed" data-toggle="collapse"
            data-target="#project-available-<?php echo $project_id; ?>" aria-expanded="false"
            aria-controls="project-available-<?php echo $project_id; ?>">
            <p class="title"><?php echo $item->project->title; ?></p>
            <ul class="project-data list-inline has-sep small text-muted">
              <li class="project-id">ID: <?php echo $item->project->noProjet->fr; ?></li>
              <li class="project-type"><span class="sr-only">Type(s): </span><?php echo implode(", ", $types); ?></li>
              <li><span class="sr-only">Section(s): </span><?= $item->project->section->fr ?? ''; ?></li>
              <li><span class="sr-only">Status: </span><?= $item->project->status->label ?? '' ?></li>
              <li><span class="sr-only">Professor: </span><?php echo implode(", ", $professors_name_only); ?></li>
            </ul>
          </header>

          <div class="collapse collapse-item collapse-item-desktop project-description"
            id="project-available-<?php echo $project_id; ?>">
            <?php if ($item->project->image->link !== null): ?>
              <div class="project-thumb alignright">
                <picture>
                  <img src="<?php echo 'https://' . $target_host . '/' . $item->project->image->link->href; ?>"
                    class="img-fluid" style="width:100%;" alt="ALT">
                </picture>
              </div>
            <?php endif; ?>
            <p><?php echo str_replace("\r\n", '</p><p>', $item->project->descriptif->fr); ?></p>

            <dl class="definition-list definition-list-grid">
              <?php foreach ($details as $detail): ?>
                <dt><?php echo $detail[0]; ?></dt>
                <dd><?php echo $detail[1]; ?></dd>
              <?php endforeach; ?>

            </dl>
          </div>
        </section>
      <?php endforeach; ?>
    </div>
  </div>
  <?php
  $content = ob_get_contents();
  ob_end_clean();
  return $content;
}

function epfl_student_projects_block($attributes, $inner_content)
{

  $api_source = Utils::get_sanitized_attribute($attributes, 'apiSource');

  switch ($api_source) {
    case 'zen':
      return handle_zen($attributes);
    case 'isa':
      return handle_isa($attributes);
  }
}

function handle_zen($attributes)
{
    $section = Utils::get_sanitized_attribute($attributes, 'section');
    $zenFetchMode = Utils::get_sanitized_attribute($attributes, 'zenFetchMode');
    $professorScipers = Utils::get_sanitized_attribute($attributes, 'professorScipers');


    if ($zenFetchMode === 'sciper' && !empty($professorScipers)) {
        $sciper = preg_replace('/\s/', '', $professorScipers);
        $url = "https://test-sti-zen.epfl.ch/api/public/projects/manager/" . $sciper;
    } else if ($zenFetchMode === 'section' && !empty($section)) {
        $url = "https://sti-zen.epfl.ch/api/public/projects/unit/" . $section;
    } else {
        return Utils::render_user_msg("Invalid fetch mode or missing parameters");
    }

    $items = Utils::zen_api_request($url);

    if ($items === NULL) {
        return Utils::render_user_msg("Error getting project list from ZEN or project list is empty");
    }

    // Sort initially by project title
    usort($items, 'EPFL\Plugins\Gutenberg\StudentProjects\sortByProjectNameZen');

    ob_start();
    ?>
    <div id='student-projects-list' class="container" style=" display:flex; flex-direction:column; gap: 50px">
        <div class="form-group">
            <input type="text" id="student-projects-search-input" class="form-control search mb-2"
                placeholder="<?php _e('Search', 'epfl') ?>" aria-describedby="student-projects-search-input"
                onkeyup="filterProjects()">
            <button class="btn btn-secondary sort asc"
                onclick="sortProjects('title')"><?php _e('Sort by project title', 'epfl'); ?></button>
            <button class="btn btn-secondary sort"
                onclick="sortProjects('id')"><?php _e('Sort by project ID', 'epfl'); ?></button>
            <button class="btn btn-secondary sort" onclick="sortProjects('date')"><?php _e('Sort by date', 'epfl') ?></button>
        </div>

        <div class="list" id="projects-list" style="margin-bottom: 50px">
            <?php foreach ($items as $item): ?>
                <section class="collapse-container project-item" data-title="<?php echo htmlspecialchars($item['title']); ?>"
                  data-id="<?php echo $item['id']; ?>" data-date="<?php echo substr($item['createdAt'], 0, 10); ?>">
                  <header class="collapse-title collapse-title-desktop collapsed" data-toggle="collapse"
                    data-target="#project-<?php echo $item['id']; ?>" aria-expanded="false"
                    aria-controls="project-<?php echo $item['id']; ?>">
                    <p class="title"><?php echo htmlspecialchars($item['title']); ?></p>
                    <ul class="project-data list-inline has-sep small text-muted">
                      <li class="project-id">ID: <?php echo $item['id']; ?></li>
                      <li class="project-status">Status: <?php echo htmlspecialchars($item['status']); ?></li>
                      <li class="project-date">Created At: <?php echo substr($item['createdAt'], 0, 10); ?></li>
                      <?php if (!empty($item['endDate'])): ?>
                        <li class="project-end-date">End Date: <?php echo substr($item['endDate'], 0, 10); ?></li>
                      <?php endif; ?>
                    </ul>
                  </header>

                  <div class="collapse collapse-item collapse-item-desktop project-description"
                    id="project-<?php echo $item['id']; ?>">
                    <p>
                      <?php echo !empty($item['description']) ? strip_tags($item['description'], '<br><p><strong>') : "No description provided"; ?>
                    </p>

                    <dl class="definition-list definition-list-grid">
                      <?php if (!empty($item['projectUrl'])): ?>
                        <dt>Project URL:</dt>
                        <dd><a
                            href="<?php echo htmlspecialchars($item['projectUrl']); ?>"><?php echo htmlspecialchars($item['projectUrl']); ?></a>
                        </dd>
                      <?php endif; ?>

                      <dt>Project Creator:</dt>
                      <dd>
                        <?php echo htmlspecialchars($item['creator']['firstName']) . ' ' . htmlspecialchars($item['creator']['lastName']); ?>
                        (<?php echo htmlspecialchars($item['creator']['email']); ?>)
                      </dd>

                      <dt>Units Involved:</dt>
                      <?php foreach ($item['units'] as $unit): ?>
                        <dd><?php echo htmlspecialchars($unit['name_fr']); ?> (<?php echo htmlspecialchars($unit['acronym']); ?>)</dd>
                      <?php endforeach; ?>

                      <?php if (!empty($item['tags'])): ?>
                        <dt>Tags:</dt>
                        <dd>
                          <?php foreach ($item['tags'] as $tag): ?>
                            <span style="padding: 2px 5px; margin-right: 5px;">
                              <?php echo htmlspecialchars($tag['name']) . ', '; ?>
                            </span>
                          <?php endforeach; ?>
                        <?php endif; ?>
                      </dd>

                      <dt>Memberships:</dt>
                      <dd>
                        <?php foreach ($item['projectMembership'] as $membership): ?>
                          <?php echo htmlspecialchars($membership['user']['firstName']) . ' ' . htmlspecialchars($membership['user']['lastName']); ?>
                          - Role: <?php foreach ($membership['roles'] as $role) {
                            echo htmlspecialchars($role['name']) . ', ';
                          } ?>
                        <?php endforeach; ?>
                      </dd>
                    </dl>
                  </div>
                </section>
            <?php endforeach; ?>
        </div>
    </div>

    <script>
        function filterProjects() {
            const input = document.getElementById('student-projects-search-input').value.toLowerCase();
            const projects = document.getElementsByClassName('project-item');

            Array.from(projects).forEach((project) => {
                const title = project.getAttribute('data-title').toLowerCase();
                project.style.display = title.includes(input) ? '' : 'none';
            });
        }

        function sortProjects(type) {
            const projectsList = document.getElementById('projects-list');
            const projects = Array.from(projectsList.getElementsByClassName('project-item'));

            projects.sort((a, b) => {
                const getValue = (project) => {
                    switch (type) {
                        case 'title':
                            return project.dataset.title.toLowerCase();
                        case 'id':
                            return parseInt(project.dataset.id);
                        case 'date':
                            return new Date(project.dataset.date);
                    }
                };

                const valueA = getValue(a);
                const valueB = getValue(b);

                return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            });

            projects.forEach(project => projectsList.appendChild(project));

        }
    </script>

    <?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

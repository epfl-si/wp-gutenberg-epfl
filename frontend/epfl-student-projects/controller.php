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
  $titleA = isset($a->project->title) ? $a->project->title : '';
  $titleB = isset($b->project->title) ? $b->project->title : '';
  return strcmp($titleA, $titleB);
}

function sortByProjectNameZen($a, $b)
{
  $titleA = isset($a['title']) ? $a['title'] : '';
  $titleB = isset($b['title']) ? $b['title'] : '';
  return strcmp($titleA, $titleB);
}

function handle_isa($attributes)
{
  $title = Utils::get_sanitized_attribute($attributes, 'title');
  $section = Utils::get_sanitized_attribute($attributes, 'section');
  $only_current_projects = Utils::get_sanitized_attribute($attributes, 'onlyCurrentProjects', '') != '';
  $professor_scipers = Utils::get_sanitized_attribute($attributes, 'professorScipers');
  $professor_scipers = preg_replace('/\s/', '', $professor_scipers);

  if ($section == '') {
    // Show validation error if section is empty
    return Utils::render_user_msg(__("The form was not properly filled. Please select a section.", 'epfl'));
  }

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

  // Validation: Check if API source is selected
  if (empty($api_source)) {
    return Utils::render_user_msg(__("The form was not properly filled. Please select an API source.", 'epfl'));
  }

  switch ($api_source) {
    case 'zen':
      return handle_zen($attributes);
    case 'isa':
      return handle_isa($attributes);
    default:
      return Utils::render_user_msg(__("The form was not properly filled. Invalid API source selected.", 'epfl'));
  }
}

function handle_zen($attributes)
{
    $section = Utils::get_sanitized_attribute($attributes, 'section');
    $title = Utils::get_sanitized_attribute($attributes, 'title');
    $zenFetchMode = Utils::get_sanitized_attribute($attributes, 'zenFetchMode');
    $professorScipers = Utils::get_sanitized_attribute($attributes, 'professorScipers');
    $onlyArchivedProjects = Utils::get_sanitized_attribute($attributes, 'onlyArchivedProjects', '') != '';
    $onlyCurrentProjects = Utils::get_sanitized_attribute($attributes, 'onlyCurrentProjects', '') != '';

    // Validation: Check if form is properly filled
    if (empty($zenFetchMode)) {
        return Utils::render_user_msg(__("The form was not properly filled. Please select a fetch mode (By Unit or By Professor SCIPER).", 'epfl'));
    }
    
    if ($zenFetchMode === 'section' && empty($section)) {
        return Utils::render_user_msg(__("The form was not properly filled. Please select a unit.", 'epfl'));
    }
    
    if ($zenFetchMode === 'sciper' && empty($professorScipers)) {
        return Utils::render_user_msg(__("The form was not properly filled. Please enter at least one professor SCIPER.", 'epfl'));
    }

    $archivedSuffix = $onlyArchivedProjects ? '/archived' : '';

    if ($zenFetchMode === 'sciper' && !empty($professorScipers)) {
        $sciper = preg_replace('/\s/', '', $professorScipers);
        $url = "https://project-portal.epfl.ch/api/public/projects/manager/" . $sciper . $archivedSuffix;
    } else if ($zenFetchMode === 'section' && !empty($section)) {
        $url = "https://project-portal.epfl.ch/api/public/projects/unit/" . $section . $archivedSuffix;
    } else {
        return Utils::render_user_msg(__("The form was not properly filled. Invalid fetch mode or missing parameters.", 'epfl'));
    }

    $items = Utils::zen_api_request($url);

    if ($items === NULL || $items === false || !is_array($items)) {
        return Utils::render_user_msg("Error getting project list from Project Portal or project list is empty");
    }

    // Filter ongoing projects if requested
    if ($onlyCurrentProjects) {
        $items = array_filter($items, function($item) {
            return isset($item['status']) && $item['status'] === 'ongoing';
        });
        $items = array_values($items);
    }

    // Sort initially by project title
    usort($items, 'EPFL\Plugins\Gutenberg\StudentProjects\sortByProjectNameZen');

    // Collect all unique levels for filter buttons
    $allLevels = array();
    foreach ($items as $item) {
        if (!empty($item['tags'])) {
            foreach ($item['tags'] as $tag) {
                if (isset($tag['tagType']['name']) && $tag['tagType']['name'] === 'Level') {
                    $allLevels[$tag['name']] = true;
                }
            }
        }
    }
    $allLevels = array_keys($allLevels);
    sort($allLevels);

    $instance_id = 'epfl-sp-' . substr(md5(uniqid('', true)), 0, 8);

    ob_start();
    ?>
    <div class="epfl-student-projects container" id="<?php echo $instance_id; ?>">
        <style>
            #<?php echo $instance_id; ?> .epfl-sp-sort,
            #<?php echo $instance_id; ?> .epfl-sp-level{font-size:.8125rem;font-weight:600;padding:.25rem .75rem;line-height:1.4;background-color:#fff;border:1px solid #d0d0d0;color:#444;box-shadow:none;transition:all .15s ease}
            #<?php echo $instance_id; ?> .epfl-sp-level{border-radius:50rem;margin:0 .35rem .35rem 0}
            #<?php echo $instance_id; ?> .epfl-sp-sort:hover,
            #<?php echo $instance_id; ?> .epfl-sp-level:hover{border-color:#ff0000;color:#ff0000}
            #<?php echo $instance_id; ?> .epfl-sp-sort.active,
            #<?php echo $instance_id; ?> .epfl-sp-level.active{background-color:#ff0000;border-color:#ff0000;color:#fff}
            #<?php echo $instance_id; ?> .epfl-sp-sort.active:hover,
            #<?php echo $instance_id; ?> .epfl-sp-level.active:hover{color:#fff}
        </style>
        <?php if (!empty($title)): ?>
            <h2 class="text-center mb-1"><?php echo htmlspecialchars($title); ?></h2>
        <?php endif; ?>
        <p class="text-center text-muted small mb-4"><?php _e('Showing', 'epfl'); ?> <strong class="epfl-sp-count"><?php echo count($items); ?></strong> <?php _e('projects', 'epfl'); ?></p>

        <div class="form-row align-items-end mb-3">
            <div class="col-12 col-md-7 form-group mb-2">
                <label for="<?php echo $instance_id; ?>-search" class="small text-muted mb-1"><?php _e('Search', 'epfl'); ?></label>
                <input type="text" id="<?php echo $instance_id; ?>-search" class="form-control epfl-sp-search" placeholder="<?php esc_attr_e('Search by title, keyword, supervisor…', 'epfl'); ?>">
            </div>
            <div class="col-12 col-md-5 form-group mb-2">
                <span class="small text-muted d-block mb-1"><?php _e('Sort by', 'epfl'); ?></span>
                <div class="btn-group btn-group-sm" role="group" aria-label="<?php esc_attr_e('Sort projects', 'epfl'); ?>">
                    <button type="button" class="btn epfl-sp-sort active" data-sort="title"><?php _e('Title', 'epfl'); ?></button>
                    <button type="button" class="btn epfl-sp-sort" data-sort="id"><?php _e('ID', 'epfl'); ?></button>
                    <button type="button" class="btn epfl-sp-sort" data-sort="date"><?php _e('Date', 'epfl'); ?></button>
                </div>
            </div>
        </div>

        <?php if (!empty($allLevels)): ?>
        <div class="mb-4">
            <span class="small text-muted mr-2"><?php _e('Level', 'epfl'); ?></span>
            <button type="button" class="btn epfl-sp-level active" data-level="all"><?php _e('All', 'epfl'); ?></button>
            <?php foreach ($allLevels as $level): ?>
                <button type="button" class="btn epfl-sp-level" data-level="<?php echo htmlspecialchars($level); ?>"><?php echo htmlspecialchars($level); ?></button>
            <?php endforeach; ?>
        </div>
        <?php endif; ?>

        <div class="row epfl-sp-grid">
            <?php foreach ($items as $item):
                $itemLevels = array();
                if (!empty($item['tags'])) {
                    foreach ($item['tags'] as $tag) {
                        if (isset($tag['tagType']['name']) && $tag['tagType']['name'] === 'Level') {
                            $itemLevels[] = $tag['name'];
                        }
                    }
                }
                $date_raw = substr($item['createdAt'], 0, 10);
                $date_fmt = !empty($item['createdAt']) ? date_i18n('F j, Y', strtotime($item['createdAt'])) : '';
                $status = isset($item['status']) ? $item['status'] : '';
                $cid = $instance_id . '-p-' . (int) $item['id'];

                $search_parts = array($item['title'], $item['id']);
                $search_parts = array_merge($search_parts, $itemLevels);
                if (!empty($item['tags'])) { foreach ($item['tags'] as $t) { $search_parts[] = $t['name']; } }
                if (!empty($item['creator'])) { $search_parts[] = $item['creator']['firstName'] . ' ' . $item['creator']['lastName']; $search_parts[] = $item['creator']['email']; }
                if (!empty($item['units'])) { foreach ($item['units'] as $u) { $search_parts[] = $u['name_fr']; $search_parts[] = $u['acronym']; } }
                if (!empty($item['projectMembership'])) { foreach ($item['projectMembership'] as $m) { $search_parts[] = $m['user']['firstName'] . ' ' . $m['user']['lastName']; } }
                $search_str = strtolower(implode(' ', array_filter($search_parts)));

                $keyword_tags = array();
                if (!empty($item['tags'])) { foreach ($item['tags'] as $t) { if (!isset($t['tagType']['name']) || $t['tagType']['name'] !== 'Level') { $keyword_tags[] = $t['name']; } } }
            ?>
                <div class="col-12 col-md-6 col-lg-4 mb-4 epfl-sp-item"
                    data-title="<?php echo htmlspecialchars($item['title']); ?>"
                    data-id="<?php echo (int) $item['id']; ?>"
                    data-date="<?php echo htmlspecialchars($date_raw); ?>"
                    data-level="<?php echo htmlspecialchars(implode(',', $itemLevels)); ?>"
                    data-portal="https://project-portal.epfl.ch/projects/<?php echo (int) $item['id']; ?>"
                    data-search="<?php echo htmlspecialchars($search_str); ?>">
                    <div class="card h-100">
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <div class="epfl-sp-badges">
                                    <?php if ($status !== ''): ?>
                                        <span class="tag tag-sm <?php echo $status === 'ongoing' ? 'tag-success' : 'tag-secondary'; ?>"><?php echo htmlspecialchars($status); ?></span>
                                    <?php endif; ?>
                                    <?php foreach ($itemLevels as $lvl): ?>
                                        <span class="tag tag-sm tag-primary"><?php echo htmlspecialchars($lvl); ?></span>
                                    <?php endforeach; ?>
                                </div>
                            </div>

                            <h3 class="card-title h5"><?php echo htmlspecialchars($item['title']); ?></h3>

                            <?php
                                $excerpt = '';
                                if (!empty($item['description'])) {
                                    $plain = trim(preg_replace('/\s+/', ' ', html_entity_decode(strip_tags($item['description']), ENT_QUOTES, 'UTF-8')));
                                    if ($plain !== '') {
                                        $excerpt = mb_substr($plain, 0, 120);
                                        if (mb_strlen($plain) > 120) {
                                            $excerpt = rtrim(mb_substr($excerpt, 0, mb_strrpos($excerpt, ' ') ?: 120)) . '…';
                                        }
                                    }
                                }
                            ?>
                            <?php if ($excerpt !== ''): ?>
                            <p class="small text-muted mb-2 epfl-sp-excerpt"><?php echo htmlspecialchars($excerpt); ?></p>
                            <?php endif; ?>

                            <div class="d-flex justify-content-between align-items-center mt-auto">
                                <button class="btn btn-outline-primary btn-sm epfl-sp-details" type="button"><?php _e('Details', 'epfl'); ?></button>
                                <?php if ($date_fmt): ?>
                                <span class="small text-muted"><?php echo htmlspecialchars($date_fmt); ?></span>
                                <?php endif; ?>
                            </div>
                            <template class="epfl-sp-source">
                                <div class="mb-3">
                                    <?php echo !empty($item['description']) ? strip_tags($item['description'], '<br><p><strong><em><ul><ol><li><a><h3><h4>') : '<span class="text-muted font-italic">' . __('No description provided', 'epfl') . '</span>'; ?>
                                </div>

                                <dl class="definition-list definition-list-grid">
                                    <dt><?php _e('ID', 'epfl'); ?></dt>
                                    <dd>#<?php echo (int) $item['id']; ?></dd>

                                    <?php if ($status !== ''): ?>
                                        <dt><?php _e('Status', 'epfl'); ?></dt>
                                        <dd><?php echo htmlspecialchars($status); ?></dd>
                                    <?php endif; ?>

                                    <?php if ($date_fmt): ?>
                                        <dt><?php _e('Created At', 'epfl'); ?></dt>
                                        <dd><?php echo htmlspecialchars($date_fmt); ?></dd>
                                    <?php endif; ?>

                                    <?php if (!empty($itemLevels)): ?>
                                        <dt><?php _e('Level', 'epfl'); ?></dt>
                                        <dd><?php echo htmlspecialchars(implode(', ', $itemLevels)); ?></dd>
                                    <?php endif; ?>

                                    <?php if (!empty($item['projectUrl'])): ?>
                                        <dt><?php _e('Project URL', 'epfl'); ?></dt>
                                        <dd><a class="link-pretty" href="<?php echo htmlspecialchars($item['projectUrl']); ?>" target="_blank" rel="noopener noreferrer"><?php echo htmlspecialchars($item['projectUrl']); ?></a></dd>
                                    <?php endif; ?>

                                    <?php if (!empty($item['creator'])): ?>
                                        <dt><?php _e('Creator', 'epfl'); ?></dt>
                                        <dd><a class="link-pretty" href="mailto:<?php echo htmlspecialchars($item['creator']['email']); ?>"><?php echo htmlspecialchars($item['creator']['firstName'] . ' ' . $item['creator']['lastName']); ?></a></dd>
                                    <?php endif; ?>

                                    <?php if (!empty($item['units'])): ?>
                                        <dt><?php _e('Units', 'epfl'); ?></dt>
                                        <dd><?php foreach ($item['units'] as $unit): ?><span class="d-block"><strong><?php echo htmlspecialchars($unit['acronym']); ?></strong> &mdash; <?php echo htmlspecialchars($unit['name_fr']); ?></span><?php endforeach; ?></dd>
                                    <?php endif; ?>

                                    <?php if (!empty($item['projectMembership'])): ?>
                                        <dt><?php _e('Members', 'epfl'); ?></dt>
                                        <dd><?php foreach ($item['projectMembership'] as $m):
                                            $roles = array();
                                            foreach ($m['roles'] as $role) { $roles[] = $role['name']; }
                                        ?><span class="d-block"><?php echo htmlspecialchars($m['user']['firstName'] . ' ' . $m['user']['lastName']); ?><?php if (!empty($roles)): ?> <span class="tag tag-sm"><?php echo htmlspecialchars(implode(', ', $roles)); ?></span><?php endif; ?></span><?php endforeach; ?></dd>
                                    <?php endif; ?>

                                    <?php if (!empty($keyword_tags)): ?>
                                        <dt><?php _e('Keywords', 'epfl'); ?></dt>
                                        <dd><?php foreach ($keyword_tags as $kt): ?><span class="tag tag-sm tag-tertiary"><?php echo htmlspecialchars($kt); ?></span><?php endforeach; ?></dd>
                                    <?php endif; ?>
                                </dl>
                            </template>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>

        <div class="alert alert-warning epfl-sp-empty" role="alert" style="display:none;">
            <?php _e('No projects match your search criteria.', 'epfl'); ?>
        </div>

        <div class="modal fade epfl-sp-modal" tabindex="-1" role="dialog" aria-hidden="true" style="display:none;">
            <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <div>
                            <div class="epfl-sp-modal-badges mb-1"></div>
                            <h5 class="modal-title epfl-sp-modal-title"></h5>
                        </div>
                        <button type="button" class="close epfl-sp-modal-close" aria-label="<?php esc_attr_e('Close', 'epfl'); ?>"><span aria-hidden="true">&times;</span></button>
                    </div>
                    <div class="modal-body epfl-sp-modal-body"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary epfl-sp-modal-close"><?php _e('Close', 'epfl'); ?></button>
                        <a href="https://project-portal.epfl.ch/" class="btn btn-primary epfl-sp-modal-view" target="_blank" rel="noopener noreferrer"><?php _e('View project', 'epfl'); ?></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        (function(){
            var root = document.getElementById('<?php echo $instance_id; ?>');
            if (!root) return;
            var grid = root.querySelector('.epfl-sp-grid');
            var items = Array.prototype.slice.call(root.querySelectorAll('.epfl-sp-item'));
            var searchInput = root.querySelector('.epfl-sp-search');
            var countEl = root.querySelector('.epfl-sp-count');
            var emptyEl = root.querySelector('.epfl-sp-empty');
            var sortBtns = Array.prototype.slice.call(root.querySelectorAll('.epfl-sp-sort'));
            var levelBtns = Array.prototype.slice.call(root.querySelectorAll('.epfl-sp-level'));
            var activeLevel = 'all';

            var modal = root.querySelector('.epfl-sp-modal');
            var modalTitle = modal.querySelector('.epfl-sp-modal-title');
            var modalBadges = modal.querySelector('.epfl-sp-modal-badges');
            var modalBody = modal.querySelector('.epfl-sp-modal-body');
            var modalView = modal.querySelector('.epfl-sp-modal-view');
            var modalClosers = Array.prototype.slice.call(modal.querySelectorAll('.epfl-sp-modal-close'));
            var backdrop = null;
            var lastFocused = null;

            function apply(){
                var q = (searchInput.value || '').toLowerCase().trim();
                var visible = 0;
                items.forEach(function(item){
                    var matchesSearch = !q || (item.dataset.search || '').indexOf(q) !== -1;
                    var matchesLevel = activeLevel === 'all' || (item.dataset.level || '').split(',').indexOf(activeLevel) !== -1;
                    var show = matchesSearch && matchesLevel;
                    item.style.display = show ? '' : 'none';
                    if (show) visible++;
                });
                if (countEl) countEl.textContent = visible;
                if (emptyEl) emptyEl.style.display = visible === 0 ? '' : 'none';
            }

            function sortItems(type){
                items.slice().sort(function(a, b){
                    if (type === 'id') return parseInt(a.dataset.id, 10) - parseInt(b.dataset.id, 10);
                    if (type === 'date') return new Date(b.dataset.date) - new Date(a.dataset.date);
                    return a.dataset.title.toLowerCase() < b.dataset.title.toLowerCase() ? -1 : 1;
                }).forEach(function(el){ grid.appendChild(el); });
            }

            searchInput.addEventListener('input', apply);
            sortBtns.forEach(function(btn){
                btn.addEventListener('click', function(){
                    sortBtns.forEach(function(b){ b.classList.remove('active'); });
                    btn.classList.add('active');
                    sortItems(btn.dataset.sort);
                });
            });
            levelBtns.forEach(function(btn){
                btn.addEventListener('click', function(){
                    levelBtns.forEach(function(b){ b.classList.remove('active'); });
                    btn.classList.add('active');
                    activeLevel = btn.dataset.level;
                    apply();
                });
            });

            function onKey(e){ if (e.key === 'Escape') closeModal(); }
            function openModal(item){
                lastFocused = document.activeElement;
                var tpl = item.querySelector('.epfl-sp-source');
                modalBody.innerHTML = tpl ? tpl.innerHTML : '';
                modalTitle.textContent = item.dataset.title || '';
                var badges = item.querySelector('.epfl-sp-badges');
                modalBadges.innerHTML = badges ? badges.innerHTML : '';
                if (modalView && item.dataset.portal) modalView.setAttribute('href', item.dataset.portal);
                modal.style.display = 'block';
                modal.classList.add('show');
                document.body.classList.add('modal-open');
                backdrop = document.createElement('div');
                backdrop.className = 'modal-backdrop fade show';
                document.body.appendChild(backdrop);
                backdrop.addEventListener('click', closeModal);
                document.addEventListener('keydown', onKey);
                var firstClose = modal.querySelector('.epfl-sp-modal-close');
                if (firstClose) firstClose.focus();
            }
            function closeModal(){
                modal.style.display = 'none';
                modal.classList.remove('show');
                document.body.classList.remove('modal-open');
                if (backdrop) { backdrop.parentNode && backdrop.parentNode.removeChild(backdrop); backdrop = null; }
                document.removeEventListener('keydown', onKey);
                if (lastFocused) lastFocused.focus();
            }

            items.forEach(function(item){
                var btn = item.querySelector('.epfl-sp-details');
                if (btn) btn.addEventListener('click', function(){ openModal(item); });
            });
            modalClosers.forEach(function(c){ c.addEventListener('click', closeModal); });

            apply();
        })();
    </script>
    <?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

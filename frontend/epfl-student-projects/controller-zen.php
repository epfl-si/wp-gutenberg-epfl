<?php
// leaving this page for now even tough its not being use
namespace EPFL\Plugins\Gutenberg\StudentProjects;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

function get_link($url) {
    if (preg_match('/https?/', $url) === 0) $url = 'https://' . $url;
    return '<a href="' . $url . '" target="_blank">' . $url . '</a>';
}

function sortByProjectTitle($a, $b) {
    return strcmp($a->title, $b->title);
}

function epfl_student_projects_block_zen($attributes, $inner_content) {
    if (is_admin()) return "";

    wp_enqueue_script('lib-listjs', plugins_url('lib/list.min.js', dirname(__FILE__)), ['jquery'], '1.5', false);

    $title = Utils::get_sanitized_attribute($attributes, 'title');
    $section = Utils::get_sanitized_attribute($attributes, 'section');
    $only_current_projects = Utils::get_sanitized_attribute($attributes, 'onlyCurrentProjects', '') != '';
    $professor_scipers = Utils::get_sanitized_attribute($attributes, 'professorScipers');
    $professor_scipers = preg_replace('/\s/', '', $professor_scipers);

    if ($section == '') return '';

    $target_host = 'test-zen.epfl.ch';
    $url = "https://" . $target_host . "/api/projects/unit/" . $section;

    $search_params = array();
    if ($only_current_projects) $search_params[] = 'status=ongoing';
    if ($professor_scipers != "") {
        foreach (explode(',', $professor_scipers) as $sciper) {
            $search_params[] = 'creatorSciper=' . $sciper;
        }
    }

    if (count($search_params) > 0) $url .= "?". implode('&', $search_params);

    $items = Utils::get_items($url, 0, 5, false);

    if ($items === false) {
        return Utils::render_user_msg("Error getting project list from Zen API");
    }

    usort($items, 'EPFL\Plugins\Gutenberg\StudentProjects\sortByProjectTitle');

    ob_start();
    ?>
    <div id='student-projects-list' class="container">
        <h2><?php echo $title ?></h2>
        <div class="list">
            <?php foreach ($items as $item): ?>
                <section class="project-entry">
                    <h3><?php echo $item->title; ?></h3>
                    <p><?php echo $item->description; ?></p>
                    <div>Status: <?php echo $item->status; ?></div>
                    <?php if ($item->projectUrl): ?>
                        <div>Project URL: <?php echo get_link($item->projectUrl); ?></div>
                    <?php endif; ?>
                    <!-- Additional fields as needed -->
                </section>
            <?php endforeach; ?>
        </div>
    </div>
    <?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;
}

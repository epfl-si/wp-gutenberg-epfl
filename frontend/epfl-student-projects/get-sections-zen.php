<?php

use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once (dirname(__FILE__) . '/../lib/utils.php');

header('Content-Type: application/json');

$school = isset($_GET['school']) ? preg_replace('/[^a-zA-Z0-9_\-]/', '', $_GET['school']) : '';

if ($school !== '') {
    $url = "https://project-portal.epfl.ch/api/public/schools/" . urlencode($school) . "/units";
} else {
    $url = "https://project-portal.epfl.ch/api/public/projects/units";
}

$response = Utils::zen_api_request($url);
echo json_encode($response);

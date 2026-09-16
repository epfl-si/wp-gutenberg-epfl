<?php

use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once (dirname(__FILE__) . '/../lib/utils.php');

header('Content-Type: application/json');

$sciper = isset($_GET['sciper']) ? preg_replace('/[^0-9,]/', '', $_GET['sciper']) : '';
$archived = (isset($_GET['archived']) && $_GET['archived'] === '1') ? '/archived' : '';

if ($sciper === '') {
    echo json_encode([]);
    return;
}

$url = "https://project-portal.epfl.ch/api/public/projects/manager/" . $sciper . $archived;

$response = Utils::zen_api_request($url);
echo json_encode($response);

<?php

use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once (dirname(__FILE__) . '/../lib/utils.php');

header('Content-Type: application/json');

$url = "https://project-portal.epfl.ch/api/public/schools";

$response = Utils::zen_api_request($url);
echo json_encode($response);

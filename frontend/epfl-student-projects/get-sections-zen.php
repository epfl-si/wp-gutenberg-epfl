<?php 

use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once __DIR__ . '/../../vendor/autoload.php';
require_once (dirname(__FILE__) . '/../lib/utils.php');

Utils::loadEnv();

$url = $_ENV["API_URL_UNITS"];


$response = Utils::zen_api_request($url);
echo json_encode($response);


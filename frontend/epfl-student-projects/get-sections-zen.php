<?php 

use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once (dirname(__FILE__) . '/../lib/utils.php');


$url = "https://sti-zen.epfl.ch/api/public/projects/units";

$response = Utils::zen_api_request($url);
echo json_encode($response);

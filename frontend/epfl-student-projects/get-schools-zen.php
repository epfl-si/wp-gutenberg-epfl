<?php 

header('Content-Type: application/json');

$url = "https://sti-zen.epfl.ch/api/public/schools";

if (function_exists('curl_init')) {
    require_once (dirname(__FILE__) . '/../lib/utils.php');
    $response = \EPFL\Plugins\Gutenberg\Lib\Utils::zen_api_request($url);
    echo json_encode($response);
} else {
    $context = stream_context_create(['http' => [
        'method' => 'GET',
        'header' => "Content-Type: application/json\r\n"
    ]]);
    $response = file_get_contents($url, false, $context);
    echo $response !== false ? $response : json_encode([]);
}

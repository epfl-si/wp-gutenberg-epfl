<?php 

header('Access-Control-Allow-Origin: *');

// Define the URL of the API endpoint
$url = "https://test-sti-zen.epfl.ch/api/misc/units";

// JWT token
$jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoic3RpX3plbl9hcGkiLCJkaXNwbGF5TmFtZSI6InN0aV96ZW5fYXBpIiwibmFtZSI6eyJmYW1pbHlOYW1lIjoic3RpX3plbl9hcGkifSwidGVxdWlsYSI6eyJ2ZXJzaW9uIjoiMi4xLjgiLCJmaXJzdG5hbWUiOiIiLCJwcm92aWRlciI6IiIsInN0YXR1cyI6Im9rIiwia2V5IjoiZmRrdGk2NnkwM3ViZjRrdjl2b2xqYWFsNDkyZTZmNHIiLCJlbWFpbCI6IiIsImdyb3VwIjoic3RpX3plbl9hcGlfY29uc3VtZXIiLCJ1c2VyIjoic3RpX3plbl9hcGkiLCJyZXF1ZXN0aG9zdCI6IjEwLjk1LjQ4Ljk4IiwiYXV0aHN0cmVuZ3RoIjoiMSIsIm9yZyI6IkVQRkwiLCJ1bmlxdWVpZCI6Ik0wNjU3OCIsIm5hbWUiOiJzdGlfemVuX2FwaSIsImhvc3QiOiIxMjguMTc4LjIzLjE5OCIsImF1dGhvcmlnIjoicGFzc3dvcmQiLCJkaXNwbGF5bmFtZSI6InN0aV96ZW5fYXBpIn19LCJpYXQiOjE3MTQwMzU0MDR9.Kr9E22Zby5zJMatyLneoMsxtTOkH0g9YCFw2Z9yQ4XA';

// Initialize curl
$curl = curl_init();
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_HTTPHEADER, array(
    'Authorization: Bearer ' . $jwt,
    'Content-Type: application/json'
));
curl_setopt($curl, CURLOPT_FRESH_CONNECT, true);
curl_setopt($curl, CURLOPT_COOKIESESSION, true);
curl_setopt($curl, CURLOPT_AUTOREFERER, true);
curl_setopt($curl, CURLOPT_HEADER, false);
curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0");

$response = curl_exec($curl);
if (!$response) {
    die("Connection Failure: " . curl_error($curl));
}

// Output the response
header('Content-Type: application/json');

echo $response;

curl_close($curl);


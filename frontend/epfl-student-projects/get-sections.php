<?php


    header('Access-Control-Allow-Origin: *');

    $url = "https://isa.epfl.ch/services/secretariats";

    // Uncomment for local developing/debugging
    //$url = "https://ditex-web.epfl.ch/services/secretariats";

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_FRESH_CONNECT, true);
    curl_setopt($curl, CURLOPT_COOKIESESSION, true);
    curl_setopt($curl, CURLOPT_AUTOREFERER, true);
    curl_setopt($curl, CURLOPT_HEADER, true);
    curl_setopt($curl, CURLOPT_USERAGENT, "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0");

    
    $response = curl_exec($curl);
    $header_size = curl_getinfo($curl,CURLINFO_HEADER_SIZE);
    $headers = substr($response, 0, $header_size);
    $content = substr($response, $header_size);
    
    // Getting some headers to add to answer
    $matches = array();
    preg_match_all("/Content-(Type|Length):\s.+/", $headers, $matches);

    foreach($matches[0] as $header)
    {
        header(trim($header));
    }
    
    curl_close($curl);

    echo $content;
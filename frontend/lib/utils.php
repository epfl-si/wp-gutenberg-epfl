<?php

namespace EPFL\Plugins\Gutenberg\Lib;

use Dotenv\Dotenv;
Class Utils
{
    protected static $dotenv;

    public static function loadEnv() {
        if (is_null(self::$dotenv)) {
            self::$dotenv = Dotenv::createImmutable(__DIR__ . "/../../");
            self::$dotenv->load();
        }
    }

    public static function debug($var) {
        print "<pre>";
        var_dump($var);
        print "</pre>";
    }

    public static function normalize ($string) {
        $table = array(
            'Š'=>'S', 'š'=>'s', 'Ð'=>'Dj', 'd'=>'dj', 'Ž'=>'Z', 'ž'=>'z', 'C'=>'C', 'c'=>'c', 'C'=>'C', 'c'=>'c',
            'À'=>'A', 'Á'=>'A', 'Â'=>'A', 'Ã'=>'A', 'Ä'=>'A', 'Å'=>'A', 'Æ'=>'A', 'Ç'=>'C', 'È'=>'E', 'É'=>'E',
            'Ê'=>'E', 'Ë'=>'E', 'Ì'=>'I', 'Í'=>'I', 'Î'=>'I', 'Ï'=>'I', 'Ñ'=>'N', 'Ò'=>'O', 'Ó'=>'O', 'Ô'=>'O',
            'Õ'=>'O', 'Ö'=>'O', 'Ø'=>'O', 'Ù'=>'U', 'Ú'=>'U', 'Û'=>'U', 'Ü'=>'U', 'Ý'=>'Y', 'Þ'=>'B', 'ß'=>'Ss',
            'à'=>'a', 'á'=>'a', 'â'=>'a', 'ã'=>'a', 'ä'=>'a', 'å'=>'a', 'æ'=>'a', 'ç'=>'c', 'è'=>'e', 'é'=>'e',
            'ê'=>'e', 'ë'=>'e', 'ì'=>'i', 'í'=>'i', 'î'=>'i', 'ï'=>'i', 'ð'=>'o', 'ñ'=>'n', 'ò'=>'o', 'ó'=>'o',
            'ô'=>'o', 'õ'=>'o', 'ö'=>'o', 'ø'=>'o', 'ù'=>'u', 'ú'=>'u', 'û'=>'u', 'ý'=>'y', 'ý'=>'y', 'þ'=>'b',
            'ÿ'=>'y', 'R'=>'R', 'r'=>'r',
        );

        return strtr($string, $table);
    }

    /**
     * Return a user message, warning type
     */
    public static function render_user_msg($msg) {
        $html = '<div class="alert alert-warning alert-dismissible fade show" role="alert">';
        $html .= '<strong> Warning </strong><p>' . $msg . '</p>';
        $html .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
        $html .= '  <span aria-hidden="true">&times;</span>';
        $html .= '</button>';
        $html .= '</div>';
        return $html;
    }

    /**
     * Return a user message, with customized options
     * $type: can be success, info, warning or danger
     * $is_big: do we want the div to be full sized ?
     */
    public static function render_user_msg_custom($msg, $title, $type, $is_big) {
        $container_class = $is_big ? ' container' : '';

        $html = '<div class="alert alert-' . $type . ' alert-dismissible fade show' . $container_class . '" role="alert">';
        $html .= '<strong class="pl-1">' . $title .'</strong><p class="pl-1">' . $msg . '</p>';
        $html .= '<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
        $html .= '  <span aria-hidden="true">&times;</span>';
        $html .= '</button>';
        $html .= '</div>';
        return $html;
    }

    /**
     * Fetch and save API result in a transient, and in the WP options table as a fallback
     * if the url is not responding anymore
     * This process is deactivated if we are in DEBUG mode
     * @param int $cache_timeout : cache time validity, in seconds
     * @param string $backup_in_options : if a name if given, results is saved in Wordpress options table,
     *                                    in case the url is not responding anymore
     * @param string $cache_name : name given to cache and option entry
     * @return JSON data
     */
    public static function get_items_with_fallback(string $url, int $cache_timeout, string $cache_name) {
        # First, check if we have a transient
        if ( (defined('WP_DEBUG') && WP_DEBUG) || false === ( $data = get_transient( $cache_name ) ) ) {
            # no transient, then try to get some data
            $data = Utils::get_items($url, $cache_timeout, 5, True);

            if ($data === false && !(defined('WP_DEBUG') && WP_DEBUG)) {
                # Remote server is not responding, get the local option and
                # set a transient, so we dont refresh until the $cache_timeout time
                $data_from_option = get_option($cache_name);
                if ($data_from_option === false) {
                    # already no option set ? set transient to nothing
                    set_transient($cache_name, [], $cache_timeout);
                    return;
                } else {
                    # update transient with what we got in option
                    set_transient($cache_name, $data_from_option, $cache_timeout);
                    return $data_from_option;
                }
            } else {
                # Remote server is responding; from the site id, get the data
                if (!empty($data)) {
                    set_transient( $cache_name, $data, $cache_timeout);
                    # persist into options too, as a fallback if remote server get down
                    update_option($cache_name, $data);
                    return $data;
                } else {
                    # nothing or empty result has been returned from the server, reset local entries
                    set_transient( $cache_name, [], $cache_timeout );
                    delete_option($cache_name);
                    return;
                }
            }
        } else {
            # transient is set, use it
            return $data;
        }
    }

    /**
     * Call API
     * @param string $url : the fetchable url
     * @param int $cache_time_sec : Nb of sec during which we have to cache information in transient
     * @param int $timeout :  How long the connection should stay open in seconds. Default 5.
     * @return decoded JSON data
     *          False in case of an error
     */
    public static function get_items(string $url, $cache_time_sec=300, $timeout=5, $sslverify=True) {
        /* Generating unique transient ID. We cannot directly use URL (and replace some characters) because we are
        limited to 172 characters for transient identifiers (https://codex.wordpress.org/Transients_API) */
        $transient_id = 'epfl_'.md5($url);

        /* Caching mechanism is only used when :
         - No user is logged in
         - A user is logged in AND he is in admin panel
         - cache time is greater than 0
         */
        if((!is_user_logged_in() || (is_user_logged_in() && is_admin())) && $cache_time_sec > 0)
        {
            /* If we have an URL call result in DB, */
            if ( false !== ( $data = get_transient($transient_id) ) )
            {
                /* We tell result has been recovered from transient cache  */
                do_action('epfl_stats_webservice_call_duration', $url, 0, true);
                /* We return result */
                return json_decode($data);
            }
        }

        $start = microtime(true);
        $response = wp_remote_get($url, array( 'timeout' => $timeout, 'sslverify' => $sslverify ));
        $end = microtime(true);

        // Logging call
        do_action('epfl_stats_webservice_call_duration', $url, $end-$start);

        if (is_array($response)) {
            $header = $response['headers']; // array of http header lines
            $data = $response['body']; // use the content

            // Check is 'application/json' is in the content type
            // Example of content type: 'application/json;charset=utf-8'
            if (strpos($header["content-type"], 'application/json') === False) {
                error_log("Webservice " . $url . " doesn't seem to be returning JSON");
                return False;
            } else {
                // sometimes, we receive some strange char (seen from people JSON return), like
                // \x1c (file separator in ASCII), so we better clean it
                $data_cleaned = preg_replace('/[[:cntrl:]]/', '', $data);
                $decoded = json_decode($data_cleaned);
                /* If error in decoding, */
                if($decoded === null)
                {
                    error_log("Webservice " . $url . " doesn't returns valid JSON");
                    return false;
                }

                /* If we have to store result in a transient,
                (this time, we don't check if user is logged in or not so futur calls from unlogged users will
                use cache directly)*/
                if($cache_time_sec > 0)
                {
                    set_transient($transient_id, $data, $cache_time_sec);
                }

                return $decoded;

            }
        }

        // in all cases, we have to return something...
        return false;
    }

    /**
     * Makes an HTTP GET request to the specified URL with optional headers.
     * @param string $url The URL to make the request to.
     * @param array $headers Optional headers to include in the request.
     * @return mixed The response body, or false on failure.
     */
    public static function zen_api_request($url) {
        self::loadEnv();

        $jwt = $_ENV['JWT_TOKEN'];
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
            error_log("API request failed: " . curl_error($curl));  // Log error to PHP error log
            curl_close($curl);
            return false;
        }
        curl_close($curl);
        return json_decode($response, true);  // Return decoded JSON response
    }

    /**
     * Sanitize and returns an attribute who's in the given attributes associative array. If not in array,
     * $default val is returned
     */
    public static function get_sanitized_attribute($attributes, $name, $default="")
    {
        return  sanitize_text_field((array_key_exists($name, $attributes))? $attributes[$name]: $default);
    }

    /**
     * Escape and returns an url who's in the given attributes associative array. If not in array,
     * $default val is returned
     */
    public static function get_sanitized_url($attributes, $name, $default="")
    {
        $value = (array_key_exists($name, $attributes))? $attributes[$name]: $default;
        $sanitized_value = preg_replace_callback('(\'|")', function($x) { return htmlentities($x[0], ENT_QUOTES); }, $value);

        $scheme = wp_parse_url($sanitized_value, PHP_URL_SCHEME);

        if (!is_null($scheme) && array_search( $scheme, wp_allowed_protocols()) === false) {
            return '';
        }

        /**
         * Filters a string cleaned and escaped for output as a URL.
         *
         * @since 2.3.0
         *
         * @param string $good_protocol_url The cleaned URL to be returned.
         * @param string $original_url      The URL prior to cleaning.
         * @param string $_context          If 'display', replace ampersands and single quotes only.
         */
         return apply_filters( 'clean_url', $sanitized_value, $value, 'display' );
    }

    /**
     * Tells if an attribute associated with a Richtext field contains somethings.
     * We use "strip_tags" function because if a value has been set and remove by user, Gutenberg let
     * an empty paragraph (<p></p>)
     */
    public static function richtext_content_exists($attributes, $name)
    {
        return isset($attributes[$name]) && strip_tags($attributes[$name]) != "";
    }

    /**
     * When you want to render into a var
     * set $args to get some value for your php file ($path)
     * https://stackoverflow.com/a/34600568
     */
    public static function render_php($path, array $params=null) {
        ob_start();
        include($path);
        $var = ob_get_contents();
        ob_end_clean();
        return $var;
    }
}

<?php
namespace EPFL\Plugins\Gutenberg\InfoscienceSearch;

Class InfoscienceSearchUtils
{
    public static function debug($var) {
        print "<pre>";
        var_dump($var);
        print "</pre>";
    }
}

function get_language() {
    $default_lang = 'en';
    $allowed_langs = array('en', 'fr');
    $language = $default_lang;
    # If Polylang installed
    if(function_exists('pll_current_language')) {
        $current_lang = pll_current_language('slug');
        // Check if current lang is supported. If not, use default lang
        $language = (in_array($current_lang, $allowed_langs)) ? $current_lang : $default_lang;
    }

    return $language;
}

/**
 * Return a user message
 */
function render_user_msg($msg) {
    $html = '<div class="alert alert-warning alert-dismissible fade show" role="alert">';
    $html .= '<strong> Warning </strong>' . $msg;
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
function render_user_msg_custom($msg, $title, $type, $is_big) {
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
 * See https://www.php.net/manual/en/function.parse-str.php, 1st comment
 * Fix this : parse_str('foo=1&foo=2&foo=3'); -> $foo = array('foo' => '3'); but we want
 * $foo = array('foo' => array('1', '2', '3') );
 */
function proper_parse_str($str) {
  # result array
  $arr = array();

  # split on outer delimiter
  $pairs = explode('&', $str);

  # loop through each pair
  foreach ($pairs as $i) {
    # split into name and value
    list($name,$value) = explode('=', $i, 2);

    # if name already exists
    if( isset($arr[$name]) ) {
      # stick multiple values into an array
      if( is_array($arr[$name]) ) {
        $arr[$name][] = $value;
      }
      else {
        $arr[$name] = array($arr[$name], $value);
      }
    }
    # otherwise, simply stick it in a scalar
    else {
      $arr[$name] = $value;
    }
  }

  # return result array
  return $arr;
}

/**
 * Identify the server type with the provided url
 *
 * @param $query array  An parse_url returned object like
 *
 * @return string  If it is identifiable, it returns 'invenio' or 'dspace'. Otherwise an empty string
 */
function find_server_engine_by_url_parameters($query) {
    if ( !empty($query) ) {
        if ( isset($query['query']) ) {
            return 'dspace';
        } elseif ( isset($query['p']) ) {
            return 'invenio';
        }
    }

    return '';
}

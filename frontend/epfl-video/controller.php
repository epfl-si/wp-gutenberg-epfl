<?php

namespace EPFL\Plugins\Gutenberg\Video;

use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/view.php');

/**
 * Follow URl and potential redirect to return "real" video URL
 *
 * @param String $url Video URL, given by user
 *
 * @return String final video URL
 */
function epfl_video_get_final_video_url($url)
{

    /* Generating unique transient ID. We cannot directly use URL (and replace some characters) because we are
    limited to 172 characters for transient identifiers (https://codex.wordpress.org/Transients_API) */
    $transient_id = 'epfl_'.md5($url);

    /* If we have an URL call result in DB, */
    if ( false !== ( $data = get_transient($transient_id) ) )
    {
        /* We return result */
        return $data;
    }

    $ch = curl_init();
    // the url to request
    curl_setopt( $ch, CURLOPT_URL, $url );
    // (don't) verify host ssl cert
    curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, false );
    // (don't) verify peer ssl cert
    curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false );
    // To disable page display when executing curl_exec
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true);

    if ( ($response = curl_exec( $ch ))=== false )	{
        // if we get an error, use that
        error_log("EPFL-video: ".curl_error( $ch ));
        $res = false;
    }
    else // no error
    {

        $redirect_url = curl_getinfo($ch, CURLINFO_REDIRECT_URL);

        // If there's no redirection
        $res = empty(trim($redirect_url))?$url:$redirect_url;
    }
    // close the resource
    curl_close( $ch );

    /* Caching result for 1 week because it won't change a lot  */
    set_transient($transient_id, $res, 3600*24*7);

    return $res;
}


/**
 * Formats an error for display
 *
 * @param String $error String to format as an error message
 *
 * @return String Formated error
 */
function epfl_video_get_error($error)
{
    return '<p><font color="red">'.$error.'</font></p>';
}


/**
 * Handle video rendering
 *
 * @param Array $attributes Parameters given by user in form.
 */
function epfl_video_block( $attributes ) {

  $url = Utils::get_sanitized_attribute( $attributes, 'url' );
  $display_type = Utils::get_sanitized_attribute( $attributes, 'displayType', 'standard' );

  // manage old version of the block, before they are migrated with a page update button click
  $large_display  = Utils::get_sanitized_attribute( $attributes, 'largeDisplay', false )=== '1';

  if ($large_display) {
    $display_type = 'large';
  }

  /* To handle video URL redirection

    NOTE: if we have an URL like 'https://youtu.be/M4Ufs7-FpvU', it will be transformed to
    https://youtube.com/watch?v=M4Ufs7-FpvU&feature=youtu.be
    So, '&feature=youtu.be' will be added at the end and we will have to handle it.
  */
  if(($url = epfl_video_get_final_video_url($url)) === false)
  {
    return epfl_video_get_error(__("EPFL-Video: Error getting final URL", 'epfl-video'));
  }

  /* mediaspaces.epfl.ch need to be converted to api.switch */
  if (preg_match('/(mediaspace\.epfl\.ch)/', $url)===1) {
      $partner_id = '113';
      $uiconf_id = '23448972';
      $url = rtrim($url, '/');  // remove last '/', if any
      $mediaspace_video_id = substr($url, strrpos($url, '/')+1 );

      $markup = epfl_video_kaltura_render(
          $mediaspace_video_id,
          $partner_id,
          $uiconf_id,
          $display_type
      );

      return $markup;
  }

  /* If YouTube video - Allowed formats:
    - https://www.youtube.com/watch?v=Tit6bvRIDtI
    - https://www.youtube.com/watch?v=Tit6bvRIDtI&t=281s
    - https://www.youtube.com/watch?v=M4Ufs7-FpvU&feature=youtu.be
  */
  else if(preg_match('/(youtube\.com|youtu\.be)/', $url)===1 && preg_match('/\/embed\//', $url)===0)
  {

    // if supported delegate the rendering to the theme
    if (!has_action("epfl_video_action"))
    {
        Utils::render_user_msg('You must activate the epfl theme');
    }

      $video_id = '';
      $query_args = [];

    // Check if it is a YouTube Short.
    if ( preg_match( '/\/shorts\/([a-zA-Z0-9_-]+)/', $url, $shorts_matches ) )
    {
        $video_id = $shorts_matches[1];

        $query_str = parse_url( $url, PHP_URL_QUERY );
        if ( $query_str )
        {
            parse_str( $query_str, $query_args );
        }
    }
    else
    {
    	// Standard YouTube URL.
        $query_str = parse_url( $url, PHP_URL_QUERY );
        parse_str( $query_str, $query_args );
        $video_id = isset( $query_args['v'] ) ? $query_args['v'] : '';
        unset( $query_args['v'] );
    }

    if ( empty( $video_id ) )
    {
    	return Utils::render_user_msg( "ID YouTube introuvable" );
    }

    /* If we have a time at which to start video */
    if( isset( $query_args['t'] ) )
    {
        $query_args['start'] = str_replace( 's', '', $query_args['t'] );
        unset( $query_args['t'] );
    }

      // RECONSTRUCTION PROPRE : On ne touche plus à l'ancienne variable $url
    $clean_query = http_build_query( $query_args );
    $url = "https://www.youtube.com/embed/" . $video_id;

    if( !empty( $clean_query ) )
    {
    	$url .= '?' . $clean_query;
    }
  }

  /* if Vimeo video - Allowed formats:
    - https://vimeo.com/escapev/espace
    - https://vimeo.com/escapev/espace#t=10s
    - https://vimeo.com/174044440
    - https://vimeo.com/174044440#t=10s
    - https://vimeo.com/1061975811/18f906c3dd
  */
  else if(preg_match('/vimeo\.com\/([0-9]+)\/?([0-9a-zA-Z]+)?(#t=[0-9]+s)?/', $url, $matches)===1 && preg_match('/\/embed\//', $url)===0)
  {
    $video_id = $matches[1];
    $hash= isset($matches[2]) ? "?h=".$matches[2] : "";
    $start_time = isset($matches[3]) ? $matches[3] : "";
    $url = "https://player.vimeo.com/video/".$video_id.$hash.$start_time;
  }
  // else if video not [youtube, vimeo, Mediaspace] then
  else {
    return Utils::render_user_msg("Embed of video is only possible from Mediaspace, Vimeo or Youtube");
  }

  $markup = epfl_video_render($url, $display_type);
  return $markup;
}

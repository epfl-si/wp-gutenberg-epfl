<?php

namespace EPFL\Plugins\Gutenberg\SocialFeed;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

require_once 'view.php';

define('DEFAULT_HEIGHT', 450);
define('DEFAULT_WIDTH', 374);


function epfl_social_feed_block( $attributes ) {

    $attributes['height']       = Utils::get_sanitized_attribute( $attributes, 'height', DEFAULT_HEIGHT );
    $attributes['width']        = Utils::get_sanitized_attribute( $attributes, 'width', DEFAULT_WIDTH );
    $attributes['twitterLimit'] = Utils::get_sanitized_attribute( $attributes, 'twitterLimit' );
    if(intval($attributes['twitterLimit']) == 0)$attributes['twitterLimit'] = '';
    $attributes['twitterUrl']   = Utils::get_sanitized_url( $attributes, 'twitterUrl' );
    $attributes['instagramUrl'] = Utils::get_sanitized_url( $attributes, 'instagramUrl' );
    $attributes['facebookUrl']  = Utils::get_sanitized_url( $attributes, 'facebookUrl' );

    return epfl_social_feed_view($attributes['twitterUrl'],
                                $attributes['twitterLimit'],
                                $attributes['instagramUrl'],
                                $attributes['facebookUrl'],
                                $attributes['height'],
                                $attributes['width']
                                );
}

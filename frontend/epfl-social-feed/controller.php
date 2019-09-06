<?php

namespace EPFL\Plugins\Gutenberg\SocialFeed;
use \EPFL\Plugins\Gutenberg\Lib\Utils;

require_once(dirname(__FILE__).'/../lib/utils.php');

require_once 'view.php';

define('DEFAULT_HEIGHT', 450);
define('DEFAULT_WIDTH', 374);


function epfl_social_feed_block( $attributes ) {

    $attributes['height']        = Utils::get_sanitized_attribute( $attributes, 'height', DEFAULT_HEIGHT );
    $attributes['width']         = Utils::get_sanitized_attribute( $attributes, 'width', DEFAULT_WIDTH );
    $attributes['twitter_limit'] = Utils::get_sanitized_attribute( $attributes, 'twitter_limit' );
    if(intval($attributes['twitter_limit']) == 0)$attributes['twitter_limit'] = '';
    $attributes['twitter_url']   = Utils::get_sanitized_attribute( $attributes, 'twitter_url' );
    $attributes['instagram_url'] = Utils::get_sanitized_attribute( $attributes, 'instagram_url' );
    $attributes['facebook_url']  = Utils::get_sanitized_attribute( $attributes, 'facebook_url' );

    return epfl_social_feed_view($attributes['twitter_url'],
                                $attributes['twitter_limit'],
                                $attributes['instagram_url'],
                                $attributes['facebook_url'],
                                $attributes['height'],
                                $attributes['width']
                                );
}

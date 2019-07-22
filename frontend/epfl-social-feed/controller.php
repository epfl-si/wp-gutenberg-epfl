<?php

namespace EPFL\Plugins\Gutenberg\SocialFeed;

require_once 'view.php';

define('EPFL\Plugins\Gutenberg\SocialFeed\DEFAULT_HEIGHT', 450);
define('EPFL\Plugins\Gutenberg\SocialFeed\DEFAULT_WIDTH', 374);


function epfl_social_feed_block( $atts ) {
    // extract shortcode parameters
    $atts = shortcode_atts(array(
        'twitter_url'  => '',
        'twitter_limit' => 0,
        'instagram_url'  => '',
        'facebook_url'  => '',
        'height' => DEFAULT_HEIGHT,
        'width' => DEFAULT_WIDTH,
    ), $atts);

    $atts['height'] = empty($atts['height']) ? DEFAULT_HEIGHT : $atts['height'];
    $atts['width'] = empty($atts['width']) ? DEFAULT_WIDTH : $atts['width'];
    $atts['twitter_limit'] = intval($atts['twitter_limit']) == 0 ? '' : $atts['twitter_limit'];

    return epfl_social_feed_view($atts['twitter_url'],
                                $atts['twitter_limit'],
                                $atts['instagram_url'],
                                $atts['facebook_url'],
                                $atts['height'],
                                $atts['width']
                                );
}

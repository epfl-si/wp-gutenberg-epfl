<?php

namespace EPFL\Plugins\Gutenberg\SocialFeed;

require_once(dirname(__FILE__).'/view.php');

define('EPFL\Plugins\Gutenberg\SocialFeed\DEFAULT_HEIGHT', 450);
define('EPFL\Plugins\Gutenberg\SocialFeed\DEFAULT_WIDTH', 374);


function setQueryVars($args, $named_arg, $default='') {
    if (array_key_exists($named_arg, $args) && !empty($args[$named_arg])) {
      set_query_var('epfl_social_feed_'.$named_arg, $args[$named_arg]);
    }
}

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

    setQueryVars($atts['twitter_url'], 'twitter_url');
    setQueryVars($atts['twitter_limit'], 'twitter_limit');
    setQueryVars($atts['instagram_url'], 'instagram_url');
    setQueryVars($atts['facebook_url'], 'facebook_url');
    setQueryVars($atts['height'], 'height');
    setQueryVars($atts['width'], 'width');

    load_template(dirname(__FILE__).'/view.php');

}

<?php

namespace EPFL\Plugins\Gutenberg\InfoscienceSearch;


/**
 * Get banners, depending on the current list, of the used cache, or
 * the list of messages to show
 * @param array $banner_msgs the messages to include in the info/avertissement
 * @param string $language the language in use. Can be 'fr' or others values
 */
function get_banners(
    $banner_msgs,
    $language
) {
    $final_banner = '';
    $title = $language == 'fr' ?
        'Avertissement' :
        'Warning';

    if ( !empty($banner_msgs) ) {
        $final_banner .= render_user_msg_custom(
            "<p> - ".implode('</p><p> - ', $banner_msgs)."</p>",
            $title,
            'info',
            true
        );
    }

    return $final_banner;
}

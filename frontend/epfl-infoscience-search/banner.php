<?php

namespace EPFL\Plugins\Gutenberg\InfoscienceSearch;


/**
 * Get banners, depending on the current list, of the used cache, or
 * the list of messages to show
 */
function get_banners(
    $are_results_obsolete,  // are this Invenio results ?
    $banner_msgs,
    $language
) {
    $final_banner = '';

    if ( !empty($banner_msgs) ) {
        $final_banner .= render_user_msg_custom(
            "<p> - ".implode('</p><p> - ', $banner_msgs)."</p>",
            'Avertissement',
            'info',
            true
        );
    }

    if ( $are_results_obsolete ) {
        $final_banner .= get_banner_msg_long_term_db($language);
    }

    return $final_banner;
}

/**
* When long term cache is in use, we show a specific banner.
*/
function get_banner_msg_long_term_db($language) {
    $link_infoscience = '<a href="https://infoscience.epfl.ch/" target="_blank">Infoscience</a>';

    $link_help = $language == 'fr' ?
        '<a href="https://help-infoscience.epfl.ch/" target="_blank">l\'aide infoscience</a>' :
        '<a href="https://help-infoscience.epfl.ch/" target="_blank">Infoscience help</a>';

    $link_contact = $language == 'fr' ?
        '<a href="mailto:infoscience@epfl.ch" target="_blank">contacter le support</a>' :
        '<a href="mailto:infoscience@epfl.ch" target="_blank">contact support</a>';

    $db_cache_banner_title = $language == 'fr' ?
        'Avertissement' :
        'Warning';

    $db_cache_banner_msg = $language == 'fr' ?
        <<<EODFR
        Veuillez noter que les listes de publications issues d’Infoscience et intégrées sur le site web de l'EPFL, les pages de laboratoires et les pages people sont figées suite au lancement de la nouvelle version de la plateforme.
        Les gestionnaires de ces pages sont invité.es à recréer leur liste de publications depuis $link_infoscience.
        Pour toute assistance, veuillez consulter $link_help ou $link_contact.
        EODFR :
        <<<EODEN
        Please note that the publication lists from Infoscience integrated into the EPFL website, lab or people pages are frozen following the launch of the new version of platform.
        The owners of these pages are invited to recreate their publication list from $link_infoscience.
        For any assistance, please consult the $link_help or $link_contact.
        EODEN;

    return render_user_msg_custom(
        $db_cache_banner_msg,
        $db_cache_banner_title,
        'info',
        true
    );
}

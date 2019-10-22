<?php

namespace EPFL\Plugins\Gutenberg\Scheduler;

use \EPFL\Plugins\Gutenberg\Lib\Utils;

/**
 * Check parameters
 *
 * @param $start_date_time: start date time
 * @param $end_date_time: end date time
 * @return "" if the parameters are populated
 */
function epfl_scheduler_check_parameters( string $start_date_time, string $end_date_time ): string {
    if ( $start_date_time === '') {
        return Utils::render_user_msg("Shortcode epfl-scheduler: Please check the required parameter 'start date time'");
    }
    if ( $end_date_time === '') {
        return Utils::render_user_msg("Shortcode epfl-scheduler: Please check the required parameter 'end date time'");
    }
    return "";
}

function epfl_scheduler_block( $attributes, $inner_content ) {

    // sanitize parameters
    
    $start_date_time = Utils::get_sanitized_attribute( $attributes, 'startDateTime' );
    $end_date_time   = Utils::get_sanitized_attribute( $attributes, 'endDateTime' );

    /*
    var_dump($content);
    var_dump($start_date_time);
    var_dump($end_date_time);
    */

    // check parameters
    $check_parameters = epfl_scheduler_check_parameters( $start_date_time, $end_date_time );
    if ( "" !== $check_parameters ) {
        return $check_parameters;
    }

    date_default_timezone_set('Europe/Paris');

    // convert date string to datetime
    $start_date = strtotime( $start_date_time );
    $end_date = strtotime( $end_date_time );
    $now = time();

    // check if we can  display content
    if ( $now >= $start_date && $now <= $end_date ) {
        return $inner_content;
    }
}

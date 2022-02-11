<?php

namespace EPFL\Plugins\Shortcodes\EPFLStudyPlan;

/*
 * Simple display a "remote_content" shortcode with correct URL and
 * specific <div> around to have wanted width for display
 */
function epfl_study_plan_process_shortcode( $atts, $content = null ) {

    $atts = shortcode_atts( array(
            'plan' => ''
            ), $atts );
    $plan = sanitize_text_field($atts['plan']);
    $url = "https://prod-edu.epfl.ch/export/".$plan;
    ob_start();

?>

<div class="container my-3">[remote_content url="<?PHP echo $url; ?>" ]</div>

<?php

    return do_shortcode(ob_get_clean());
}

add_action( 'init', function() {
  // define the shortcode
  add_shortcode('epfl_study_plan', __NAMESPACE__ . '\epfl_study_plan_process_shortcode');
});
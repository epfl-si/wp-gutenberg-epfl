<?php

function epfl_tableau_render($tableau_name, $width, $height) {

    ob_start();
?>
<div class="container my-3">
    <script type="text/javascript" src="https://tableau.epfl.ch/javascripts/api/viz_v1.js"></script>
    <div class="tableauPlaceholder" style="width: <?php echo esc_attr($width); ?>px; height: <?php echo esc_attr($height); ?>px;">
        <object class="tableauViz" width="<?php echo esc_attr($width); ?>" height="<?php echo esc_attr($height); ?>" style="display:none;">
            <param name="host_url" value="https%3A%2F%2Ftableau.epfl.ch%2F" />
            <param name="embed_code_version" value="3" />
            <param name="site_root" value="" />
            <param name="name" value="<?php echo esc_attr($tableau_name); ?>" />
            <param name="tabs" value="no" />
            <param name="toolbar" value="yes" />
            <param name="showAppBanner" value="false" />
            <param name="filter" value="iframeSizedToWindow=true" />
        </object>
    </div>
</div>
    
<?php
    $content = ob_get_contents();
    ob_end_clean();
    return $content;

}
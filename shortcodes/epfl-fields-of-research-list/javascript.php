<?php
    namespace EPFL\Plugins\Gutenberg\FieldsOfResearchList;
?>

<script type='text/javascript'>
window.onload = function() {  // wait that jQuery is loaded
    jQuery(document).ready(function( $ ) {
        var options = {
            valueNames: [
                'field-of-research-name'
            ]
        };

        var siteList = new List('fields-of-research-list', options);
    });
}
</script>

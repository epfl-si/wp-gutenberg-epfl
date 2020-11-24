<?php
    namespace EPFL\Plugins\Gutenberg\StudentProjects;
?>

<script type='text/javascript'>
window.onload = function() {  // wait that jQuery is loaded
    jQuery(document).ready(function( $ ) {
        let options = {
            valueNames: [
                'title',
                'project-id',
                'professor1-name',
                'project-type',
                'project-description'
            ]
        };
        const studentProjectsList = new List('student-projects-list', options);
    });
}
</script>

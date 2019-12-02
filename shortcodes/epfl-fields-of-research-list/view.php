<?php
    namespace EPFL\Plugins\Gutenberg\FieldsOfResearchList;
?>

<div class="container my-3">
    <div id="fields-of-research-list" class="d-flex flex-column">
        <div class="form-group">
            <input
                type="text"
                id="fields-of-research-input"
                class="form-control search mb-2"
                placeholder="<?php _e('Filter by...', 'epfl') ?>"
                aria-describedby="fields-of-research-help"
            >
        </div>

        <div class="list">
        <?php if (!(empty($fields))): ?>
            <?php foreach($fields as $field): ?>
            <div class="field-of-research-row flex-row d-md-flex pt-1 pb-1 border-bottom align-items-center">
                <div class="field-of-research-name col">
                    <a href="<?php echo esc_attr($field->url); ?>">
                        <?php echo esc_html($field->name); ?>
                    </a>
                </div>
            </div>
            <?php endforeach; ?>
        <?php endif; ?>
        </div>
    </div>
</div>

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

<?php
    namespace EPFL\Plugins\Shortcodes\EPFLPolylexSearch;

    $predefined_type = get_query_var('epfl_lexes-predefined_type');
    $predefined_category = get_query_var('epfl_lexes-predefined_category');
    $predefined_subcategory = get_query_var('epfl_lexes-predefined_subcategory');
    $predefined_search = get_query_var('epfl_lexes-predefined_search');
    $cat_with_sub_tree = get_query_var('epfl_lexes-cat_with_sub_tree');
?>

<script type='text/javascript'>
window.onload = function() {  // wait that jQuery is loaded
    jQuery(document).ready(function( $ ) {
        var options = {
            valueNames: [
                'lex-type',
                'lex-number',
                'lex-title',
                {name: 'lex-category-subcategory', attr: 'data-category-subcategory'},
                'lex-category',
                'lex-subcategory',
                'lex-description',
            ]
        };

        var lexList = new List('lexes-list', options);

        function applyFilters() {
            const selectedCategory = $('#select-category').val();
            const selectedSubcategory = $('#select-subcategory').val();
            const selectedType = $('#select-type').val();

            lexList.filter(function(item) {
                const vals = item.values();

                const categoryValue = vals['lex-category'];
                const subcategoriesValue = vals['lex-subcategory'];
                const typeValue = vals['lex-type'];

                const categoryMask = (selectedCategory === 'all') || (categoryValue === selectedCategory);
                const subcategoryMask = (selectedSubcategory === 'all') || (subcategoriesValue.indexOf(selectedSubcategory) !== -1);
                const typeMask = (selectedType === 'all') || (typeValue === selectedType);

                return categoryMask && subcategoryMask && typeMask;
            });
        }

        function updateQueryStringParam() {
            const url = new URL(window.location.href);

            const params = ['type', 'category', 'subcategory'];

            for (const p of params) {
                const val = document.getElementById(`select-${p}`).value;
                if (val === 'all') {
                    url.searchParams.delete(p);
                } else {
                    url.searchParams.set(p, val);
                }
            }

            window.history.pushState({}, '', url);
        }

        function onFiltersChanged(changedElement) {
            if (changedElement.id === 'select-category') {
                document.getElementById('select-subcategory').value = 'all';
            }
            applyFilters();
            updateQueryStringParam();
        }

        $('#select-category, #select-subcategory, #select-type').on('change', function () {
            onFiltersChanged(this);
        });

        applyFilters();

        <?php if (!empty($predefined_search)): ?>
        $('#lexes-search-input').val("<?php echo $predefined_search ?>");
        lexList.search("<?php echo $predefined_search ?>");
        <?php endif;?>

        // sort at least one time, or it will need to be triggered two times to work
        lexList.sort('lex-number', { order: "asc" });
    });
}
</script>

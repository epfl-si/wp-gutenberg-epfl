<?php
    namespace EPFL\Plugins\Shortcodes\EPFLPolylexSearch;

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
                'lex-number',
                'lex-title',
                {name: 'lex-category-subcategory', attr: 'data-category-subcategory'},
                'lex-category',
                // 'lex-subcategory', // multiple span with the same class, this may not work
                'lex-description',
            ]
        };

        var lexList = new List('lexes-list', options);

        $('#select-category').change(function (e) {
            let filter_on = $(this).val();
            // reset subcategory
            $('#select-subcategory').val('all');

            if (filter_on === 'all') {
                lexList.filter();
            } else {
                lexList.filter(function(item) {
                    let category_value = item.values()['lex-category'];
                    // fix getting values escaped
                    category = $.parseHTML(category_value);

                    if (category && category.length) {
                        category = category[0].textContent;
                        return (category == filter_on);
                    }
                });
            }
        });

        $('#select-subcategory').change(function (e) {
            let filter_on = $(this).val();
            // reset category
            $('#select-category').val('all');

            if (filter_on === 'all') {
                lexList.filter();
            } else {
                lexList.filter(function(item) {
                    // here we can not use
                    let categorySubcategoriesValue = item.values()['lex-category-subcategory'];
                    let categoryValue = item.values()['lex-category'];
                    // fix getting values escaped
                    categorySubcategoriesValue = $.parseHTML(categorySubcategoriesValue);
                    categoryValue = $.parseHTML(categoryValue);

                    //get only subcategories by removing category from the chained string
                    let subcategoriesValue = categorySubcategoriesValue[0].data.replace(new RegExp("^" + categoryValue[0].data, 'i'), "");

                    if (subcategoriesValue && subcategoriesValue.length) {
                        return (subcategoriesValue.indexOf(filter_on) !== -1);
                    }
                });
            }
        });

        <?php if (!empty($predefined_category) && empty($predefined_subcategory)): ?>
        $('#select-category').change();
        <?php endif;?>
        <?php if (!empty($predefined_subcategory)): ?>
        $('#select-subcategory').change();
        <?php endif;?>
        <?php if (!empty($predefined_search)): ?>
        $('#lexes-search-input').val("<?php echo $predefined_search ?>");
        lexList.search("<?php echo $predefined_search ?>");
        <?php endif;?>

        // sort at least one time, or it will need to be triggered two times to work
        lexList.sort('lex-number', { order: "asc" });
    });
}
</script>

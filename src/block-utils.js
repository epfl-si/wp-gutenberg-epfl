// only for WP 5.5+, the category 'common' for the blocks
// does not exists anymore
export const hasCommonCategory = wp.blocks.getCategories().some( function( category ) {
    return category.slug === 'common';
} );

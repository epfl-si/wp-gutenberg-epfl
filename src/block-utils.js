// only for WP 5.5+, the category 'common' for the blocks
// does not exists anymore
export const hasCommonCategory = wp.blocks.getCategories().some(function (category) {
    return category.slug === 'common';
});

/**
 * Add to the attributes parameter a asTootTip field, used for preview render
 * @param attributes
 */
export const getTooltippedAttributes = (attributes) => {
    let toolTipAtt = {
        "asToolTip": {  // used to trigger preview in tooltip view
            type: 'boolean',
            default: false,
        }
    };

    return {...attributes, ...toolTipAtt};
}

/**
 * Set tooltip attribute to trigger block example
 */
export const getTooltippedExample = () => {
    return {
        attributes: {
            'asToolTip': true,
        },
    }
}

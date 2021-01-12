import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import tableIcon from './table-icon'

const version = "v1.1.0";

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    InnerBlocks,
} = wp.blockEditor;

const {
    PanelBody,
    ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

// Template to have only one nested block, a core/table. And we set the 'fixed layout' option to ensure correct display.
const TEMPLATE = [
	['core/table', { hasFixedLayout: true }, [] ]
]

const getAttributes = () => {
    let atts = {
        largeDisplay: {
            type: 'boolean',
            default: false,
        },
        placeHolder: {
            type: 'string',
        },
        tableHeaderOptions: {
            type: 'string',
        },
        filterOnlyOnCols: {
            type: 'string',
        },
        numericSortOnCols: {
            type: 'string',
        },
        biggerFontSize: {
            type: 'boolean',
            default: false,
        },
    };

    return getTooltippedAttributes(atts);
}


registerBlockType( 'epfl/table', {
	title: __( 'EPFL Table', 'epfl'),
    description: __(
        'Create a table',
        'epfl'
    ),
	icon: tableIcon,
    category: hasCommonCategory ? 'common' : 'text',
	attributes: getAttributes(),
    example: getTooltippedExample(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        if ( attributes.asToolTip ) {
            // render the tooltip
            return(
                <Fragment>
                    <img src={ blockThumbnails.table } />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/table-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                    <PanelBody title={ __('Format', 'epfl') }>
                        <ToggleControl
                            label={ __('Large display', 'epfl') }
                            checked={ attributes.largeDisplay }
                            onChange={ largeDisplay => setAttributes( { largeDisplay } ) }
                        />
                        <ToggleControl
                            label={ __('Bigger font size', 'epfl') }
                            checked={ attributes.biggerFontSize }
                            onChange={ biggerFontSize => setAttributes( { biggerFontSize } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <h2 className="epfl-block-title">{ __('Table', 'epfl') }</h2>
                    <InnerBlocks
                        template={ TEMPLATE }
                        templateLock="all"
                       />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return (
                <InnerBlocks.Content />

        );
	},
} );

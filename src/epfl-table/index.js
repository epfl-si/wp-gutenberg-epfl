import { hasCommonCategory } from '../block-utils.js'

import tableIcon from './table-icon'

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
    };

    return atts;
}


registerBlockType( 'epfl/table', {
	title: __( 'EPFL Table', 'epfl'),
	description: 'v1.0.1',
	icon: tableIcon,
    category: hasCommonCategory ? 'common' : 'text',
	attributes: getAttributes(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/table-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <PanelBody title={ __('Format', 'epfl') }>
                        <ToggleControl
                            label={ __('Large display', 'epfl') }
                            checked={ attributes.largeDisplay }
                            onChange={ largeDisplay => setAttributes( { largeDisplay } ) }
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

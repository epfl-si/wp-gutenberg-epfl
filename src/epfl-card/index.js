import cardIcon from './card-icon'
import { TEMPLATE_OPTIONS, TEMPLATE_ONE_ENTRIES, TEMPLATE_TWO_ENTRIES, TEMPLATE  } from './templates'
import { useState } from '@wordpress/element'

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    RichText,
    AlignmentToolbar,
    BlockControls,
    InnerBlocks,
} = wp.editor;

const {
    PanelBody,
    TextControl,
    ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

const ALLOWED_BLOCKS = [];

registerBlockType( 'epfl/card', {
	title: __( 'EPFL Card', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: cardIcon,
	category: 'common',
	attributes: {
        gray_wrapper: {
            type: 'boolean',
            default: false,
        },
        title1: {
            type: 'text',
        },
        link1: {
            type: 'text',
        },
        image1: {
            type: 'text',
            default: null,
        },
        content1: {
            type: 'text',
        }
    },
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;
        const [ template, setTemplate ] = useState( null );

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title='Format'>
                            <ToggleControl
                                label={ __('Wrap with a gray border', 'wp-gutenberg-epfl') }
                                checked={ attributes.gray_wrapper }
                                onChange={ gray_wrapper => setAttributes( { gray_wrapper } ) }
                            />
                    </PanelBody>
                </InspectorControls>
                <div>
                    <InnerBlocks
                        allowedBlocks={ ALLOWED_BLOCKS }
                        template={ TEMPLATE_TWO_ENTRIES }
                        templateLock={ 'all' }
                        // SEE for a sample
                        // https://github.com/WordPress/gutenberg/blob/master/packages/block-library/src/columns/edit.js
                    />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

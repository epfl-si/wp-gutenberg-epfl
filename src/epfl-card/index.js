import cardIcon from './card-icon'
import CardPanel from './card-panel';

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    MediaUpload,
} = wp.editor;

const {
    PanelBody,
    ToggleControl,
} = wp.components;

const { Fragment } = wp.element;


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
        imageId1: {
            type: 'number',
        },
        image1: {
            type: 'text',
            default: null,
        },
        content1: {
            type: 'text',
        },
        title2: {
            type: 'text',
        },
        link2: {
            type: 'text',
        },
        imageId2: {
            type: 'number',
        },
        image2: {
            type: 'text',
            default: null,
        },
        content2: {
            type: 'text',
        },
        title3: {
            type: 'text',
        },
        link3: {
            type: 'text',
        },
        imageId3: {
            type: 'number',
        },
        image3: {
            type: 'text',
            default: null,
        },
        content3: {
            type: 'text',
        },
        title4: {
            type: 'text',
        },
        link4: {
            type: 'text',
        },
        imageId4: {
            type: 'number',
        },
        image4: {
            type: 'text',
            default: null,
        },
        content4: {
            type: 'text',
        },
    },
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;



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
                    <CardPanel { ...{ attributes, setAttributes, index:1 } }  />
                </InspectorControls>
                <div className={ className }>
                    <div id="preview-box">
                        <h2>EPFL Card</h2>
                        <div className="helper">{ __('Please fill the fields in the right-hand column', 'wp-gutenberg-epfl') }</div>
                    </div>
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

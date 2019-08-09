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
            type: 'string',
        },
        link1: {
            type: 'string',
        },
        imageId1: {
            type: 'number',
        },
        image1: {
            type: 'string',
        },
        content1: {
            type: 'string',
        },
        title2: {
            type: 'string',
        },
        link2: {
            type: 'string',
        },
        imageId2: {
            type: 'number',
        },
        image2: {
            type: 'string',
            default: null,
        },
        content2: {
            type: 'string',
        },
        title3: {
            type: 'string',
        },
        link3: {
            type: 'string',
        },
        imageId3: {
            type: 'number',
        },
        image3: {
            type: 'string',
            default: null,
        },
        content3: {
            type: 'string',
        },
        title4: {
            type: 'string',
        },
        link4: {
            type: 'string',
        },
        imageId4: {
            type: 'number',
        },
        image4: {
            type: 'string',
            default: null,
        },
        content4: {
            type: 'string',
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
                    {[...Array(3)].map((x, i) =>
                        <CardPanel key={i+1} { ...{ attributes, setAttributes, index:i+1 } }  />
                    )}
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

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

const maxCards = 3;

const getAttributes = () => {
    let atts = {};

    for (var i = 1; i <= maxCards; i++) {
        atts['title'+i] = {
			type: 'string',
        };
        atts['link'+i] = {
			type: 'string',
        };
        atts['imageId'+i] = {
			type: 'number',
        };
        atts['image'+i] = {
            type: 'string',
            default: null
        };
        atts['content'+i] = {
			type: 'string',
        };
    }

    return atts;
}

registerBlockType( 'epfl/card', {
	title: __( 'EPFL Card', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: cardIcon,
	category: 'common',
	attributes: getAttributes(),
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
                    {[...Array(maxCards)].map((x, i) =>
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

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.editor;

const {
    PanelBody,
    TextControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/map', {
	title: __( 'EPFL Map', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: 'admin-site-alt',
	category: 'common',
	attributes: {
		query: {
			type: 'string',
		},
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
		const { attributes, className, setAttributes } = props
	    return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={ __('What information do you want to display?', 'wp-gutenberg-epfl') }>
                        <TextControl
                            value={ attributes.query }
                            onChange={ query => setAttributes( { query } ) }
                            help={ __('A room for example: INN011', 'wp-gutenberg-epfl') }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <div id="preview-box">
                        <h2>EPFL MAP</h2>
                        <div class="helper">{ __('Please fill the fields in the right-hand column', 'wp-gutenberg-epfl') }</div>
                    </div>
                </div>
            </Fragment>
		)		
	},
	save: ( props ) => {
		return null;
	},
} );
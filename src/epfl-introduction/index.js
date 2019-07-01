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
    TextareaControl,
    ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/introduction', {
	title: __( 'EPFL Introduction', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: 'text',
	category: 'common',
	attributes: {
		title: {
			type: 'string',
        },
        content: {
			type: 'string',
        },
        gray: {
            type: 'boolean',
            default: false,
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
                    <PanelBody title={ __('Title', 'wp-gutenberg-epfl') }>
                        <TextControl
                            value={ attributes.title }
                            onChange={ title => setAttributes( { title } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __('Content', 'wp-gutenberg-epfl') }>
                        <TextareaControl
                            value={ attributes.content }
                            onChange={ content => setAttributes( { content } ) }
                        />
                        <ToggleControl
                            label={ __('Change the background to gray', 'wp-gutenberg-epfl') }
                            checked={ attributes.gray }
                            onChange={ () => setAttributes( { gray: ! attributes.gray } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <div id="preview-box">
                        <h2>EPFL INTRODUCTION</h2>
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
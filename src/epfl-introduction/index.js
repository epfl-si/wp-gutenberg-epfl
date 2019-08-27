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
			<InspectorControls><hr/>
				<ToggleControl
					label={ __('Change the background to gray', 'wp-gutenberg-epfl') }
					checked={ attributes.gray }
					onChange={ () => setAttributes( { gray: ! attributes.gray } ) }
				/>
			</InspectorControls>
	            <div className={ className }>
	                <h2>EPFL INTRODUCTION</h2>
                    <TextControl
						label={ __('Title', 'wp-gutenberg-epfl') }
                        value={ attributes.title }
                        onChange={ title => setAttributes( { title } ) }
                    />
                    <TextareaControl
						label={ __('Content', 'wp-gutenberg-epfl') }
						value={ attributes.content }
                        onChange={ content => setAttributes( { content } ) }
                    />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

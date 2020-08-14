const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
	RichText,
} = wp.editor;

const {
    PanelBody,
    TextControl,
    TextareaControl,
    ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/introduction', {
	title: __( 'EPFL Introduction', 'epfl'),
	description: 'v1.0.4',
	icon: 'text',
	category: 'common',
	attributes: {
		title: {
			type: 'string',
        },
        content: {
			type: 'string',
        },
        grayBackground: {
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
				<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/introduction-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
				<hr/>
				<ToggleControl
					label={ __('Change the background to gray', 'epfl') }
					checked={ attributes.grayBackground }
					onChange={ () => setAttributes( { grayBackground: ! attributes.grayBackground } ) }
				/>
			</InspectorControls>
	            <div className={ className }>
	                <h2>EPFL INTRODUCTION</h2>
                    <TextControl
						label={ __('Title', 'epfl') }
                        value={ attributes.title }
                        onChange={ title => setAttributes( { title } ) }
                    />
					<label><small>{ __('Content', 'epfl') }</small></label>
                    <RichText
						value={ attributes.content }
						multiline="p"
						onChange={ content => setAttributes( { content } ) }
						placeholder={ __('Write your text here','epfl')}
						keepPlaceholderOnFocus = { true }
                    />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

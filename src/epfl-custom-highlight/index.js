import customHighlightIcon from './custom-highlight-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	MediaUpload,
	InspectorControls,
} = wp.editor;

const {
	PanelBody,
	TextControl,
	TextareaControl,
	RadioControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/custom-highlight', {
	title: __( 'EPFL Custom Highlight', 'wp-gutenberg-epfl'),
	description: 'v1.0.1',
	icon: customHighlightIcon,
	category: 'common',
	attributes: {
		title: {
			type: 'string',
		},
		description: {
			type: 'string',
		},
		link: {
			type: 'string',
		},
		buttonLabel: {
			type: 'string',
		},
		imageId: {
			type: 'number',
		},
		imageUrl: {
			type: 'string',
		},
		layout: {
			type: 'string',
			default: 'right',
		},

	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
		const { attributes, className, setAttributes } = props

		function onImageSelect(imageObject) {
			setAttributes({
				imageId: imageObject.id,
				imageUrl: imageObject.url
			})
		}

		let optionsLayoutList = [
		{ value: 'right', label: __('Right', 'wp-gutenberg-epfl')},
		{ value: 'bottom', label: __('Bottom', 'wp-gutenberg-epfl')},
		{ value: 'left', label: __('Left', 'wp-gutenberg-epfl')},
		];

		return (
		<Fragment>
			<InspectorControls>
				<p><a class="wp-block-help" href={ __('https://www.epfl.ch/campus/services/custom-highlight-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
				<hr/>
				<RadioControl
					label={ __("Select a layout", 'wp-gutenberg-epfl') }
					selected={ attributes.layout }
					options={ optionsLayoutList }
					onChange={ layout => setAttributes( { layout } ) }
				/>
			</InspectorControls>
			<div className={ className }>
				<h2>EPFL Custom Highlight</h2>
				<TextControl
					label={ __('Title', 'wp-gutenberg-epfl')}
					value={ attributes.title }
					onChange={ title => setAttributes( { title } ) }
				/>
				<TextareaControl
					label={ __('Description', 'wp-gutenberg-epfl')}
					value={ attributes.description }
					onChange={ description => setAttributes( { description } ) }
				/>
				<TextControl
					label={ __('Link', 'wp-gutenberg-epfl') }
					value={ attributes.link }
					onChange={ link => setAttributes( { link } ) }
				/>
				<TextControl
					label={ __('Button label', 'wp-gutenberg-epfl') }
					value={ attributes.buttonLabel }
					onChange={ buttonLabel => setAttributes( { buttonLabel } ) }
				/>
				<MediaUpload
					label={ __('Select Image', 'wp-gutenberg-epfl') }
					onSelect={onImageSelect}
					type="image"
					value={attributes.imageId}
					render={({ open }) => (
				<div class="components-base-control">
					<img style={ {maxHeight: '200px'} } src={ attributes.imageUrl } />
					<button onClick={open}>
						{ __('Select Image', 'wp-gutenberg-epfl') }
					</button>
					<div style={ {marginTop: '5px'} }>{ __('Please select an image. Recommended image size: 1920x1080', 'wp-gutenberg-epfl') }</div>
				</div>
				)}
				/>
			</div>
		</Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

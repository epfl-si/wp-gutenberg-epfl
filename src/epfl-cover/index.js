import './style.scss'

import coverIcon from './cover-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	MediaUpload,
	InspectorControls,
} = wp.editor;

const {
	TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/cover', {
	title: __( 'EPFL Cover', 'wp-gutenberg-epfl'),
	description: 'v1.0.1',
	icon: coverIcon,
	category: 'common',
	attributes: {
		imageId: {
			type: 'number',
		},
		imageUrl: {
			type: 'string',
		},
		description : {
			type: 'string',
		}
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {

		const { attributes, className, setAttributes } = props

		function onImageSelect(imageObject) {
            setAttributes({
				imageUrl: imageObject.url,
				imageId: imageObject.id
			})
		}

		return (
		<Fragment>
			<InspectorControls>
				<p><a class="wp-block-help" href={ __('https://www.epfl.ch/campus/services/cover-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
			</InspectorControls>
			<div className={ className }>
				<h2>EPFL Cover</h2>
				<MediaUpload
					onSelect={onImageSelect}
					type="image"
					value={attributes.imageId}
					render={({ open }) => (
						<div>
							<img style={ {maxHeight: '200px'} } src={ attributes.imageUrl } />
							<button onClick={open}>
							{ __('Select Image', 'wp-gutenberg-epfl') }
							</button>
							<div style={ {marginTop: '5px'} }>{ __('Please select an image. Recommended image size: 1920x1080', 'wp-gutenberg-epfl') }</div>
						</div>
					)}
				/>
				<hr/>
				<TextareaControl
					label={ __('Description', 'wp-gutenberg-epfl')}
					value={ attributes.description }
					onChange={ description => setAttributes( { description } ) }
					help={ __('This description appears when the user clicks on the information icon', 'wp-gutenberg-epfl') }
				/>
			</div>
		</Fragment>
		)

	},
	save: ( props ) => {
		return null;
	},
} );

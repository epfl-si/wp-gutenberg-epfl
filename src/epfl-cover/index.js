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
    PanelBody,
    TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

function getImageURL(attributes) {
	let url = "https://via.placeholder.com/1920x1080.jpg";
	if (attributes.image) {
		url = attributes.image;
	}
	return url;
}

registerBlockType( 'epfl/cover', {
	title: __( 'EPFL Cover', 'wp-gutenberg-epfl'),
	description: __('Display a EPFL cover element', 'wp-gutenberg-epfl'),
	icon: coverIcon,
	category: 'common',
	attributes: {
		image: {
			type: 'string',
			default: null,
		}, 
		description : {
			type: 'string',
			default: '',
		}
	},
	edit: ( props ) => {
		
		const { setAttributes, attributes } = props;

		function onImageSelect(imageObject) {
			setAttributes({
				image: imageObject.sizes.full.url
			})
		}

		let url = getImageURL(attributes);

		return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __('Image', 'wp-gutenberg-epfl') }>
					<strong>Select a background image:</strong>
					<MediaUpload
						onSelect={onImageSelect}
						type="image"
						value={attributes.image}
						render={({ open }) => (
							<button onClick={open}>
								Upload Image!
							</button>
						)}
					/>
				</PanelBody>
				<PanelBody title={ __('Description', 'wp-gutenberg-epfl') }>
					<TextareaControl
						label="Description"
						help="Enter some text"
						value={ attributes.description }
						onChange={ description => setAttributes( { description } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div>
				<figure className="cover">
					<picture>
						<img src={ url } className="img-fluid" alt="Cover description" />
					</picture>
				</figure>
			</div>
		</Fragment>
		)
		
	},
	save: ( props ) => {
		const { attributes } = props;
		let url = getImageURL(attributes);
		return (
			<div class="container my-3">
				<figure className="cover">
  					<picture>
    					<img src={ url } className="img-fluid" alt="Cover description" />
  					</picture>
  					<figcaption>
    					<button aria-hidden="true" type="button" className="btn-circle" data-toggle="popover" data-content={ attributes.description }>
							<svg className="icon" aria-hidden="true">
								<use href="#icon-info" />
							</svg>
							<svg className="icon icon-rotate-90" aria-hidden="true">
								<use href="#icon-chevron-right" />
							</svg>
    					</button>
						<p className="sr-only">{ attributes.description }</p>
					</figcaption>
				</figure>
			</div>
		)
	},
} );
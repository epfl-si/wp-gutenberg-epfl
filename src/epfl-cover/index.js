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
	description: __('Display a EPFL cover', 'wp-gutenberg-epfl'),
	icon: coverIcon,
	category: 'common',
	attributes: {
		imageId: {
			type: 'string',
		},
		image: {
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
				image: imageObject.sizes.full.url,
				imageId: imageObject.id
			})
		}

		let url = getImageURL(attributes);

		return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __('Select Image', 'wp-gutenberg-epfl') }>
					<MediaUpload
						onSelect={onImageSelect}
						type="image"
						value={attributes.image}
						render={({ open }) => (
                            <div>
							    <button onClick={open}>
								{ __('Upload Image!', 'wp-gutenberg-epfl') }
							    </button>
                                <div style={ {marginTop: '5px'} }>{ __('Recommended image size: 1920x1080', 'wp-gutenberg-epfl') }</div>
                            </div>
						)}
					/>
				</PanelBody>
				<PanelBody title={ __('Description', 'wp-gutenberg-epfl') }>
					<TextareaControl
						help={ __('This description appears when the user clicks on the information icon', 'wp-gutenberg-epfl') }
						value={ attributes.description }
						onChange={ description => setAttributes( { description } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={ className }>
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
		</Fragment>
		)
		
	},
	save: ( props ) => {
		return null;
	},
} );
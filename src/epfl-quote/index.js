import './style.scss'

import quoteIcon from './quote-icon'

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
    TextControl,
} = wp.components;

const { Fragment } = wp.element;

function getImageURL(attributes) {
	let url = "https://via.placeholder.com/1920x1080.jpg";
	if (attributes.image) {
		url = attributes.image;
	}
	return url;
}

registerBlockType( 'epfl/quote', {
	title: __( 'EPFL Quote', 'wp-gutenberg-epfl'),
	description: __('Display a EPFL quote', 'wp-gutenberg-epfl'),
	icon: quoteIcon,
	category: 'common',
	attributes: {
		imageId: {
			type: 'string',
		},
		image: {
			type: 'string',
		}, 
		quote : {
			type: 'string',
        },
        cite : {
			type: 'string',
        },
        footer : {
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
                                <div style={ {marginTop: '5px'} }>{ __('Please, select a square image', 'wp-gutenberg-epfl') }</div>
                            </div>
						)}
					/>
				</PanelBody>
				<PanelBody title={ __('Quote', 'wp-gutenberg-epfl') }>
					<TextareaControl
						value={ attributes.quote }
						onChange={ quote => setAttributes( { quote } ) }
					/>
				</PanelBody>
                <PanelBody title={ __('Source or Reference', 'wp-gutenberg-epfl') }>
					<TextControl
						value={ attributes.cite }
						onChange={ cite => setAttributes( { cite } ) }
					/>
				</PanelBody>
                <PanelBody title={ __('Footer', 'wp-gutenberg-epfl') }>
					<TextControl
						value={ attributes.footer }
						onChange={ footer => setAttributes( { footer } ) }
					/>
				</PanelBody>
			</InspectorControls>
            {/*
			<div className={ className }>
                <div className="row my-3">
                    <div className="col-6 offset-3 col-sm-4 offset-sm-4 col-md-2 offset-md-0 text-center text-md-right">
                        <picture>
                            <img width="300" height="300" className="img-fluid rounded-circle" src={ url } className="img-fluid" alt={ attributes.quote } />
                        </picture>
                    </div>
                    <blockquote className="blockquote mt-3 col-md-10 border-0">
                        <p class="mb-0">{ attributes.quote }</p>
                        <footer class="blockquote-footer"><cite title={ attributes.cite }>{ attributes.cite }</cite>, { attributes.footer } </footer>
                    </blockquote>
                </div>
            </div>
            */}
            <div className={ className }>
                <div id="preview-box">
                    <h2>EPFL QUOTE</h2>
                    <div class="helper">Merci de renseigner les champs présents dans la colonne de droite</div>
                </div>
			</div>
		</Fragment>
		)
		
	},
	save: ( props ) => {
		return null;
	},
} );
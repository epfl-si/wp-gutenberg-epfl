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

registerBlockType( 'epfl/quote', {
	title: __( 'EPFL Quote', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: quoteIcon,
	category: 'common',
	attributes: {
		imageId: {
			type: 'number',
        },
        imageUrl: {
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
                imageId: imageObject.id,
                imageUrl: imageObject.url
			})
        }
        
		return (
		<Fragment>
			<InspectorControls>
                <PanelBody title={ __('Select Image', 'wp-gutenberg-epfl') }>
                    <MediaUpload
                        onSelect={onImageSelect}
                        type="image"
                        value={attributes.imageId}
                        render={({ open }) => (
                            <div>
                                <img style={ {maxHeight: '200px'} } src={ attributes.imageUrl } />
                                <button onClick={open}>
                                    { __('Upload Image', 'wp-gutenberg-epfl') }
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
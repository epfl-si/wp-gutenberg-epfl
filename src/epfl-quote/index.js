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
	description: 'v1.0.2',
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
        author : {
			type: 'string',
        },
        position : {
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
				<p><a class="wp-block-help" href={ __('https://www.epfl.ch/campus/services/quote-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
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
                        <footer class="blockquote-footer"><cite title={ attributes.author }>{ attributes.author }</cite>, { attributes.position } </footer>
                    </blockquote>
                </div>
            </div>
            */}
            <div className={ className }>
                <h2>EPFL QUOTE</h2>
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
                                <div style={ {marginTop: '5px'} }>{ __('Please select a square image', 'wp-gutenberg-epfl') }</div>
                            </div>
                        )}
                    />
					<TextareaControl
						label={ __('Quote', 'wp-gutenberg-epfl') }
						value={ attributes.quote }
						onChange={ quote => setAttributes( { quote } ) }
					/>
					<TextControl
						label={ __('Author', 'wp-gutenberg-epfl') }
						value={ attributes.author }
						onChange={ author => setAttributes( { author } ) }
					/>
					<TextControl
						label={ __('Position', 'wp-gutenberg-epfl') }
						value={ attributes.position }
						onChange={ position => setAttributes( { position } ) }
					/>
			</div>
		</Fragment>
		)

	},
	save: ( props ) => {
		return null;
	},
} );

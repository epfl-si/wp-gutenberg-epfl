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
    Placeholder,
    IconButton,
	TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/cover', {
	title: __( 'EPFL Cover', 'wp-gutenberg-epfl'),
	description: 'v1.0.2',
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
        
        function onRemoveImage() {
            props.setAttributes({
              imageId: null,
              imageUrl: null,
            })
        }

		return (
		<Fragment>
			<InspectorControls>
				<p><a class="wp-block-help" href={ __('https://www.epfl.ch/campus/services/cover-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
			</InspectorControls>
			<div className={ className }>
				<h2>EPFL Cover</h2>
				{ ! attributes.imageId ? (
                    <MediaUpload
                        onSelect={ onImageSelect }
                        type="image"
                        value={ attributes.imageId }
                        render={ ( { open } ) => (
                            <Placeholder
                                icon="images-alt"
                                label={ __("Image", 'wp-gutenberg-epfl') }
                                instructions={ __('Please, select a image', 'wp-gutenberg-epfl') }
                            >
                                <IconButton
                                    className="components-icon-button wp-block-image__upload-button button button-large"
                                    onClick={ open }
                                    icon="upload"
                                >
                                    { __('Upload', 'wp-gutenberg-epfl') }
                                </IconButton>
                            </Placeholder>
                        )}
                        />
                       ) : (
                        <p className="epfl-uploader-image-wrapper">
                        <img
                          src={ attributes.imageUrl }
                          alt={ attributes.imageUrl }
                          class="epfl-uploader-img"
                        />
          
                        { props.isSelected && (
          
                        <IconButton
                            className="epfl-uploader-remove-image"
                            onClick={ onRemoveImage }
                            icon="dismiss"
                        >
                            { __('Remove image', 'wp-gutenberg-epfl') }
                        </IconButton>

                        ) }
                      </p>
                )}
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

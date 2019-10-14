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
    PanelBody,
    TextControl,
    TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/hero', {
	title: __( 'EPFL Hero', 'wp-gutenberg-epfl'),
	description: 'v1.0.2',
	icon: 'id',
	category: 'common',
	attributes: {
		title: {
			type: 'string',
        },
        text: {
			type: 'string',
        },
        imageUrl: {
            type: 'string',
        },
        imageId: {
            type: 'number',
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

        function onRemoveImage() {
            props.setAttributes({
              imageId: null,
              imageUrl: null,
            })
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/hero-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
                </InspectorControls>
                <div className={ className }>
                        <h2>EPFL Hero</h2>
                        <TextControl
                            label={ __('Title','wp-gutenberg-epfl')}
                            value={ attributes.title }
                            onChange={ title => setAttributes( { title } ) }
                        />
                        <hr/>
                        <TextareaControl
                            label={ __('Text', 'wp-gutenberg-epfl')}
                            value={ attributes.text }
                            onChange={ text => setAttributes( { text } ) }
                        />
                        <hr/>
                        { ! attributes.imageId ? (
                    <MediaUpload
                        onSelect={ onImageSelect }
                        type="image"
                        value={ attributes.imageId }
                        render={ ( { open } ) => (
                            <Placeholder
                                icon="images-alt"
                                label={ __("Image", 'wp-gutenberg-epfl') }
                                instructions={ __('Please, select an image', 'wp-gutenberg-epfl') }
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
                          className="epfl-uploader-img"
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
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

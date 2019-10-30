import cardIcon from './card-icon'

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    MediaUpload,
    InnerBlocks,
} = wp.editor;

const {
    TextControl,
    Placeholder,
    IconButton,
} = wp.components;

const { Fragment } = wp.element;

const getAttributes = () => {
    let atts = {
            title: {
                type: 'string'
            },
            link: {
                type: 'string'
            },
            imageId: {
                type: 'integer'
            },
            imageUrl: {
                type: 'string'
            },
            content: {
                type: 'string'
            }
        };

    return atts;
}

registerBlockType( 'epfl/card-panel', {
	title: __( 'EPFL Card Panel', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: cardIcon,
    category: 'common',
    parent: ['epfl/card'],
	attributes: getAttributes(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        let isSelected = ! attributes.imageId || ! attributes.imageUrl;

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
                <div className={ className }>
                    <h4>{ __('Card', 'wp-gutenberg-epfl') }</h4>
                    <TextControl
                        label={ __('Title (mandatory)', 'wp-gutenberg-epfl') }
                        value={ attributes.title }
                        onChange={ title => setAttributes( { title } ) }
                    />
                    <TextControl
                        label={ __('Link', 'wp-gutenberg-epfl') }
                        value={ attributes.link }
                        onChange={ link => setAttributes( { link } ) }
                    />
                    { isSelected ? (
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

                            { props.attributes.imageUrl && (

                            <IconButton
                                className={'epfl-uploader-remove-image'}
                                onClick={ onRemoveImage }
                                icon="dismiss"
                            >
                                { __('Remove image', 'wp-gutenberg-epfl') }
                            </IconButton>

                            ) }
                            </p>
                        )}
                    <label><small>Text</small></label>
                    <InnerBlocks templateLock= { false } /> 
                    
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return ( <InnerBlocks.Content /> );
	},
} );

import miniCardIcon from './mini-card-icon'

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
    Button,
    ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

const getAttributes = () => {
    let atts = {
            link: {
                type: 'string'
            },
            imageId: {
                type: 'integer'
            },
            imageUrl: {
                type: 'string'
            },
            legend: {
                type: 'string'
            },
            openLinkNewTab: {
                type: 'boolean',
                default: false,
            }
        };

    return atts;
}

registerBlockType( 'epfl/mini-card-panel', {
	title: __( 'EPFL Mini Card', 'epfl'),
	description: 'v1.0.0',
	icon: miniCardIcon,
    category: 'common',
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
                    <h4>{ __('Mini card', 'epfl') }</h4>

                    <TextControl
                        label={ __('Link', 'epfl') }
                        value={ attributes.link }
                        onChange={ link => setAttributes( { link } ) }
                    />
                    <ToggleControl
                            label={ __('Open link in a new tab', 'epfl') }
                            checked={ attributes.openLinkNewTab  }
                            onChange={ openLinkNewTab  => setAttributes( { openLinkNewTab  } ) }
                    />

                    { isSelected ? (
                        <MediaUpload
                            onSelect={ onImageSelect }
                            type="image"
                            value={ attributes.imageId }
                            render={ ( { open } ) => (
                                <Placeholder
                                    icon="images-alt"
                                    label={ __("Image", 'epfl') }
                                    instructions={ __('Please, select an image', 'epfl') }
                                >
                                    <Button
                                        className="components-button.has-icon wp-block-image__upload-button button button-large"
                                        onClick={ open }
                                        icon="upload"
                                    >
                                        { __('Upload', 'epfl') }
                                    </Button>
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

                            <Button
                                className={'epfl-uploader-remove-image'}
                                onClick={ onRemoveImage }
                                icon="dismiss"
                            >
                                { __('Remove image', 'epfl') }
                            </Button>

                            ) }
                            </p>
                        )}
                    <TextControl
                        label={ __('Legend', 'epfl') }
                        value={ attributes.legend }
                        onChange={ legend => setAttributes( { legend } ) }
                    />

                </div>
            </Fragment>
		)
	},
	save: ( props ) => {

		return null;
	},
} );

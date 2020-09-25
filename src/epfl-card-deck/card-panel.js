import { image } from '@wordpress/icons';

import cardIcon from './card-icon'

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    MediaUpload,
    InnerBlocks,
} = wp.blockEditor;

const {
    TextControl,
    Placeholder,
    Button,
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
	title: __( 'EPFL Card Panel', 'epfl'),
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
                    <h4>{ __('Card', 'epfl') }</h4>
                    <TextControl
                        label={ __('Title (mandatory)', 'epfl') }
                        value={ attributes.title }
                        onChange={ title => setAttributes( { title } ) }
                    />
                    <TextControl
                        label={ __('Link', 'epfl') }
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
                                    icon={ image }
                                    label={ __("Image", 'epfl') }
                                >
                                    <Button
                                        onClick={ open }
                                        isPrimary={ true }
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
                    <label><small>Text</small></label>
                    <InnerBlocks />

                </div>
            </Fragment>
		)
	},
	save: ( props ) => {

		return (<InnerBlocks.Content /> );
	},
} );

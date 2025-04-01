import { image } from '@wordpress/icons';

import sponsorIcon from './sponsor-icon'

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
            name: {
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

registerBlockType( 'epfl/sponsor-panel', {
    title: __( 'EPFL Sponsor Panel', 'epfl'),
    description: 'v1.0.0',
    icon: sponsorIcon,
    category: 'common',
    parent: ['epfl/sponsor'],
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
                    <h4>{ __('Sponsor', 'epfl') }</h4>
                    <TextControl
                        label={ __('Sponsor name (mandatory)', 'epfl') }
                        value={ attributes.name }
                        onChange={ name => setAttributes( { name } ) }
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
                                    instructions={ __("The image containing the logo must be in 16:9 format. Otherwise, it will be cropped.", 'epfl') }
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
                        ) }
                </div>
            </Fragment>
        )
    },
    save: ( props ) => {

        return (<InnerBlocks.Content /> );
    },
} );

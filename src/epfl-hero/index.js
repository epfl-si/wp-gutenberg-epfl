import { image } from "@wordpress/icons";

import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

const version = "v1.3.0";

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
    MediaUpload,
    InspectorControls,
    RichText,
} = wp.blockEditor;

const {
    Placeholder,
    Button,
    PanelBody,
    TextControl,
    TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/hero', {
	title: __( 'EPFL Hero', 'epfl'),
    description: __(
        'Create an introductory block with a full-width pretext image, a title and a short description. The page title is not displayed.',
        'epfl'
    ),
	icon: 'id',
    category: hasCommonCategory ? 'common' : 'design',
	attributes: getTooltippedAttributes({
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
    description : {
      type: 'string',
    },
    videoUrl: {
      type: 'string',
    }
	}),
    example: getTooltippedExample(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props

        if ( attributes.asToolTip ) {
            // render the tooltip
            return (
                <Fragment>
                    <img src={ blockThumbnails.hero } />
                </Fragment>
            );
        }

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
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/hero-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                </InspectorControls>
                <div className={ className }>
                        <h2 className="epfl-block-title">{ __('EPFL Hero', 'epfl') }</h2>
                        <TextControl
                            label={ __('Title','epfl')}
                            value={ attributes.title }
                            onChange={ title => setAttributes( { title } ) }
                        />
                        <hr/>
                        <RichText
                            label={ __('Text', 'epfl')}
                            value={ attributes.text }
                            onChange={ text => setAttributes( { text } ) }
                            placeholder={ __('Write your text here','epfl')}
                            // has we transited this component from a TextAreaControl
                            // setting multiline to something will make the old content unreadable
                            // false -> use <br>
                            multiline={ false }
                        />
                        <hr/>
                        <TextControl
                            label={__('URL of the video', 'epfl')}
                            value={ attributes.videoUrl }
                            onChange={ videoUrl => setAttributes( { videoUrl } ) }
                            help={ __('You can paste a Vimeo URL like https://vimeo.com/339972923', 'epfl') }
                        />
                        <hr/>
                        { ! attributes.imageId ? (
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

                        { props.isSelected && (

                        <Button
                            className="epfl-uploader-remove-image"
                            onClick={ onRemoveImage }
                            icon="dismiss"
                        >
                            { __('Remove image', 'epfl') }
                        </Button>

                        ) }
                      </p>
                )}
                <hr/>
                <TextareaControl
                  label={ __('Description', 'epfl')}
                  value={ attributes.description }
                  onChange={ description => setAttributes( { description } ) }
                  help={ __('This description appears when the user clicks on the information icon', 'epfl') }
                />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

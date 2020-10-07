import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import { image } from "@wordpress/icons";

import carouselIcon from './carousel-icon'

const version = "v1.0.2";

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
    MediaUpload,
	InspectorControls,
} = wp.blockEditor;

const {
    PanelBody,
    ToggleControl,
    TextControl,
    Placeholder,
    Button,
} = wp.components;

const { Fragment } = wp.element;

const maxElements = 5;

const getAttributes = () => {
    let atts = {
        'openLinksNewTab': {
            type: 'boolean',
            default: false,
        }
	};

    for (var i = 1; i <= maxElements; i++) {
        atts['title'+i] = {
			type: 'string',
        };
        atts['description'+i] = {
			type: 'string',
        };
        atts['url'+i] = {
			type: 'string',
        };
        atts['imageId'+i] = {
			type: 'integer',
        };
        atts['imageUrl'+i] = {
            type: 'string',
        };
    }

    return getTooltippedAttributes(atts);
}

function CarouselPanel ( props ) {
    const { attributes, setAttributes, index } = props;

    const setIndexedAttributes = (field_name, value) => {
        setAttributes({[`${field_name}${index}`]: value});
     };

    const onImageSelect = (imageObject) => {
        setAttributes({
            [`imageUrl${index}`]: imageObject.sizes.full.url,
            [`imageId${index}`]: imageObject.id
        })
    };

    const onRemoveImage = () => {
        setAttributes({
            [`imageUrl${index}`]: null,
            [`imageId${index}`]: null,
        })
    };

    let isSelected = ! attributes['imageId' + index] || ! attributes['imageUrl' + index];

    // set a value or an empty string for each Control, or face :
    // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input

    return (
        <div>
            <h4>{ __('Carousel', 'epfl') + ` ${index}` }</h4>
            <TextControl
                label={ __('Title', 'epfl') }
                value={ attributes['title' + index] || ''}
                onChange={ value => setIndexedAttributes('title', value) }
            />
            <TextControl
                label={ __('Description', 'epfl') }
                value={ attributes['description' + index]  || '' }
                onChange={ value => setIndexedAttributes('description', value) }
            />
            <TextControl
                label={ __('URL', 'epfl') }
                value={ attributes['url' + index]  || '' }
                onChange={ value => setIndexedAttributes('url', value) }
            />
            { isSelected ? (
                <MediaUpload
                    onSelect={ onImageSelect }
                    type="image"
                    value={ attributes['imageId' + index] }
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
                        src={ attributes['imageUrl' + index] }
                        alt={ attributes['imageUrl' + index] }
                        className="epfl-uploader-img"
                    />

                    { props.attributes['imageUrl' + index] && (

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
        </div>
    );
}

registerBlockType( 'epfl/carousel', {
	title: __( 'EPFL Carousel', 'epfl'),
	description: __(
	    'Create a carousel of images (max 5) in full width, with link, title and description; automatic scrolling every 6 seconds',
        'epfl'
    ),
	icon: carouselIcon,
    category: hasCommonCategory ? 'common' : 'media',
	attributes: getAttributes(),
    example: getTooltippedExample(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        if ( attributes.asToolTip ) {
            // render the tooltip
            return(
                <Fragment>
                    <img src={ blockThumbnails.carousel } />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/carousel-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                    <PanelBody title='Links'>
                      <ToggleControl
                          label={ __('Open links in a new tab', 'epfl') }
                          checked={ attributes.openLinksNewTab }
                          onChange={ openLinksNewTab => setAttributes( { openLinksNewTab } ) }
                      />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <h2 className="epfl-block-title">{ __('EPFL Carousel', 'epfl') } </h2>
                    <hr />
                    {[...Array(maxElements)].map((x, i) =>
                    <CarouselPanel key={i+1} { ...{ attributes, setAttributes, index:i+1 } }  />
                    )}
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

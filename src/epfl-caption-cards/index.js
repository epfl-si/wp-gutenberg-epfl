const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    MediaUpload
} = wp.blockEditor;

const {
    TextControl,
    Placeholder,
    Button,
} = wp.components;

const { Fragment } = wp.element;

const maxCaptionCards = 10;

const getAttributes = () => {
    let atts = {};

    for (var i = 1; i <= maxCaptionCards; i++) {
        atts['title'+i] = {
			type: 'string',
        };
        atts['subtitle'+i] = {
			type: 'string',
        };
        atts['link'+i] = {
			type: 'string',
        };
        atts['imageId'+i] = {
			type: 'integer',
        };
        atts['imageUrl'+i] = {
            type: 'string',
            default: null
        };
    }

    return atts;
}

function CaptionCardPanel ( props ) {
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
    }

    let isSelected = ! attributes['imageId' + index] || ! attributes['imageUrl' + index];

    return (
        <div>
           <h3>{ __('Caption card', 'epfl')+ ` ${index}`}</h3>
           <TextControl
                label={ __('Title', 'epfl') }
                value={ attributes['title' + index] || ''}
                onChange={ value => setIndexedAttributes('title', value) }
            />
           <TextControl
                label={ __('Subtitle', 'epfl') }
                value={ attributes['subtitle' + index] || ''}
                onChange={ value => setIndexedAttributes('subtitle', value) }
            />
           <TextControl
                label={ __('Link', 'epfl') }
                value={ attributes['link' + index] || ''}
                onChange={ value => setIndexedAttributes('link', value) }
            />
            { isSelected ? (
                <MediaUpload
                    onSelect={ onImageSelect }
                    type="image"
                    value={ attributes['imageId' + index] }
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


registerBlockType( 'epfl/caption-cards', {
	title: __( 'EPFL Caption Cards', 'epfl'),
	description: 'v1.0.3',
	icon: 'screenoptions',
	category: 'common',
	attributes: getAttributes(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/caption-cards-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                </InspectorControls>
                <div className={ className + ' wp-block-scroll' }>
                    {[...Array(maxCaptionCards)].map((x, i) =>
                        <CaptionCardPanel key={i+1} { ...{ attributes, setAttributes, index:i+1 } }  />
                    )}
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
});

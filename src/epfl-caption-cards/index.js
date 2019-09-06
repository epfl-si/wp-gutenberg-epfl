const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    MediaUpload
} = wp.editor;

const {
    TextControl
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
        atts['image'+i] = {
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
            [`image${index}`]: imageObject.sizes.full.url,
            [`imageId${index}`]: imageObject.id
        })
    };

    return (
        <div>
           <h3>{`Caption card ${index}`} </h3>
           <TextControl
                label={ __('Title', 'wp-gutenberg-epfl') }
                value={ attributes['title' + index] || ''}
                onChange={ value => setIndexedAttributes('title', value) }
            />
           <TextControl
                label={ __('Subtitle', 'wp-gutenberg-epfl') }
                value={ attributes['subtitle' + index] || ''}
                onChange={ value => setIndexedAttributes('subtitle', value) }
            />
           <TextControl
                label={ __('Link', 'wp-gutenberg-epfl') }
                value={ attributes['link' + index] || ''}
                onChange={ value => setIndexedAttributes('link', value) }
            />
            <MediaUpload
                onSelect={ onImageSelect }
                type="image"
                value={ attributes['image' + index]  || '' }
                render={({ open }) => (
                    <div class="components-base-control">
                        <img style={ {maxHeight: '200px'} } src={ attributes['image' + index] } /><br />
                        <button onClick={ open }>
                        { __('Select Image', 'wp-gutenberg-epfl') }
                        </button>
                        <div style={ { marginTop: '5px' } }>{ __('Please select an image. Recommended image size: 1920x1080', 'wp-gutenberg-epfl') }</div>
                    </div>
                )}
            />
        </div>
    );

}


registerBlockType( 'epfl/caption-cards', {
	title: __( 'EPFL Caption Cards', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
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

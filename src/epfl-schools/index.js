import './style.scss'

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

const numberSchools = 10;

const getAttributes = () => {
    let atts = {};

    for (var i = 1; i <= numberSchools; i++) {
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
			type: 'number',
        };
        atts['image'+i] = {
            type: 'string',
            default: null
        };
    }

    return atts;
}

function SchoolPanel ( props ) {
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
           <h3>{`School ${index}`} </h3>
           <TextControl
                label={ __('Titre', 'wp-gutenberg-epfl') }
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
                        { __('Upload Image', 'wp-gutenberg-epfl') }
                        </button>
                        <div style={ { marginTop: '5px' } }>{ __('Recommended image size: ???', 'wp-gutenberg-epfl') }</div>
                    </div>
                )}
            />
        </div>
    );

}


registerBlockType( 'epfl/schools', {
	title: __( 'EPFL Schools', 'wp-gutenberg-epfl'),
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
                <div className={ className }>
                    {[...Array(numberSchools)].map((x, i) =>
                        <SchoolPanel key={i+1} { ...{ attributes, setAttributes, index:i+1 } }  />
                    )}
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
});

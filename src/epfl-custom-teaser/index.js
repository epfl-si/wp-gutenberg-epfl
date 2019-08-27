import './style.scss'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
    MediaUpload,
	InspectorControls,
} = wp.editor;

const {
    PanelBody,
    ToggleControl,
    TextControl,
} = wp.components;

const { Fragment } = wp.element;

const maxCustomTeaser = 3;

const getAttributes = () => {
    let atts = {
		'titleSection': {
            type: 'string',
        },
        'grayBackground': {
            type: 'boolean',
		},
	};

    for (var i = 1; i <= maxCustomTeaser; i++) {
        atts['title'+i] = {
			type: 'string',
        };
        atts['excerpt'+i] = {
			type: 'string',
        };
        atts['url'+i] = {
			type: 'string',
        };
        atts['buttonLabel'+i] = {
			type: 'string',
        };
        atts['imageId'+i] = {
			type: 'string',
        };
        atts['imageId'+i] = {
			type: 'number',
        };
        atts['image'+i] = {
            type: 'string',
        };
    }

    return atts;
}

function CustomTeaserPanel ( props ) {
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

    // set a value or an empty string for each Control, or face :
    // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input

    return (
        <div>
            <h4>{`Custom teaser ${index}`}</h4>
            <TextControl
                label={ __('Title', 'wp-gutenberg-epfl') }
                value={ attributes['title' + index] || ''}
                onChange={ value => setIndexedAttributes('title', value) }
            />
            <TextControl
                label={ __('Excerpt', 'wp-gutenberg-epfl') }
                value={ attributes['excerpt' + index]  || '' }
                onChange={ value => setIndexedAttributes('excerpt', value) }
            />
            <TextControl
                label={ __('Url', 'wp-gutenberg-epfl') }
                value={ attributes['url' + index]  || '' }
                onChange={ value => setIndexedAttributes('url', value) }
            />
            <TextControl
                label={ __('Button label', 'wp-gutenberg-epfl') }
                value={ attributes['buttonLabel' + index]  || '' }
                onChange={ value => setIndexedAttributes('buttonLabel', value) }
            />
            <MediaUpload
                onSelect={ onImageSelect }
                type="image"
                value={ attributes['image' + index]  || '' }
                render={({ open }) => (
                    <div>
                        <img style={ {maxHeight: '200px'} } src={ attributes['image' + index] } />
                        <button onClick={ open }>
                        { __('Upload Image', 'wp-gutenberg-epfl') }
                        </button>
                        <div style={ { marginTop: '5px' } }>{ __('Please select an image. Recommended image size: 1920x1080', 'wp-gutenberg-epfl') }</div>
                    </div>
                )}
            />
        </div>
    );
}

registerBlockType( 'epfl/custom-teaser', {
	title: __( 'EPFL Custom Teaser', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: 'editor-kitchensink',
	category: 'common',
	attributes: getAttributes(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title='Format'>
                        <ToggleControl
                            label={ __('Wrap with a gray border', 'wp-gutenberg-epfl') }
                            checked={ attributes.grayBackground }
                            onChange={ grayBackground => setAttributes( { grayBackground } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <h2>EPFL Custom Teaser</h2>
                    <TextControl
                        label={ __('Section title', 'wp-gutenberg-epfl') }
                        value={ attributes.titleSection }
                        onChange={ titleSection => setAttributes( { titleSection } ) }
                    />
                    <hr />
                    {[...Array(maxCustomTeaser)].map((x, i) =>
                    <CustomTeaserPanel key={i+1} { ...{ attributes, setAttributes, index:i+1 } }  />
                    )}
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

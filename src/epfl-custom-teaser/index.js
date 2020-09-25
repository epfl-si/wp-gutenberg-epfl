import { hasCommonCategory } from '../block-utils.js'
import { image } from '@wordpress/icons';

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

const maxCustomTeaser = 3;

const getAttributes = () => {
    let atts = {
		    'titleSection': {
            type: 'string',
        },
        'grayBackground': {
            type: 'boolean',
        },
        'openLinksNewTab': {
            type: 'boolean',
            default: false,
        }
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
			type: 'integer',
        };
        atts['imageUrl'+i] = {
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
            <h4>{ __('Custom teaser', 'epfl') + ` ${index}` }</h4>
            <TextControl
                label={ __('Title', 'epfl') }
                value={ attributes['title' + index] || ''}
                onChange={ value => setIndexedAttributes('title', value) }
            />
            <TextControl
                label={ __('Excerpt', 'epfl') }
                value={ attributes['excerpt' + index]  || '' }
                onChange={ value => setIndexedAttributes('excerpt', value) }
            />
            <TextControl
                label={ __('URL', 'epfl') }
                value={ attributes['url' + index]  || '' }
                onChange={ value => setIndexedAttributes('url', value) }
            />
            <TextControl
                label={ __('Button label', 'epfl') }
                value={ attributes['buttonLabel' + index]  || '' }
                onChange={ value => setIndexedAttributes('buttonLabel', value) }
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

registerBlockType( 'epfl/custom-teaser', {
	title: __( 'EPFL Custom Teaser', 'epfl'),
	description: 'v1.1.6',
	icon: 'editor-kitchensink',
    category: hasCommonCategory ? 'common' : 'design',
	attributes: getAttributes(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/custom-teaser-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <PanelBody title='Format'>
                        <ToggleControl
                            label={ __('Wrap with a gray border', 'epfl') }
                            checked={ attributes.grayBackground }
                            onChange={ grayBackground => setAttributes( { grayBackground } ) }
                        />
                    </PanelBody>
                    <PanelBody title='Links'>
                      <ToggleControl
                          label={ __('Open links in a new tab', 'epfl') }
                          checked={ attributes.openLinksNewTab }
                          onChange={ openLinksNewTab => setAttributes( { openLinksNewTab } ) }
                      />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <h2 className="epfl-block-title">{ __('EPFL Custom Teaser', 'epfl') } </h2>
                    <TextControl
                        label={ __('Section title', 'epfl') }
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

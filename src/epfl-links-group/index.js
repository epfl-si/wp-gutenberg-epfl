const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
    TextControl,
    ToggleControl,
} = wp.components;

const {
	InspectorControls,
} = wp.editor

const { Fragment } = wp.element;

const maxLinksGroup = 10;

const getAttributes = () => {
    let atts = {
        'title': {
            type: 'string',
        },
        'mainUrl': {
            type: 'string',
        },
        'openLinksNewTab': {
            type: 'boolean',
            default: false,
        }
	    };

    for (var i = 1; i <= maxLinksGroup; i++) {
        atts['label'+i] = {
			type: 'string',
        };
        atts['url'+i] = {
			type: 'string',
        };
    }

    return atts;
}

function LinkGroupPanel ( props ) {
    const { attributes, setAttributes, index } = props;

    const setIndexedAttributes = (field_name, value) => {
        setAttributes({[`${field_name}${index}`]: value});
     };

    // set a value or an empty string for each Control, or face :
    // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input

    return (
        <div>
            <TextControl
                label={ __('Label', 'epfl') }
                value={ attributes['label' + index] || ''}
                onChange={ value => setIndexedAttributes('label', value) }
            />
            <TextControl
                label={ __('URL', 'epfl') }
                value={ attributes['url' + index]  || '' }
                onChange={ value => setIndexedAttributes('url', value) }
            />
            <hr />
        </div>
    );
}

registerBlockType( 'epfl/links-group', {
	title: __( 'EPFL Links group', 'epfl'),
	description: 'v1.1.6',
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
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/links-group-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <ToggleControl
                        label={ __('Open links in a new tab', 'epfl') }
                        checked={ attributes.openLinksNewTab }
                        onChange={ openLinksNewTab => setAttributes( { openLinksNewTab } ) }
                    />
                </InspectorControls>
                <div className={ className + ' wp-block-scroll' }>
                    <h2>{ __('EPFL Links group', 'epfl') }</h2>
                    <TextControl
                        label={ __('Title', 'epfl') }
                        value={ attributes.title }
                        onChange={ title => setAttributes( { title } ) }
                    />
                    <TextControl
                        label={ __('URL', 'epfl') }
                        value={ attributes.mainUrl }
                        onChange={ mainUrl => setAttributes( { mainUrl } ) }
                    />
                    <h4>{ __('Links', 'epfl') }</h4>
                    {[...Array(maxLinksGroup)].map((x, i) =>
                    <LinkGroupPanel key={i+1} { ...{ attributes, setAttributes, index:i+1 } }  />
                    )}
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

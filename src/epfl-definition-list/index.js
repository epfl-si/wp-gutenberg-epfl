const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
    MediaUpload,
    InspectorControls,
    RichText,
} = wp.editor;

const {
    PanelBody,
    ToggleControl,
    TextControl,
} = wp.components;

const { Fragment } = wp.element;

const maxDefintionList = 10;

const getAttributes = () => {
    let atts = {
        'tableDisplay': {
            type: 'boolean',
        },
        'largeDisplay': {
            type: 'boolean',
        }
    };

    for (var i = 1; i <= maxDefintionList; i++) {
        atts['label'+i] = {
			type: 'string',
        };
        atts['desc'+i] = {
			type: 'string',
        };
    }

    return atts;
}

function DefinitionListPanel ( props ) {
    const { attributes, setAttributes, index } = props;

    const setIndexedAttributes = (field_name, value) => {
        setAttributes({[`${field_name}${index}`]: value});
    };

    return (
        <div>
           <h4>{`Definition ${index}`} </h4>
           <TextControl
                value={ attributes['label' + index] || ''}
                onChange={ value => setIndexedAttributes('label', value) }
                placeholder={ __('Term to define', 'wp-gutenberg-epfl') }
            />
           <RichText
                value={ attributes['desc' + index] || ''}
                onChange={ value => setIndexedAttributes('desc', value) }
                placeholder={ __('Definition of the term', 'wp-gutenberg-epfl') }
                // has we transited this component from a TextAreaControl
                // setting multiline to something will make the old content unreadable
                // false -> use <br>
                multiline={ false }
            />
        </div>
    );
}

registerBlockType( 'epfl/definition-list', {
	title: __( 'EPFL Definition List', 'wp-gutenberg-epfl'),
	description: 'v1.1.1',
	icon: 'editor-alignleft',
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
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/definition-list-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
                    <PanelBody title='Format'>
                        <ToggleControl
                            label={ __('Display as a table', 'wp-gutenberg-epfl') }
                            checked={ attributes.tableDisplay }
                            onChange={ tableDisplay => setAttributes( { tableDisplay } ) }
                            help={ __('Display the definition list as a table-like component', 'wp-gutenberg-epfl') }
                        />
                        <ToggleControl
                            label={ __('Large display', 'wp-gutenberg-epfl') }
                            checked={ attributes.largeDisplay }
                            onChange={ largeDisplay => setAttributes( { largeDisplay } ) }
                            help={ __('Makes the definition list design wider', 'wp-gutenberg-epfl') }
                        />
                    </PanelBody>
                </InspectorControls>
                <h2>EPFL Definition List</h2>
                <div className={ className + ' wp-block-scroll' }>
                    {[...Array(maxDefintionList)].map((x, i) =>
                        <DefinitionListPanel key={i+1} { ...{ attributes, setAttributes, index:i+1 } }  />
                    )}
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

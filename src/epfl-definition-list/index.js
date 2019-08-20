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
    TextareaControl
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
           <h3>{`Definition ${index}`} </h3>
           <TextControl
                value={ attributes['label' + index] || ''}
                onChange={ value => setIndexedAttributes('label', value) }
                placeholder={ __('Term', 'wp-gutenberg-epfl') }
                help={ __('Term to define', 'wp-gutenberg-epfl') }
            />
           <TextareaControl
                placeholder={ __('Definition', 'wp-gutenberg-epfl') }
                value={ attributes['desc' + index] || ''}
                onChange={ value => setIndexedAttributes('desc', value) }
                help={ __('Definition of the term', 'wp-gutenberg-epfl') }
            />
        </div>
    );
}

registerBlockType( 'epfl/definition-list', {
	title: __( 'Definition list', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
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
                <div className={ className }>
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

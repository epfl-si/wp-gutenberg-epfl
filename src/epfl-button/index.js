import buttonIcon from './button-icon'

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
} = wp.editor;

const {
    PanelBody,
    ToggleControl,
    TextControl,
    SelectControl,
} = wp.components;

const { Fragment } = wp.element;


const getAttributes = () => {
    let atts = {
        openLinkNewTab: {
            type: 'boolean',
            default: false,
        },
        buttonStyle: {
            type: 'string',
        },
        link: {
            type: 'string',
        },
        text: {
            type: 'string',
        }

    };

    return atts;
}

const optionsButtonStyle = [
    { value: 'primary', label: __('Primary (red)', 'epfl') },
    { value: 'secondary', label: __('Secondary (white)', 'epfl') },
];

registerBlockType( 'epfl/button', {
	title: __( 'EPFL Button', 'epfl'),
	description: 'v1.0.0',
	icon: buttonIcon,
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
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/button-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <PanelBody title='Format'>
                        <ToggleControl
                            label={ __('Open link in a new tab', 'epfl') }
                            checked={ attributes.openLinkNewTab  }
                            onChange={ openLinkNewTab  => setAttributes( { openLinkNewTab  } ) }
                        />
                        <SelectControl
                            label={ <h4> { __('Color', 'epfl') } </h4> }
                            value={ attributes.buttonStyle }
                            onChange={ buttonStyle => setAttributes( { buttonStyle } ) }
                            options={ optionsButtonStyle }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <h4>{ __('Button', 'epfl') }</h4>
                    <label><small>{ __('Text', 'epfl')  }</small></label>
                    <TextControl
                        value={ attributes.text }
                        onChange={ text => setAttributes( { text }) }
                        placeholder={ __('Text', 'epfl') }
                    />
                    <label><small>{ __('Target link', 'epfl')  }</small></label>
                    <TextControl
                        value={ attributes.link }
                        onChange={ link => setAttributes( { link }) }
                        placeholder={ __('URL', 'epfl') }
                    />
                        
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

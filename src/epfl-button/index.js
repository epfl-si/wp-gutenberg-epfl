import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import buttonIcon from './button-icon'

const version = "v1.0.0";

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
} = wp.blockEditor;

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
        buttonAlign: {
            type: 'string',
        },
        link: {
            type: 'string',
        },
        text: {
            type: 'string',
        },
    };

    return getTooltippedAttributes(atts);
}

const optionsButtonStyle = [
    { value: 'primary', label: __('Primary (red)', 'epfl') },
    { value: 'secondary', label: __('Secondary (white)', 'epfl') },
];
const optionsButtonAlign = [
    { value: 'left', label: __('Left', 'epfl') },
    { value: 'centered', label: __('Centered', 'epfl') },
];

registerBlockType( 'epfl/button', {
	title: __( 'EPFL Button', 'epfl'),
    description: __(
        'Create a link as a button',
        'epfl'
    ),
	icon: buttonIcon,
    category: hasCommonCategory ? 'common' : 'widgets',
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
                    <img src={ blockThumbnails.button } />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/button-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
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
                        <SelectControl
                            label={ <h4> { __('Alignment', 'epfl') } </h4> }
                            value={ attributes.buttonAlign }
                            onChange={ buttonAlign => setAttributes( { buttonAlign } ) }
                            options={ optionsButtonAlign }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <h2 className="epfl-block-title">{ __('Button', 'epfl') }</h2>
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

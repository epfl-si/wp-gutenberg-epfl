import { hasCommonCategory } from '../block-utils.js'

import alertIcon from './alert-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    RichText,
} = wp.blockEditor;

const {
    PanelBody,
	SelectControl,
    ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

let optionsAlertType = [
    { value: 'info', label: __('Info', 'epfl') },
    { value: 'success', label: __('Success', 'epfl') },
    { value: 'warning', label: __('Warning', 'epfl') },
    { value: 'danger', label: __('Danger', 'epfl') },
];

registerBlockType( 'epfl/alert', {
	title: __( 'EPFL Alert', 'epfl'),
	description: 'v1.0.0',
	icon: alertIcon,
	category: hasCommonCategory ? 'common' : 'widgets',
	attributes: {
        content: {
			type: 'string',
		},
		largeDisplay: {
            type: 'boolean',
            default: false,
        },
        canBeClosed: {
            type: 'boolean',
            default: false,
        },
        alertType: {
            type: 'string',
            default: 'info',
        }
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props

        return (
            <Fragment>
				<InspectorControls>
					<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/alert-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
					<PanelBody title='Format'>
                        <ToggleControl
                            label={ __('Large display', 'epfl') }
                            checked={ attributes.largeDisplay }
                            onChange={ largeDisplay => setAttributes( { largeDisplay } ) }
                        />
                        <ToggleControl
                            label={ __('Alert can be closed', 'epfl') }
                            checked={ attributes.canBeClosed }
                            onChange={ canBeClosed => setAttributes( { canBeClosed } ) }
                        />
                        <SelectControl
							label={ <h4> { __('Alert type', 'epfl') } </h4> }
							value={ attributes.alertType }
							onChange={ alertType => setAttributes( { alertType } ) }
							options={ optionsAlertType }
						/>
					</PanelBody>
				</InspectorControls>
                <div className={ className }>
					<h2 className="epfl-block-title">{ __('EPFL Alert' , 'epfl') }</h2>
					<label><small>{ __('Content', 'epfl') }</small></label>
                    <RichText
						value={ attributes.content }
						onChange={ content => setAttributes( { content } ) }
						placeholder={ __('Write your text here','epfl')}
						keepPlaceholderOnFocus = { true }
                    />
					</div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

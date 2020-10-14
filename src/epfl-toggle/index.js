import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import toggleIcon from './toggle-icon'

const version = "v1.1.0";

const { __ } = wp.i18n;

const {
    registerBlockType,

} = wp.blocks;

const {
    InspectorControls,
	PlainText,
	InnerBlocks,
} = wp.blockEditor;

const {
    PanelBody,
	RadioControl,
	TextControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/toggle', {

	title: __( 'EPFL Toggle', 'epfl'),
	description: __(
		'Create a block with toggleable content (accordion)',
		'epfl'
	),
	icon: toggleIcon,
	category: hasCommonCategory ? 'common' : 'text',
	attributes: getTooltippedAttributes({
		title: {
			type: 'string',
		},
		anchor: {
			type: 'string',
		},
		state: {
            type: 'string',
            default: 'close'
        }
	}),
	example: getTooltippedExample(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {

        const { attributes, className, setAttributes } = props

		if ( attributes.asToolTip ) {
			// render the tooltip
			return(
				<Fragment>
					<img src={ blockThumbnails.toggle } />
				</Fragment>
			);
		}

		return (
		<Fragment>
			<InspectorControls>
				<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/toggle-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
				<p className="wp-block-help">{ version }</p>
				<PanelBody>
					<RadioControl
                        label={ __('Initial state', 'epfl') }
                        selected={ attributes.state }
                        options={ [
                            { label: 'Closed', value: 'close' },
                            { label: 'Open', value: 'open' },
                        ] }
                        onChange={ state => setAttributes( { state } ) }
					/>
					<TextControl
						label={ __('Anchor', 'epfl') }
						help={ __('To point directly on toggle using #<anchor> in URL. Toggle will be opened automatically', 'epfl') }
						value={ attributes.anchor }
						onChange={ anchor => setAttributes( { anchor } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={ className }>
				<h2 className="epfl-block-title">{ __('EPFL Toggle', 'epfl') }</h2>
				<PlainText
					placeholder={ __('Title', 'epfl') }
					value={ attributes.title }
					onChange={ title => setAttributes( { title } ) }
				/>
				<hr />
                <InnerBlocks />
			</div>
		</Fragment>
		)

	},
	save: props => {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

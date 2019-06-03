import './style.scss'
import toggleIcon from './toggle-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.editor;

const {
    PanelBody,
	TextareaControl,
	TextControl,
	ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/toggle', {
	title: __( 'EPFL Toggle', 'wp-gutenberg-epfl'),
	description: __('Display EPFL toggle block', 'wp-gutenberg-epfl'),
	icon: toggleIcon,
	category: 'common',
	attributes: {
		title: {
			type: 'string',
		},
		content: {
			type: 'string',
		}, 
		state: {
			type: 'boolean',
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
				<PanelBody title={ __('Title', 'wp-gutenberg-epfl') }>
					<TextControl
						value={ attributes.title }
						onChange={ title => setAttributes( { title } ) }
					/>
				</PanelBody>
				<PanelBody title={ __('Content', 'wp-gutenberg-epfl') }>
					<TextareaControl
						value={ attributes.content }
						onChange={ content => setAttributes( { content } ) }
					/>
				</PanelBody>
				<PanelBody>
					<ToggleControl
						label={ __('Define toggle state', 'wp-gutenberg-epfl') }
						checked={ attributes.state }
						onChange={ () => setAttributes( { state: ! attributes.state } ) }
						helper={ __('Do you want display the toggle open or close by default ?', 'wp-gutenberg-epfl') }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={ className }>
                <div id="preview-box">
                    <h2>EPFL TOGGLE</h2>
                    <div class="helper">{ __('Please fill the fields in the right-hand column', 'wp-gutenberg-epfl') }</div>
                </div>
			</div>
		</Fragment>
		)
		
	},
	save: props => {
		return null
	},
} );
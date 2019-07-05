import './style.scss'
import infoscienceIcon from './infoscience-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.editor;

const {
    PanelBody,
	TextControl,
	TextareaControl,
	SelectControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/infoscience-search', {
	title: __( 'EPFL Infoscience', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: infoscienceIcon,
	category: 'common',
	attributes: {
		url: {
			type: 'string',
		},
		pattern: {
			type: 'string',
		},
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {

		const { attributes, className, setAttributes } = props

		return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __('Search method', 'wp-gutenberg-epfl') }>
					<TextareaControl
						label={ __('A direct infoscience URL', 'wp-gutenberg-epfl') }
						value={ attributes.url }
						onChange={ url => setAttributes( { url } ) }
						placeholder={ __('a https://infoscience.epfl.ch/search?... url:', 'wp-gutenberg-epfl') }
					/>
					<b>OR</b>
					<TextControl
						label={ __('Search records with a textual pattern', 'wp-gutenberg-epfl') }
						value={ attributes.pattern }
						onChange={ pattern => setAttributes( { pattern } ) }
						placeholder={ __('search for:', 'wp-gutenberg-epfl') }
					/>
					<a target="_blank" href="https://infoscience.epfl.ch/help/search-tips?ln=en">{ __('Search tips', 'wp-gutenberg-epfl') }</a>
				</PanelBody>
				<PanelBody title={ __('Field restriction', 'wp-gutenberg-epfl') } >
				</PanelBody>
			</InspectorControls>
			<div className={ className }>
                <div id="preview-box">
                    <h2>EPFL Infoscience</h2>
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
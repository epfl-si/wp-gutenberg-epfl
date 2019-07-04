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
	TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/infoscience-search', {
	title: __( 'EPFL Infoscience', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: infoscienceIcon,
	category: 'common',
	attributes: {
		directUrl: {
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
				<PanelBody title={ __('Direct Infoscience URL', 'wp-gutenberg-epfl') }>
					<TextareaControl
						value={ attributes.directUrl }
						onChange={ directUrl => setAttributes( { directUrl } ) }
					/>
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
import './style.scss'
import infoscienceIcon from './infoscience-icon'
import InspectorControlsInfoscience from './inspector'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

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
		fieldResriction: {
			type: 'string',
		},
		format: {
			type: 'string',
			default: 'short'
		},
		limit: {
			type: 'integer',
		},
		summary: {
			type: 'boolean',
			default: false,
		},
		thumbnail: {
			type: 'boolean',
			default: true,
		},
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {

		const { attributes, className, setAttributes } = props

		return (
		<Fragment>
			<div className={ className }>
				<InspectorControlsInfoscience { ...{ attributes, setAttributes } } />
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
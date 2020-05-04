import './style.scss'
import infoscienceIcon from './infoscience-icon'
import InspectorControlsInfoscience from './inspector'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const { Fragment } = wp.element;

registerBlockType( 'epfl/infoscience-search', {
	title: __( 'EPFL Infoscience', 'epfl'),
	description: 'v1.2.0',
	icon: infoscienceIcon,
	category: 'common',
	attributes: {
		url: {
			type: 'string',
		},
		pattern: {
			type: 'string',
		},
		field: {
			type: 'string',
		},
		matching: {
			type: 'string',
			default: 'a'
		},
		operator2: {
			type: 'string',
		},
		pattern2: {
			type: 'string',
		},
		field2: {
			type: 'string',
		},
		matching2: {
			type: 'string',
			default: 'a'
		},
		operator3: {
			type: 'string',
		},
		pattern3: {
			type: 'string',
		},
		field3: {
			type: 'string',
		},
		matching3: {
			type: 'string',
			default: 'a'
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
		sort :{
			type: 'string',
			default: 'desc'
		},
		groupBy: {
			type: 'string',
			default: null,
		},
		debug: {
			type: 'boolean',
			default: null,
		},
		debugData: {
			type: 'boolean',
			default: null,
		},
		debugTemplate: {
			type: 'boolean',
			default: null,
		}
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
                    <h2>{ __('EPFL Infoscience', 'epfl') }</h2>
                    <div className="helper">{ __('Please fill the fields in the right-hand column', 'epfl') }</div>
                </div>
			</div>
		</Fragment>
		)

	},
	save: props => {
		return null
	},
} );
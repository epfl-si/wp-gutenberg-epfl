import './style.scss'
import './editor.scss'

import PreviewMemento from './preview'
import InspectorControlsMemento from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'greglebarbar/memento',
	{
		title: __( 'EPFL Memento', 'epfl'),
		description: __("Display the EPFL events"),
		icon: 'wordpress-alt',
		category: 'common',
		keywords: [
			__( 'events' ),
		],
		attributes: {
			memento: {
				type: 'string',
				default: '1',
			},
			template: {
				type: 'string',
			},
			lang: {
				type: 'string',
				default: 'en',
			},
			category: {
				type: 'string',
				default: '0',
			},
			keyword: {
				type: 'string',
				default: null,
			},
			period: {
				type: 'string',
				default: null,
			},
			keyword: {
				type: 'string',
				default: "",
			}
		},
		supports : {
			customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
		},

		edit: props => {
			const { attributes, className, setAttributes } = props
			return (
				<Fragment>
					<InspectorControlsMemento { ...{ attributes, setAttributes } } />
					<PreviewMemento { ...{ attributes, className } } />
				</Fragment>
			)
		},

		save: props => {
			// This block is a dynamic block.
			// So we save only something like this :
			// <!-- wp:greglebarbar/memento {"memento":"111","template":"4", ...} 
			// /-->
			// The render of this block for the end user is doing in PHP.
      return null
    },
	}
)

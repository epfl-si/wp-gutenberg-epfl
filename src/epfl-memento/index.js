import './style.scss'
import './editor.scss'

import mementoIcon from './memento-icon'
import PreviewMemento from './preview'
import InspectorControlsMemento from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/memento',
	{
		title: __('EPFL Memento', 'wp-gutenberg-epfl'),
		description: 'v1.0.5',
		icon: mementoIcon,
		category: 'common',
		keywords: [
			__('events', 'wp-gutenberg-epfl'),
		],
		attributes: {
			memento: {
				type: 'integer',
				default: 1,
			},
			template: {
        type: 'string',
        default: 'slider_with_the_first_highlighted_event',
      },
      nbEvents: {
				type: 'integer',
				default: 10,
			},
			lang: {
				type: 'string',
				default: 'en',
			},
			category: {
				type: 'integer',
				default: 0,
			},
			period: {
				type: 'string',
				default: 'upcoming',
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
			// <!-- wp:epfl/memento {"memento":"111","template":"4", ...} 
			// /-->
			// The render of this block for the end user is doing in PHP.
      return null
    },
	}
)

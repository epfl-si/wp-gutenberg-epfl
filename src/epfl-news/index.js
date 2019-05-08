import './style.scss'
import './editor.scss'

import PreviewNews from './preview'
import InspectorControlsNews from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'greglebarbar/news',
	{
		title: __( "EPFL News"),
		description: __("Display the EPFL news"),
		icon: 'wordpress-alt',
		category: 'common',
		keywords: [
			__( 'news' ),
		],
		attributes: {
			channel: {
				type: 'string',
				default: '1',
			},
			template: {
				type: 'string',
			},
			displayLinkAllNews: {
				type: 'boolean',
				default: 'false',
			},
			nbNews: {
				type: 'integer',
				default: 5,
			},
			lang: {
				type: 'string',
				default: 'en',
			},
			category: {
				type: 'string',
				default: '0',
			},
			themes: {
				type: 'string',
				default: null,
			},
		},
		supports : {
			customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
		},

		edit: props => {
			const { attributes, className, setAttributes } = props
			return (
				<Fragment>
					<InspectorControlsNews { ...{ attributes, setAttributes } } />
					<PreviewNews { ...{ attributes, className } } />
				</Fragment>
			)
		},

		save: props => {
			// This block is a dynamic block.
			// So we save only something like this :
			// <!-- wp:greglebarbar/news {"channel":"111","template":"4","displayLinkAllNews":true,
			// "nbNews":2,"lang":"fr","category":"1","themes":"[]"} 
			// /-->
			// The render of this block for the end user is doing in PHP.
      return null
    },
	}
)

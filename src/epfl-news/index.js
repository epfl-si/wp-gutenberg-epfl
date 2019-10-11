import './style.scss'
import './editor.scss'
import newsIcon from './news-icon'
import PreviewNews from './preview'
import InspectorControlsNews from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/news',
	{
		title: __( "EPFL News", 'wp-gutenberg-epfl'),
		description: 'v1.0.2',
		icon: newsIcon,
		category: 'common',
		keywords: [
			__( 'news' , 'wp-gutenberg-epfl'),
		],
		attributes: {
			channel: {
        type: 'string',
        default: '1',
			},
			template: {
        type: 'string',
        default: 'listing',
			},
			displayLinkAllNews: {
				type: 'boolean',
				default: false,
			},
			nbNews: {
				type: 'integer',
				default: 3,
			},
			lang: {
				type: 'string',
				default: 'en',
			},
			category: {
				type: 'integer',
				default: 0,
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
			// <!-- wp:epfl/news {"channel":"111","template":"4","displayLinkAllNews":true,
			// "nbNews":2,"lang":"fr","category":"1","themes":"[]"} 
			// /-->
			// The render of this block for the end user is doing in PHP.
      return null
    },
	}
)

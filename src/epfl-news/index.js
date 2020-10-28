import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import './style.scss'
import newsIcon from './news-icon'
import PreviewNews from './preview'
import InspectorControlsNews from './inspector'
import './utils.js';

export const version = "v1.1.6";

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/news',
	{
		title: __( "EPFL News", 'epfl'),
		description: __(
			'Display news from news.epfl.ch',
			'epfl'
		),
		icon: newsIcon,
		category: hasCommonCategory ? 'common' : 'embed',
		keywords: [
			__( 'news' , 'epfl'),
		],
		attributes: getTooltippedAttributes({
			channel: {
				type: 'integer',
				default: 1,
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
			sections: {
				type: 'string',
				default: null,
			},
		}),
		example: getTooltippedExample(),
		supports : {
			customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
		},

		edit: props => {
			const { attributes, className, setAttributes } = props

			if ( attributes.asToolTip ) {
				// render the tooltip
				return(
					<Fragment>
						<img src={ blockThumbnails.news } />
					</Fragment>
				);
			}

			return (
				<Fragment>
					<InspectorControlsNews { ...{ attributes, setAttributes } } />
					<h2 className="epfl-block-title">{ __('EPFL News', 'epfl') }</h2>
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

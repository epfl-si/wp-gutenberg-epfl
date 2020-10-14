import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import InspectorControlsPostTeaser from './inspector'
import { getAllPagesPostsOrCategories } from '../index';

export const version = "v1.2.0";

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/post-teaser',
	{
		title: __( "EPFL Post Teaser", 'epfl'),
		description: __(
			'Create links (max 3) from the posts of the site, with image, title and short description automatically',
			'epfl'
		),
		category: hasCommonCategory ? 'common' : 'design',
		keywords: [
            __( 'page' , 'epfl'),
            __( 'teaser' , 'epfl'),
		],
		attributes: getTooltippedAttributes({
			post1: {
				type: 'string',
				default: null,
            },
            post2: {
				type: 'string',
				default: null,
            },
            post3: {
				type: 'string',
				default: null,
            },
            grayBackground: {
                type: 'boolean',
			},
			onlyLastPosts: {
				type: 'boolean',
			},
			postCategory: {
				type: 'string',
				default: null,
			}
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
						<img src={ blockThumbnails.postTeaser } />
					</Fragment>
				);
			}

			return (
				<Fragment>
					<h2 className="epfl-block-title">{ __('EPFL Post Teaser', 'epfl') }</h2>

					<InspectorControlsPostTeaser { ...{ attributes, setAttributes } } />
				</Fragment>
			)
		},

		save: props => {
            return null
        },
	}
)

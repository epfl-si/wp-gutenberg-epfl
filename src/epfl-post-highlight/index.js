import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import InspectorControlsPostHighlight from './inspector'

export const version = "v1.0.5";

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/post-highlight',
	{
		title: __( "EPFL Post Highlight", 'epfl'),
		description: __(
			'Display a link to a post of the site as a large image',
			'epfl'
		),
		category: hasCommonCategory ? 'common' : 'design',
		keywords: [
            __( 'post' , 'epfl'),
            __( 'highlight' , 'epfl'),
		],
		attributes: getTooltippedAttributes({
			post: {
				type: 'string',
				default: null,
            },
            layout: {
                type: 'string',
                default: 'right',
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
						<img src={ blockThumbnails.postHighlight } />
					</Fragment>
				);
			}

			return (
				<Fragment>
					<h2 className="epfl-block-title">{ __('EPFL Post Highlight', 'epfl') }</h2>
					<InspectorControlsPostHighlight { ...{ attributes, setAttributes } } />
                </Fragment>
			)
		},

		save: props => {
            return null
        },
	}
)

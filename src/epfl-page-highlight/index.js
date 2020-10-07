import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import InspectorControlsPageHighlight from './inspector'

export const version = "v1.0.4";

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/page-highlight',
	{
		title: __( "EPFL Page Highlight", 'epfl'),
		description: __(
			'Display a link to a page of the site as a large image',
			'epfl'
		),
		category: hasCommonCategory ? 'common' : 'design',
		keywords: [
            __( 'page' , 'epfl'),
            __( 'highlight' , 'epfl'),
		],
		attributes: getTooltippedAttributes({
			page: {
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
						<img src={ blockThumbnails.pageHighlight } />
					</Fragment>
				);
			}

			return (
				<Fragment>
                    <h2 className="epfl-block-title">{ __('EPFL Page Highlight', 'epfl') }</h2>
					<InspectorControlsPageHighlight { ...{ attributes, setAttributes } } />
				</Fragment>
			)
		},

		save: props => {
            return null
        },
	}
)

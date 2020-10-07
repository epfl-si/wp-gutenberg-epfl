import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import InspectorControlsPageTeaser from './inspector'

export const version = "v1.0.4";

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/page-teaser',
	{
		title: __( "EPFL Page Teaser", 'epfl'),
		description: __(
			'Create links (max 3) from the pages of the site, with image, title and short description automatically',
			'epfl'
		),
		category: hasCommonCategory ? 'common' : 'design',
		keywords: [
            __( 'page' , 'epfl'),
            __( 'teaser' , 'epfl'),
		],
		attributes: getTooltippedAttributes({
			title: {
				type: 'string',
			},
			page1: {
				type: 'string',
				default: null,
            },
            page2: {
				type: 'string',
				default: null,
            },
            page3: {
				type: 'string',
				default: null,
            },
            grayBackground: {
                type: 'boolean',
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
						<img src={ blockThumbnails.pageTeaser } />
					</Fragment>
				);
			}

			return (
				<Fragment>
					<div className={ className }>
                        <h2 className="epfl-block-title">{ __('EPFL Page Teaser', 'epfl') }</h2>
						<InspectorControlsPageTeaser { ...{ attributes, setAttributes } } />
                    </div>
				</Fragment>
			)
		},

		save: props => {
            return null
        },
	}
)

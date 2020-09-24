import { hasCommonCategory } from '../block-utils.js'

import InspectorControlsPageTeaser from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/page-teaser',
	{
		title: __( "EPFL Page Teaser", 'epfl'),
		description: 'v1.0.4',
		category: hasCommonCategory ? 'common' : 'design',
		keywords: [
            __( 'page' , 'epfl'),
            __( 'teaser' , 'epfl'),
		],
		attributes: {
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
		},
		supports : {
			customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
		},

		edit: props => {
			const { attributes, className, setAttributes } = props
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

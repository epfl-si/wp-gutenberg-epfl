import { hasCommonCategory } from '../block-utils.js'

import InspectorControlsPageHighlight from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/page-highlight',
	{
		title: __( "EPFL Page Highlight", 'epfl'),
		description: 'v1.0.4',
		category: hasCommonCategory ? 'common' : 'design',
		keywords: [
            __( 'page' , 'epfl'),
            __( 'highlight' , 'epfl'),
		],
		attributes: {
			page: {
				type: 'string',
				default: null,
            },
            layout: {
                type: 'string',
                default: 'right',
            },
		},
		supports : {
			customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
		},

		edit: props => {
			const { attributes, className, setAttributes } = props
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

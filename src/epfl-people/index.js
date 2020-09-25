import { hasCommonCategory } from '../block-utils.js'

import newsIcon from './people-icon'
import PreviewPeople from './preview'
import InspectorControlsPeople from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/people',
	{
		title: __( "EPFL People", 'epfl'),
		description: 'v1.1.9',
		icon: newsIcon,
		category: hasCommonCategory ? 'common' : 'embed',
		keywords: [
			__( 'people' , 'epfl'),
		],
		attributes: {
			units: {
				type: 'string',
      },
      groups: {
        type: 'string',
      },
			scipers: {
				type: 'string',
			},
			doctoralProgram: {
				type: 'string',
			},
			fonction: {
				type: 'string',
			},
			columns: {
        type: 'string',
        default: '3',
      },
      order: {
        type: 'string',
        default: 'alphabetical',
      },
      structure: {
        type: 'string',
      }
		},
		supports : {
			customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
		},

		edit: props => {
			const { attributes, className, setAttributes } = props
			return (
				<Fragment>
					<InspectorControlsPeople { ...{ attributes, setAttributes } } />
					<h2 className="epfl-block-title">{ __('EPFL People', 'epfl') }</h2>
					<PreviewPeople { ...{ attributes, className } } />
				</Fragment>
			)
		},

		save: props => {
            return null
        },
	}
)

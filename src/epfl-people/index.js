import './style.scss'
import './editor.scss'
import newsIcon from './people-icon'
import PreviewPeople from './preview'
import InspectorControlsPeople from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/people',
	{
		title: __( "EPFL People", 'wp-gutenberg-epfl'),
		description: 'v1.0.5',
		icon: newsIcon,
		category: 'common',
		keywords: [
			__( 'people' , 'wp-gutenberg-epfl'),
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
        default: '1',
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
					<PreviewPeople { ...{ attributes, className } } />
				</Fragment>
			)
		},

		save: props => {
            return null
        },
	}
)

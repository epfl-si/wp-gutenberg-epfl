import {
	hasCommonCategory,
	getTooltippedAttributes,
	getTooltippedExample,
} from '../block-utils.js'

import coursesIcon from './courses-icon'
import InspectorControlsCourses from './inspector'

export const version = "v1.2.0";

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element
const { TextControl } = wp.components;

registerBlockType(
	'epfl/courses',
	{
		title: __( "EPFL Courses", 'epfl'),
		description: __(
			'Display all courses given by a teacher, in a section or in a lab',
			'epfl'
		),
		icon: coursesIcon,
		category: hasCommonCategory ? 'common' : 'embed',
		keywords: [
			__( 'courses' , 'epfl'),
		],
		attributes: getTooltippedAttributes({
			title:{
				type: 'string',
			},
			unit: {
				type: 'string',
			},
			section: {
				type: 'string',
			},
			scipers: {
				type: 'string',
			},
			courseCode: {
				type: 'string',
			},
			teachingLang: {
				type: 'string',
			},
			semester: {
				type: 'string',
			},
			orientation: {
				type: 'string',
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
				return (
					<Fragment>
						<img src={ blockThumbnails.courses } />
					</Fragment>
				);
			}

			return (
				<Fragment>
					<InspectorControlsCourses { ...{ attributes, setAttributes } } />
					<div className={ className }>
                    	<h2 className="epfl-block-title">{ __('EPFL Courses', 'epfl') }</h2>
						<TextControl
							label={ __('Title', 'epfl') }
							value={ attributes.title }
							onChange={ title => setAttributes( { title } ) }
						/>
					</div>
				</Fragment>
			)
		},

		save: props => {
            return null
        },
	}
)

import coursesIcon from './courses-icon'
import InspectorControlsCourses from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element
const { TextControl } = wp.components;

registerBlockType(
	'epfl/courses',
	{
		title: __( "EPFL Courses", 'epfl'),
		description: 'v1.0.0',
		icon: coursesIcon,
		category: 'common',
		keywords: [
			__( 'courses' , 'epfl'),
		],
		attributes: {
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
			cursus: {
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

		},
		supports : {
			customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
		},

		edit: props => {
			const { attributes, className, setAttributes } = props
			return (
				<Fragment>
					<InspectorControlsCourses { ...{ attributes, setAttributes } } />
					<div className={ className }>
                    	<h2>{ __('EPFL Courses', 'epfl') }</h2>
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

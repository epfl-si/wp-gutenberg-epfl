import InspectorControlsPostTeaser from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { CheckboxControl } = wp.components
const { Fragment } = wp.element

registerBlockType(
	'epfl/post-teaser',
	{
		title: __( "EPFL Post Teaser", 'epfl'),
		description: 'v1.0.3',
		category: 'common',
		keywords: [
            __( 'page' , 'epfl'),
            __( 'teaser' , 'epfl'),
		],
		attributes: {
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
			}
		},
		supports : {
			customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
		},

		edit: props => {
			const { attributes, className, setAttributes } = props
			
			return (
				<Fragment>
					<h2>{ __('EPFL Post Teaser', 'epfl') }</h2>
					<CheckboxControl
						label = { __('Display last 3 published posts', 'epfl') }
						checked = { attributes.onlyLastPosts }
						onChange = { onlyLastPosts => setAttributes( { onlyLastPosts } ) }
					/>
					<InspectorControlsPostTeaser { ...{ attributes, setAttributes } } />
				</Fragment>
			)
		},

		save: props => {
            return null
        },
	}
)

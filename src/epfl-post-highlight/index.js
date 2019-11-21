import InspectorControlsPostHighlight from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/post-highlight',
	{
		title: __( "EPFL Post Highlight", 'epfl'),
		description: 'v1.0.2',
		category: 'common',
		keywords: [
            __( 'post' , 'epfl'),
            __( 'highlight' , 'epfl'),
		],
		attributes: {
			post: {
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
					<h2>EPFL Post Highlight</h2>
					<InspectorControlsPostHighlight { ...{ attributes, setAttributes } } />
                </Fragment>
			)
		},

		save: props => {
            return null
        },
	}
)

import InspectorControlsPageHighlight from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/page-highlight',
	{
		title: __( "EPFL Page Highlight", 'epfl'),
		description: 'v1.0.1',
		category: 'common',
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
                    <h2>EPFL Page Highlight</h2>
					<InspectorControlsPageHighlight { ...{ attributes, setAttributes } } />
				</Fragment>
			)
		},

		save: props => {
            return null
        },
	}
)

import InspectorControlsPostHighlight from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/post-highlight',
	{
		title: __( "EPFL Post Highlight", 'wp-gutenberg-epfl'),
		description: 'v1.0.0',
		category: 'common',
		keywords: [
            __( 'post' , 'wp-gutenberg-epfl'),
            __( 'highlight' , 'wp-gutenberg-epfl'),
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
					<InspectorControlsPostHighlight { ...{ attributes, setAttributes } } />
					<div className={ className }>
                        <div id="preview-box">
                            <h2>EPFL POST HIGHLIGHT</h2>
                            <div className="helper">{ __('Please fill the fields in the right-hand column', 'wp-gutenberg-epfl') }</div>
                        </div>
                    </div>
				</Fragment>
			)
		},

		save: props => {
            return null
        },
	}
)

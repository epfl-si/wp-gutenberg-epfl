import InspectorControlsPageHighlight from './inspector'

const { __ } = wp.i18n
const { registerBlockType } = wp.blocks
const { Fragment } = wp.element

registerBlockType(
	'epfl/page-highlight',
	{
		title: __( "EPFL Page Highlight", 'wp-gutenberg-epfl'),
		description: 'v1.0.0',
		category: 'common',
		keywords: [
            __( 'page' , 'wp-gutenberg-epfl'),
            __( 'highlight' , 'wp-gutenberg-epfl'),
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
					<InspectorControlsPageHighlight { ...{ attributes, setAttributes } } />
					<div className={ className }>
                        <div id="preview-box">
                            <h2>EPFL PAGE HIGHLIGHT</h2>
                            <div class="helper">{ __('Please fill the fields in the right-hand column', 'wp-gutenberg-epfl') }</div>
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

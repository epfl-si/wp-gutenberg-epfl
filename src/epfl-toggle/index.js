import toggleIcon from './toggle-icon'

const { __ } = wp.i18n;

const {
    registerBlockType,

} = wp.blocks;

const {
    InspectorControls,
	RichText,
	PlainText,
} = wp.editor;

const {
    PanelBody,
	TextControl,
	RadioControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/toggle', {
	title: __( 'EPFL Toggle', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: toggleIcon,
	category: 'common',
	attributes: {
		title: {
			type: 'string',
		},
		content: {
            type: 'string',
        },
		state: {
            type: 'string',
            default: 'close'
        }
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {

        const { attributes, className, setAttributes } = props

		return (
		<Fragment>
			<InspectorControls>
				<p><a class="wp-block-help" href={ __('https://www.epfl.ch/campus/services/toggle-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
				<PanelBody>
					<RadioControl
                        label={ __('Initial state', 'wp-gutenberg-epfl') }
                        help={ __('Do you want display the toggle open or close initially ?', 'wp-gutenberg-epfl') }
                        selected={ attributes.state }
                        options={ [
                            { label: 'Closed', value: 'close' },
                            { label: 'Open', value: 'open' },
                        ] }
                        onChange={ state => setAttributes( { state } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div className={ className }>
				<h2>EPFL Toggle</h2>
				<PlainText
					placeholder={ __('Title', 'wp-gutenberg-epfl') }
					value={ attributes.title }
					onChange={ title => setAttributes( { title } ) }
				/>
				<hr />
                <RichText
					placeholder={ __('Content to toggle', 'wp-gutenberg-epfl') }
                    tagName="div"
                    multiline="p"
                    value={ attributes.content }
                    onChange={ content => setAttributes( { content } ) }
                />
			</div>
		</Fragment>
		)

	},
	save: props => {
		return null
	},
} );
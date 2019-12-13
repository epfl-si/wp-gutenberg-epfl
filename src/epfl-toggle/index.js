import toggleIcon from './toggle-icon'

const { __ } = wp.i18n;

const {
    registerBlockType,

} = wp.blocks;

const {
    InspectorControls,
	PlainText,
	InnerBlocks,
} = wp.editor;

const {
    PanelBody,
	RadioControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/toggle', {

	title: __( 'EPFL Toggle', 'epfl'),
	description: 'v1.0.4',
	icon: toggleIcon,
	category: 'common',
	attributes: {
		title: {
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
				<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/toggle-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
				<PanelBody>
					<RadioControl
                        label={ __('Initial state', 'epfl') }
                        help={ __('Do you want display the toggle open or close initially ?', 'epfl') }
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
				<h2>{ __('EPFL Toggle', 'epfl') }</h2>
				<PlainText
					placeholder={ __('Title', 'epfl') }
					value={ attributes.title }
					onChange={ title => setAttributes( { title } ) }
				/>
				<hr />
                <InnerBlocks />
			</div>
		</Fragment>
		)

	},
	save: props => {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
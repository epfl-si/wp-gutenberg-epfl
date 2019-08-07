import './style.scss'
import toggleIcon from './toggle-icon'

const { __ } = wp.i18n;

const {
    registerBlockType,
    
} = wp.blocks;

const {
    InspectorControls,
    RichText,
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
            selector: '.content'
        },
		state: {
            type: 'string',
            default: 'close'
        },
        blockName: {
            type: 'string',
            default: 'You must specify a block name in the right column'
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
				<PanelBody title={ __('Title', 'wp-gutenberg-epfl') }>
					<TextControl
						value={ attributes.title }
                        onChange={ title => setAttributes( { title } ) }
					/>
				</PanelBody>
				<PanelBody>
					<RadioControl
                        label={ __('Define toggle state', 'wp-gutenberg-epfl') }
                        help={ __('Do you want display the toggle open or close by default ?', 'wp-gutenberg-epfl') }
                        selected={ attributes.state }
                        options={ [
                            { label: 'Closed', value: 'close' },
                            { label: 'Open', value: 'open' },
                        ] }
                        onChange={ state => setAttributes( { state } ) }
					/>
				</PanelBody>
                <PanelBody title={ __('Block name', 'wp-gutenberg-epfl')}>
                    <TextControl
						value={ attributes.blockName }
                        onChange={ blockName => setAttributes( { blockName } ) }
					/>
                </PanelBody>
			</InspectorControls>
			<div className={ className }>
                <label><strong>{ attributes.blockName }</strong></label>
                <hr />
                <RichText
                    tagName="div"
                    multiline="p"
                    placeholder={ __( 'Write your content here', 'wp-gutenberg-epfl' ) }
                    value={ attributes.content }
                    className="content"
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

import googleFormsIcon from './google-forms-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.editor;

const {
    PanelBody,
    TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/google-forms', {
	title: __( 'Google Forms', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: googleFormsIcon,
	category: 'common',
	attributes: {
        content: {
			type: 'string',
        },
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props
        
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={ __('Google Forms <iframe> HTML code', 'wp-gutenberg-epfl') }>
                        <TextareaControl
                            value={ attributes.content }
                            onChange={ content => setAttributes( { content } ) }
                            help={ __('You can copy/paste the given HTML code containing <iframe>', 'wp-gutenberg-epfl') }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <div id="preview-box">
                        <h2>EPFL GOOGLE FORMS</h2>
                        <div class="helper">{ __('Please fill the fields in the right-hand column', 'wp-gutenberg-epfl') }</div>
                    </div>
                </div>
            </Fragment>
		)		
	},
	save: ( props ) => {
		return null;
	},
} );
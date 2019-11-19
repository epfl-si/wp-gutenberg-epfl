
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
	title: __( 'Google Forms', 'epfl'),
	description: 'v1.0.6',
	icon: googleFormsIcon,
	category: 'common',
	attributes: {
        data: {
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
					<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/google-form-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
				</InspectorControls>
                <div className={ className }>
                    <h2>EPFL GOOGLE FORMS</h2>
                        <TextareaControl
							label={ __('Google Forms <iframe> HTML code', 'epfl')}
                            value={ attributes.data }
                            onChange={ data => setAttributes( { data } ) }
                            help={ __('Paste here the <iframe> HTML code you find in "< >" tab when you press the "Send" button on a GoogleForm edition page', 'epfl') }
                        />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

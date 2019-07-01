import scienceqaIcon from './scienceqa-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.editor;

const {
    RadioControl,
    PanelBody,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/scienceqa', {
	title: __( 'EPFL Science QA', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: scienceqaIcon,
	category: 'common',
	attributes: {
		lang: {
            type: 'string',
            default: 'en',
		}
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
		
        const { attributes, className, setAttributes } = props
        
        let optionsLanguagesList = [
            { value: 'fr', label: __('French', 'wp-gutenberg-epfl') },
            { value: 'en', label: __('English', 'wp-gutenberg-epfl') },
        ];

		return (
		<Fragment>
			<InspectorControls>
                <PanelBody title={ __('Language', 'wp-gutenberg-epfl') }>
                    <RadioControl
                        label={ __("Select a language", 'wp-gutenberg-epfl') }
                        help={ __("The language used to render Science Q&A survey", 'wp-gutenberg-epfl') }
                        selected={ attributes.lang }
                        options={ optionsLanguagesList }
                        onChange={ lang => setAttributes( { lang } ) }
                    />
                </PanelBody>
			</InspectorControls>
            <div className={ className }>
                <div id="preview-box">
                    <h2>EPFL SCIENCE QA</h2>
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
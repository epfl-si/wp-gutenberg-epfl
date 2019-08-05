
import videoIcon from './video-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.editor;

const {
    PanelBody,
    TextControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/video', {
	title: __( 'EPFL Video', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: videoIcon,
	category: 'common',
	attributes: {
        url: {
			type: 'url',
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
                    <PanelBody title={ __('URL of the video', 'wp-gutenberg-epfl') }>
                        <TextControl
                            value={ attributes.url }
                            onChange={ url => setAttributes( { url } ) }
                            help={ __('You can copy/paste a YouTube, Vimeo or SWITCHTube URL', 'wp-gutenberg-epfl') }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <div id="preview-box">
                        <h2>EPFL VIDEO</h2>
                        <div className="helper">{ __('Please fill the fields in the right-hand column', 'wp-gutenberg-epfl') }</div>
                    </div>
                </div>
            </Fragment>
		)		
	},
	save: ( props ) => {
		return null;
	},
} );
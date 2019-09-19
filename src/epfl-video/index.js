
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
					<p><a class="wp-block-help" href={ __('https://www.epfl.ch/campus/services/video-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
				</InspectorControls>
                <div className={ className }>
                    <h2>EPFL VIDEO</h2>
					<TextControl
						label={ __('URL of the video', 'wp-gutenberg-epfl') }
                        value={ attributes.url }
                        onChange={ url => setAttributes( { url } ) }
                        help={ __('You can paste a YouTube, Vimeo or SWITCHTube URL', 'wp-gutenberg-epfl') }
                    />
					</div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

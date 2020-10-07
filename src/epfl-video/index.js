import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import videoIcon from './video-icon'

const version = "v1.0.5";

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.blockEditor;

const {
    PanelBody,
	TextControl,
	ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/video', {
	title: __( 'EPFL Video', 'epfl'),
	description: __(
		'Embed a video from SwitchTube, Vimeo or Youtube',
		'epfl'
	),
	icon: videoIcon,
	category: hasCommonCategory ? 'common' : 'media',
	attributes: getTooltippedAttributes({
        url: {
			type: 'url',
		},
		largeDisplay: {
            type: 'boolean',
            default: false,
        },
	}),
	example: getTooltippedExample(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props

		if ( attributes.asToolTip ) {
			// render the tooltip
			return(
				<Fragment>
					<img src={ blockThumbnails.video } />
				</Fragment>
			);
		}

        return (
            <Fragment>
				<InspectorControls>
					<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/video-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
					<p className="wp-block-help">{ version }</p>
					<PanelBody title='Format'>
                        <ToggleControl
                            label={ __('Large display', 'epfl') }
                            checked={ attributes.largeDisplay }
                            onChange={ largeDisplay => setAttributes( { largeDisplay } ) }
                        />
					</PanelBody>
				</InspectorControls>
                <div className={ className }>
					<h2 className="epfl-block-title">{ __('EPFL Video' , 'epfl') }</h2>
					<TextControl
						label={ __('URL of the video', 'epfl') }
                        value={ attributes.url }
                        onChange={ url => setAttributes( { url } ) }
                        help={ __('You can paste a YouTube, Vimeo or SWITCHTube URL', 'epfl') }
                    />
					</div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

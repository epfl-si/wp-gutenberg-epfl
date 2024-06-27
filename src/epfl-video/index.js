import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import videoIcon from './video-icon'

const version = "v1.4.0";

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
	RadioControl,
} = wp.components;

const { Fragment } = wp.element;

const supports = {
	customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
}

registerBlockType( 'epfl/video', {
	title: __( 'EPFL Video', 'epfl'),
	description: __(
		'Embed a video from Mediaspace, Vimeo or Youtube',
		'epfl'
	),
	icon: videoIcon,
	category: hasCommonCategory ? 'common' : 'media',
	attributes: getTooltippedAttributes({
        url: {
			type: 'url',
		},
		displayType: {
			type: 'string',  // 'standard', 'large', 'full'
			default: 'standard'
		},
	}),
	example: getTooltippedExample(),
	supports : supports,
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
                        <RadioControl
							label={ __('Display', 'epfl') }
							selected={ attributes.displayType }
							options={ [
								{ label: 'Standard', value: 'standard' },
								{ label: 'Large', value: 'large' },
								{ label: 'Full', value: 'full' },
							] }
							onChange={ ( displayType ) => setAttributes( { displayType } ) }
                        />
					</PanelBody>
				</InspectorControls>
                <div className={ className }>
					<h2 className="epfl-block-title">{ __('EPFL Video' , 'epfl') }</h2>
					<TextControl
						label={ __('URL of the video', 'epfl') }
                        value={ attributes.url }
                        onChange={ url => setAttributes( { url } ) }
                        help={ __('You can paste a Mediaspace, YouTube or Vimeo URL', 'epfl') }
                    />
					</div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
	deprecated: [
		{
			isEligible({ largeDisplay }) {
				if (largeDisplay) {
					return true;
				} else {
					return false;
				}
			},
			attributes: {
				url: {
					type: 'url',
				},
				largeDisplay: {
					type: 'boolean',
					default: false,
				},
			},
			supports : supports,
			migrate( attributes ) {
				if (attributes.largeDisplay) {
					return {
						displayType: 'large',
						...attributes,
					};
				} else {
					return {
						displayType: 'standard',
						...attributes,
					}
				}
			},
			save: ( props ) => {
				return null;
			},
		},
	],
} );

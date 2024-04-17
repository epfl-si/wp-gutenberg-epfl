import { rss as socialFeedIcon } from '@wordpress/icons';

import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

const version = "v1.0.0";

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.blockEditor;

const {
    ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/social-share', {
	title: __( 'EPFL Social Share', 'epfl'),
    description: __(
        'Add content page in Facebook, X, Linkedin or send it by email of the current user',
        'epfl'
    ),
	icon: socialFeedIcon,
    category: hasCommonCategory ? 'common' : 'embed',
	attributes: getTooltippedAttributes({
        openFacebook: {
            type: 'boolean',
            default: true
        },
        openTwitter: {
            type: 'boolean',
            default: true
        },
        openEmail: {
			type: 'boolean',
            default: true
        },
        openLinkedin: {
            type: 'boolean',
            default: true
        },
        openCopyUrl: {
            type: 'boolean',
            default: true
        }
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
                    <img src={ blockThumbnails.socialShare } />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/social-share-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                </InspectorControls>
                <div className={ className }>
                    <h2 className="epfl-block-title">{ __('EPFL Social Share', 'epfl') }</h2>
					<ToggleControl
					  label={ __('Facebook', 'epfl') }
					  checked={ attributes.openFacebook }
					  onChange={ openFacebook => setAttributes( { openFacebook} ) }
					/>
					<ToggleControl
					  label={ __('X', 'epfl') }
					  checked={ attributes.openTwitter }
					  onChange={ openTwitter => setAttributes( { openTwitter} ) }
					/>
					<ToggleControl
					  label={ __('Email', 'epfl') }
					  checked={ attributes.openEmail }
					  onChange={ openEmail => setAttributes( { openEmail} ) }
					/>
					<ToggleControl
					  label={ __('Linkedin', 'epfl') }
					  checked={ attributes.openLinkedin }
					  onChange={ openLinkedin => setAttributes( { openLinkedin} ) }
					/>
					<ToggleControl
					  label={ __('Copy URL', 'epfl') }
					  checked={ attributes.openCopyUrl }
					  onChange={ openCopyUrl => setAttributes( { openCopyUrl} ) }
					/>
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

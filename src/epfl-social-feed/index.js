import { rss as socialFeedIcon } from '@wordpress/icons';

import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

const version = "v1.0.3";

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
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/social-feed', {
	title: __( 'EPFL Social Feed', 'epfl'),
    description: __(
        'Embed content from Facebook, Instagram and X',
        'epfl'
    ),
	icon: socialFeedIcon,
    category: hasCommonCategory ? 'common' : 'embed',
	attributes: getTooltippedAttributes({
        twitterUrl: {
            type: 'url',
        },
        twitterLimit: {
			type: 'integer',
        },
        instagramUrl: {
			type: 'url',
        },
        facebookUrl: {
            type: 'url',
        },
        height: {
            type: 'integer',
        },
        width: {
            type: 'integer',
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
                    <img src={ blockThumbnails.socialFeed } />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/social-feed-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                    <PanelBody title={ __('Size', 'epfl') }>
                        <label>{ __('Height', 'epfl') }</label>
                        <TextControl
                            value={ attributes.height }
                            onChange={ height => {
                                height = Number(height);
                                setAttributes( { height } );
                              }}
                            help={ __('Set the height in pixel (optional). 450 is recommended', 'epfl') }
                            placeholder= { 450 }
                        />
                        <TextControl
                            value={ attributes.width }
                            onChange={ width => {
                                width = Number(width);
                                setAttributes( { width } );
                              }}
                            help={ __('Set the width in pixel (optional). 374 is recommended', 'epfl') }
                            placeholder= { 374 }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <h2 className="epfl-block-title">{ __('EPFL Social Feed', 'epfl') }</h2>
					<PanelBody title='X' initialOpen={false}>
                        <TextControl
							label={ __('URL','epfl')}
                            value={ attributes.twitterUrl }
                            onChange={ twitterUrl => setAttributes( { twitterUrl } ) }
							help={ __('URL of a X account (eg. https://x.com/EPFL)', 'epfl') }
                        />
                        <label>{ __('Limit', 'epfl') }</label>
                        <TextControl
                            value={ attributes.twitterLimit }
                            onChange={ twitterLimit => {
                                twitterLimit = Number(twitterLimit);
                                setAttributes( { twitterLimit } );
                              }}
                            help={ __('0 for unlimited', 'epfl') }
                            placeholder= { 0 }
                            min={ 0 }
                        />
                    </PanelBody>

                    <PanelBody title='Instagram' initialOpen={false}>
                        <TextControl
							label={ __('URL','epfl')}
                            value={ attributes.instagramUrl }
                            onChange={ instagramUrl => setAttributes( { instagramUrl } ) }
                            help={ __('URL of an Instagram post (optional) (eg. https://www.instagram.com/p/BjuYB7Lhylj)', 'epfl') }
                        />
                    </PanelBody>

                    <PanelBody title='Facebook' initialOpen={false}>
                        <TextControl
							label={ __('URL','epfl')}
                            value={ attributes.facebookUrl }
                            onChange={ facebookUrl => setAttributes( { facebookUrl } ) }
                            help={ __('URL of your Facebook account (optional) (eg. https://www.facebook.com/epflcampus)', 'epfl') }
                        />
                    </PanelBody>
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

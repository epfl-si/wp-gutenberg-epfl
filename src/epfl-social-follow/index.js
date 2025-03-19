import { rss as socialFeedIcon } from '@wordpress/icons';

import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

const version = "v1.2.0";

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

registerBlockType( 'epfl/social-follow', {
	title: __( 'EPFL Social Follow', 'epfl'),
    description: __(
        'Links to Bluesky, Facebook, GitHub, GitLab, Instagram, LinkedIn, Mastodon, TikTok, YouTube and/or X accounts',
        'epfl'
    ),
    icon: socialFeedIcon,
    category: hasCommonCategory ? 'common' : 'embed',
    attributes: getTooltippedAttributes({
        blueskyUrl: {
            type: 'url',
        },
        facebookUrl: {
            type: 'url',
        },
        githubUrl: {
            type: 'url',
        },
        gitlabUrl: {
            type: 'url',
        },
        instagramUrl: {
            type: 'url',
        },
        linkedinUrl: {
            type: 'url',
        },
        mastodon: {
            type: 'url',
        },
        tiktok: {
            type: 'url',
        },
        twitterUrl: {
            type: 'url',
        },
        youtubeUrl: {
            type: 'url',
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
                    <img src={ blockThumbnails.socialFollow } />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/social-follow-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                </InspectorControls>
                <div className={ className }>
                    <h2 className="epfl-block-title">{ __('EPFL Social Follow', 'epfl') }</h2>

                    <PanelBody title='Bluesky' initialOpen={false}>
                        <TextControl
                            label={ __('URL','epfl')}
                            value={ attributes.blueskyUrl }
                            onChange={ blueskyUrl => setAttributes( { blueskyUrl } ) }
                            help={ __('URL of a Bluesky account (eg. https://bsky.app/)', 'epfl') }
                        />
                    </PanelBody>

                    <PanelBody title='Facebook' initialOpen={false}>
                        <TextControl
                            label={ __('URL','epfl')}
                            value={ attributes.facebookUrl }
                            onChange={ facebookUrl => setAttributes( { facebookUrl } ) }
                            help={ __('URL of a Facebook account (eg. https://www.facebook.com/epflcampus)', 'epfl') }
                        />
                    </PanelBody>

                    <PanelBody title='GitHub' initialOpen={false}>
                        <TextControl
                            label={ __('URL','epfl')}
                            value={ attributes.githubUrl }
                            onChange={ githubUrl => setAttributes( { githubUrl } ) }
                            help={ __('URL of a GitHub account (eg. https://github.com/epfl-si)', 'epfl') }
                        />
                    </PanelBody>

                    <PanelBody title='GitLab' initialOpen={false}>
                        <TextControl
                            label={ __('URL','epfl')}
                            value={ attributes.gitlabUrl }
                            onChange={ gitlabUrl => setAttributes( { gitlabUrl } ) }
                            help={ __('URL of a GitLab account (eg. https://gitlab.epfl.ch)', 'epfl') }
                        />
                    </PanelBody>

                    <PanelBody title='Instagram' initialOpen={false}>
                        <TextControl
                            label={ __('URL','epfl')}
                            value={ attributes.instagramUrl }
                            onChange={ instagramUrl => setAttributes( { instagramUrl } ) }
                            help={ __('URL of an Instagram account (eg. https://www.instagram.com/epflcampus/)', 'epfl') }
                        />
                    </PanelBody>

                    <PanelBody title='LinkedIn' initialOpen={false}>
                        <TextControl
                            label={ __('URL','epfl')}
                            value={ attributes.linkedinUrl }
                            onChange={ linkedinUrl => setAttributes( { linkedinUrl } ) }
                            help={ __('URL of a LinkedIn account (eg. https://www.linkedin.com/school/epfl/)', 'epfl') }
                        />
                    </PanelBody>

                    <PanelBody title='Mastodon' initialOpen={false}>
                        <TextControl
                            label={ __('URL','epfl')}
                            value={ attributes.mastodon }
                            onChange={ mastodon => setAttributes( { mastodon } ) }
                            help={ __('URL of a Mastodon account (eg. https://social.epfl.ch/@epfl/)', 'epfl') }
                        />
                    </PanelBody>

                    <PanelBody title='TikTok' initialOpen={false}>
                        <TextControl
                            label={ __('URL','epfl')}
                            value={ attributes.tiktok }
                            onChange={ tiktok => setAttributes( { tiktok } ) }
                            help={ __('URL of a TikTok account (eg. https://www.tiktok.com/@epflstudents)', 'epfl') }
                        />
                    </PanelBody>

                    <PanelBody title='Youtube' initialOpen={false}>
                        <TextControl
                            label={ __('URL','epfl')}
                            value={ attributes.youtubeUrl }
                            onChange={ youtubeUrl => setAttributes( { youtubeUrl } ) }
                            help={ __('URL of a YouTube account (eg. https://www.youtube.com/user/epflnews)', 'epfl') }
                        />
                    </PanelBody>

                    <PanelBody title='X' initialOpen={false}>
                        <TextControl
                            label={ __('URL','epfl')}
                            value={ attributes.twitterUrl }
                            onChange={ twitterUrl => setAttributes( { twitterUrl } ) }
                            help={ __('URL of a X account (eg. https://x.com/EPFL)', 'epfl') }
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

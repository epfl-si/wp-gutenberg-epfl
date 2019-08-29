import socialFeedIcon from './social-feed-icon'

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

registerBlockType( 'epfl/social-feed', {
	title: __( 'EPFL Social Feed', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: socialFeedIcon,
	category: 'common',
	attributes: {
        twitter_url: {
            type: 'url',
        },
        twitter_limit: {
			type: 'integer',
        },
        instagram_url: {
			type: 'url',
        },
        facebook_url: {
            type: 'url',
        },
        height: {
            type: 'integer',
        },
        width: {
            type: 'integer',
        }
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={ __('Size', 'wp-gutenberg-epfl') }>
                        <label>{ __('Height', 'wp-gutenberg-epfl') }</label>
                        <TextControl
                            value={ attributes.height }
                            onChange={ height => setAttributes( { height } ) }
                            help={ __('Set the height in pixel (optional). 450 is recommended', 'wp-gutenberg-epfl') }
                            placeholder= { 450 }
                        />
                        <TextControl
                            value={ attributes.width }
                            onChange={ width => setAttributes( { width } ) }
                            help={ __('Set the width in pixel (optional). 374 is recommended', 'wp-gutenberg-epfl') }
                            placeholder= { 374 }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <h2>EPFL Social Feed</h2>
					<PanelBody title='Twitter' initialOpen={false}>
                        <TextControl
							label={ __('URL','wp-gutenberg-epfl')}
                            value={ attributes.twitter_url }
                            onChange={ twitter_url => setAttributes( { twitter_url } ) }
                            help={ __('Url to your Twitter account (optional) (eg. https://twitter.com/EPFL)', 'wp-gutenberg-epfl') }
                        />
                        <label>{ __('Limit', 'wp-gutenberg-epfl') }</label>
                        <TextControl
                            value={ attributes.twitter_limit }
                            onChange={ twitter_limit => setAttributes( { twitter_limit } ) }
                            help={ __('0 for unlimited', 'wp-gutenberg-epfl') }
                            placeholder= { 0 }
                            min={ 0 }
                        />
                    </PanelBody>

                    <PanelBody title='Instagram' initialOpen={false}>
                        <TextControl
							label={ __('URL','wp-gutenberg-epfl')}
                            value={ attributes.instagram_url }
                            onChange={ instagram_url => setAttributes( { instagram_url } ) }
                            help={ __('Url of an Instagram post (optional) (eg. https://www.instagram.com/p/BjuYB7Lhylj)', 'wp-gutenberg-epfl') }
                        />
                    </PanelBody>

                    <PanelBody title='Facebook' initialOpen={false}>
                        <TextControl
							label={ __('URL','wp-gutenberg-epfl')}
                            value={ attributes.facebook_url }
                            onChange={ facebook_url => setAttributes( { facebook_url } ) }
                            help={ __('Url of your Facebook account (optional) (eg. https://www.facebook.com/epflcampus)', 'wp-gutenberg-epfl') }
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

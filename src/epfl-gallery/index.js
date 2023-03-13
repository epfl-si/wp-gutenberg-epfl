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
    InnerBlocks,
} = wp.blockEditor;

const {
    PanelBody,
    ToggleControl,
} = wp.components;

const { Fragment } = wp.element;


const getAttributes = () => {
    let atts = {
        largeDisplay: {
            type: 'boolean',
            default: false,
        },
        navigationThumbnails: {
            type: 'boolean',
            default: true,
        },
    };

    return getTooltippedAttributes(atts);
}

registerBlockType( 'epfl/gallery', {
	title: __( 'EPFL Gallery', 'epfl'),
    description: __(
        'Display a series of images with thumbnails',
        'epfl'
    ),
	icon: 'format-gallery',
    category: hasCommonCategory ? 'common' : 'media',
	attributes: getAttributes(),
    example: getTooltippedExample(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        if ( attributes.asToolTip ) {
            // render the tooltip
            return (
                <Fragment>
                    <img src={ blockThumbnails.gallery } />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/gallery/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                    <PanelBody title={ __('Format', 'epfl') }>
                        <ToggleControl
                            label={ __('Large display', 'epfl') }
                            checked={ attributes.largeDisplay }
                            onChange={ largeDisplay => setAttributes( { largeDisplay } ) }
                        />
                        <ToggleControl
                            label={ __('Navigation thumbnails', 'epfl') }
                            checked={ attributes.navigationThumbnails }
                            onChange={ navigationThumbnails => setAttributes( { navigationThumbnails } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <h2 className="epfl-block-title">{ __('Gallery', 'epfl') }</h2>
                    <InnerBlocks
                        // Template to have only one nested block, a core/gallery.
                        // as a gallery is composed of images, allow the image block.
                        template={ [
                            ['core/gallery', {}, [] ]
                        ] }
                        allowedBlocks={ ['core/gallery', 'core/image'] }
                       />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return (
            <div { ...props } >
                <InnerBlocks.Content />
            </div>
        );
	},
} );

import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import sponsorIcon from './sponsor-icon'
import './sponsor-panel'

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
    ToggleControl,
    RadioControl,
} = wp.components;

const { Fragment } = wp.element;


registerBlockType( 'epfl/sponsor-deck', {
    title: __( 'EPFL Sponsor', 'epfl'),
    description: __(
        'Create a list of sponsors with logo, name, and link',
        'epfl'
    ),
    icon: sponsorIcon,
    category: hasCommonCategory ? 'common' : 'design',
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
                    <img src={ blockThumbnails.sponsorDeck } />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('#', 'epfl') } target="new">{ __('Online help coming soon...', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                </InspectorControls>
                <div className={ className }>
                        <h2 className="epfl-block-title">{ __('EPFL Sponsor Deck', 'epfl') }</h2>
                        <InnerBlocks allowedBlocks={ ['epfl/sponsor-panel'] } />
                </div>
            </Fragment>
        )
    },
    save: ( props ) => {
        return (
                <InnerBlocks.Content />

        );
    },
} );

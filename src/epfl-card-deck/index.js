import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import cardIcon from './card-icon'
import './card-panel'

const version = "v1.0.3";

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

const TEMPLATE = [
	['epfl/card-panel', {}, [] ],
    ['epfl/card-panel', {}, [] ],
    ['epfl/card-panel', {}, [] ],
]

const getAttributes = () => {
    let atts = {
        grayWrapper: {
            type: 'boolean',
            default: false,
        },
    };

    return getTooltippedAttributes(atts);
}

registerBlockType( 'epfl/card-deck', {
	title: __( 'EPFL Card Deck', 'epfl'),
    description: __(
        'Create image blocks (3 per line max), with a title, a link, and some content',
        'epfl'
    ),
	icon: cardIcon,
    category: hasCommonCategory ? 'common' : 'design',
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
                    <img src={ blockThumbnails.cardDeck } />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/card-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                    <PanelBody title='Format'>
                        <ToggleControl
                            label={ __('Wrap with a gray border', 'epfl') }
                            checked={ attributes.grayWrapper }
                            onChange={ grayWrapper => setAttributes( { grayWrapper } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                        <h2 className="epfl-block-title">{ __('EPFL Card Deck', 'epfl') }</h2>
                        <InnerBlocks
                            template={ TEMPLATE }
                            /* We could lock template to deny adding new blocks but even if we remove the locking inside epfl/card-panel, there's a bug and the system removes the
                             block inside epfl/card-panl block.
                             So, as workaround, we don't lock but limit new blocks to 'epfl/card-panel'. And because this block is not present in the white list in
                             this plugin (plugin.php), we won't be able to add new blocks inside and epfl/card-deck block */
                            allowedBlocks={['epfl/card-panel']}
                           />
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

import { hasCommonCategory } from '../block-utils.js'

import miniCardIcon from './mini-card-icon'
import './mini-card-panel'

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
    TextControl,
} = wp.components;

const { Fragment } = wp.element;

const TEMPLATE = [
	['epfl/mini-card-panel', {}, [] ],
    ['epfl/mini-card-panel', {}, [] ],
    ['epfl/mini-card-panel', {}, [] ],
    ['epfl/mini-card-panel', {}, [] ],
    ['epfl/mini-card-panel', {}, [] ],
    ['epfl/mini-card-panel', {}, [] ],
]

const getAttributes = () => {
    let atts = {
        title: {
            type: 'string'
        },
        grayWrapper: {
            type: 'boolean',
            default: false,
        },
    };

    return atts;
}

registerBlockType( 'epfl/mini-card-deck', {
	title: __( 'EPFL Mini Card Deck', 'epfl'),
	description: 'v1.0.1',
	icon: miniCardIcon,
    category: hasCommonCategory ? 'common' : 'design',
	attributes: getAttributes(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/mini-card-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <PanelBody title='Format'>
                        <ToggleControl
                            label={ __('Wrap with a gray border', 'epfl') }
                            checked={ attributes.grayWrapper }
                            onChange={ grayWrapper => setAttributes( { grayWrapper } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                        <h2 className="epfl-block-title">{ __('EPFL Mini Card Deck', 'epfl') }</h2>
                        <TextControl
                        label={ __('Title', 'epfl') }
                        value={ attributes.title }
                        onChange={ title => setAttributes( { title } ) }
                    />
                        <InnerBlocks
                            template={ TEMPLATE }
                            /* We could lock template to deny adding new blocks but even if we remove the locking inside epfl/mini-card-panel, there's a bug and the system removes the
                             block inside epfl/mini-card-panel block.
                             So, as workaround, we don't lock but limit new blocks to 'epfl/mini-card-panel'. And because this block is not present in the white list in
                             this plugin (plugin.php), we won't be able to add new blocks inside and epfl/card-deck block */
                            allowedBlocks={['epfl/mini-card-panel']}
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

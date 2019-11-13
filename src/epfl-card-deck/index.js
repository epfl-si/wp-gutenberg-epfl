import cardIcon from './card-icon'
import './card-panel'

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    InnerBlocks,
} = wp.editor;

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

    /* We keep this only for a small amount of time, just by security for data migration.
    This will be removed in a near future. */
    for (var i = 1; i <= 3; i++) {
        atts['title'+i] = {
			type: 'string',
        };
        atts['link'+i] = {
			type: 'string',
        };
        atts['imageId'+i] = {
			type: 'integer',
        };
        atts['imageUrl'+i] = {
            type: 'string',
            default: null
        };
        atts['content'+i] = {
			type: 'string',
        };
    }

    return atts;
}

registerBlockType( 'epfl/card-deck', {
	title: __( 'EPFL Card Deck', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: cardIcon,
	category: 'common',
	attributes: getAttributes(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/card-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
                    <PanelBody title='Format'>
                        <ToggleControl
                            label={ __('Wrap with a gray border', 'wp-gutenberg-epfl') }
                            checked={ attributes.grayWrapper }
                            onChange={ grayWrapper => setAttributes( { grayWrapper } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className + ' wp-block-scroll' }>
                        <h2>EPFL Card Deck</h2>
                        <InnerBlocks 
                            template={ TEMPLATE }
                            /* We could lock template to deny adding new blocks but even if we remove the locking inside epfl/card-panel, there's a bug and the system removes the block inside epfl/card-panl block.
                             So, as workaround, we don't lock but limit new blocks to 'epfl/card-panel'. And because this block is not present in the white list in MU-Plugin EPFL_custom_editor_menu.php, we won't
                             be able to add new blocks inside and epfl/card-deck block */
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

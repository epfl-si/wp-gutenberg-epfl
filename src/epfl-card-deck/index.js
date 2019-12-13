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

    return atts;
}

registerBlockType( 'epfl/card-deck', {
	title: __( 'EPFL Card Deck', 'epfl'),
	description: 'v1.0.2',
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
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/card-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <PanelBody title='Format'>
                        <ToggleControl
                            label={ __('Wrap with a gray border', 'epfl') }
                            checked={ attributes.grayWrapper }
                            onChange={ grayWrapper => setAttributes( { grayWrapper } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className + ' wp-block-scroll' }>
                        <h2>{ __('EPFL Card Deck', 'epfl') }</h2>
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

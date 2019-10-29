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
	['epfl/card-panel', {}, []],
    ['epfl/card-panel', {}, []],
    ['epfl/card-panel', {}, []],
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

registerBlockType( 'epfl/card', {
	title: __( 'EPFL Card Deck', 'wp-gutenberg-epfl'),
	description: 'v1.0.3',
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
                        <h2>EPFL Card</h2>
                        <InnerBlocks 
                            template={ TEMPLATE }
                            templateLock="all" />
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

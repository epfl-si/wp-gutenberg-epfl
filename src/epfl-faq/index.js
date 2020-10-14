import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import faqIcon from './faq-icon'
import './faq-item'

const version = "v1.0.2";

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    InnerBlocks,
} = wp.blockEditor;

const {
} = wp.components;

const { Fragment } = wp.element;

const TEMPLATE = [
	['epfl/faq-item', {}, [] ],
]

const getAttributes = () => {
    let atts = {};

    return getTooltippedAttributes(atts);
}

registerBlockType( 'epfl/faq', {
	title: __( 'EPFL FAQ', 'epfl'),
    description: __(
        'Display a list of questions and their answers',
        'epfl'
    ),
	icon: faqIcon,
    category: hasCommonCategory ? 'common' : 'text',
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
                    <img src={ blockThumbnails.faq } />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/faq-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                </InspectorControls>
                <div className={ className }>
                        <h2 className="epfl-block-title">{ __('EPFL FAQ items', 'epfl') } </h2>
                        <InnerBlocks
                            template={ TEMPLATE }
                            allowedBlocks={['epfl/faq-item']}
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

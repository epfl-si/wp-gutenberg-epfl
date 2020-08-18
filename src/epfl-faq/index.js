import faqIcon from './faq-icon'
import './faq-item'

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    InnerBlocks,
} = wp.editor;

const {
} = wp.components;

const { Fragment } = wp.element;

const TEMPLATE = [
	['epfl/faq-item', {}, [] ],
]

const getAttributes = () => {
    let atts = {};

    return atts;
}

registerBlockType( 'epfl/faq', {
	title: __( 'EPFL FAQ', 'epfl'),
	description: 'v1.0.2',
	icon: faqIcon,
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
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/faq-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>

                </InspectorControls>
                <div className={ className + ' wp-block-scroll' }>
                        <h2>{ __('EPFL FAQ items', 'epfl') } </h2>
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

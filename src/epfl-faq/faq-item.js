import faqIcon from './faq-icon'

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InnerBlocks,
} = wp.blockEditor;

const {
    TextControl,
} = wp.components;

const { Fragment } = wp.element;

const TEMPLATE = [
	['core/freeform', {}, [] ],
]

const getAttributes = () => {
    let atts = {
            question: {
                type: 'string'
            },
            answer: {
                type: 'string'
            },
        };

    return atts;
}

registerBlockType( 'epfl/faq-item', {
	title: __( 'EPFL FAQ Item', 'epfl'),
	description: 'v1.0.0',
	icon: faqIcon,
    category: 'common',
    parent: ['epfl/faq'],
	attributes: getAttributes(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        return (
            <Fragment>
                <div className={ className }>
                    <h4>{ __('FAQ Item', 'epfl') }</h4>
                    <TextControl
                        label={ __('Question', 'epfl') }
                        value={ attributes.question }
                        onChange={ question => setAttributes( { question } ) }
                    />
                    <label><small>{ __( 'Answer', 'epfl' ) }</small></label>
                        <InnerBlocks
                            template={ TEMPLATE }
                            templateLock="all"
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

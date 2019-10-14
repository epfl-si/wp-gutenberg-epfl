import cardIcon from './card-icon'
import CardPanel from './card-panel';

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
} = wp.editor;

const {
    PanelBody,
    ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

const maxCards = 3;

const getAttributes = () => {
    let atts = {
        grayWrapper: {
            type: 'boolean',
            default: false,
        },
    };

    for (var i = 1; i <= maxCards; i++) {
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

registerBlockType( 'epfl/card', {
	title: __( 'EPFL Card', 'wp-gutenberg-epfl'),
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
                        {[...Array(maxCards)].map((x, i) =>
                            <CardPanel key={i+1} { ...{ attributes, setAttributes, index:i+1 } }  />
                        )}
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

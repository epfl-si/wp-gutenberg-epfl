import {
	hasCommonCategory,
	getTooltippedAttributes,
	getTooltippedExample,
} from '../block-utils.js'

const version = "v1.0.4";

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
	RichText,
} = wp.blockEditor;

const {
    PanelBody,
    TextControl,
    TextareaControl,
    ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/introduction', {
	title: __( 'EPFL Introduction', 'epfl'),
	description: __(
		'Highlight a title and some text',
		'epfl'
	),
	icon: 'text',
	category: hasCommonCategory ? 'common' : 'text',
	attributes: getTooltippedAttributes({
		title: {
			type: 'string',
        },
        content: {
			type: 'string',
        },
        grayBackground: {
            type: 'boolean',
            default: false,
        },
	}),
	example: getTooltippedExample(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
		const { attributes, className, setAttributes } = props

		if ( attributes.asToolTip ) {
			// render the tooltip
			return(
				<Fragment>
					<img src={ blockThumbnails.introduction } />
				</Fragment>
			);
		}

	    return (
            <Fragment>
			<InspectorControls>
				<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/introduction-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
				<p className="wp-block-help">{ version }</p>
				<hr/>
				<ToggleControl
					label={ __('Change the background to gray', 'epfl') }
					checked={ attributes.grayBackground }
					onChange={ () => setAttributes( { grayBackground: ! attributes.grayBackground } ) }
				/>
			</InspectorControls>
	            <div className={ className }>
	                <h2 className="epfl-block-title">{ __('EPFL Introduction', 'epfl') }</h2>
                    <TextControl
						label={ __('Title', 'epfl') }
                        value={ attributes.title }
                        onChange={ title => setAttributes( { title } ) }
                    />
					<label><small>{ __('Content', 'epfl') }</small></label>
                    <RichText
						value={ attributes.content }
						multiline="p"
						onChange={ content => setAttributes( { content } ) }
						placeholder={ __('Write your text here','epfl')}
                    />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

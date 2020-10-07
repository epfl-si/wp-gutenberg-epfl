import {
	hasCommonCategory,
	getTooltippedAttributes,
	getTooltippedExample,
} from '../block-utils.js'

import customHighlightIcon from './custom-highlight-icon'
import { image } from "@wordpress/icons";

const version = "v1.0.2";

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	MediaUpload,
	InspectorControls,
} = wp.blockEditor;

const {
    Placeholder,
    Button,
	TextControl,
	TextareaControl,
	RadioControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/custom-highlight', {
	title: __( 'EPFL Custom Highlight', 'epfl'),
	description: __(
		'Display a link composed of a full width image, a title and a description',
		'epfl'
	),
	icon: customHighlightIcon,
	category: hasCommonCategory ? 'common' : 'design',
	attributes: getTooltippedAttributes({
		title: {
			type: 'string',
		},
		description: {
			type: 'string',
		},
		link: {
			type: 'string',
		},
		buttonLabel: {
			type: 'string',
		},
		imageId: {
			type: 'number',
		},
		imageUrl: {
			type: 'string',
		},
		layout: {
			type: 'string',
			default: 'right',
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
			return (
				<Fragment>
					<img src={ blockThumbnails.customHighlight } />
				</Fragment>
			);
		}

		function onImageSelect(imageObject) {
			setAttributes({
				imageId: imageObject.id,
				imageUrl: imageObject.url
			})
        }

        function onRemoveImage() {
            props.setAttributes({
              imageId: null,
              imageUrl: null,
            })
        }

		let optionsLayoutList = [
		{ value: 'right', label: __('Right', 'epfl')},
		{ value: 'bottom', label: __('Bottom', 'epfl')},
		{ value: 'left', label: __('Left', 'epfl')},
		];

		return (
		<Fragment>
			<InspectorControls>
				<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/custom-highlight-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
				<p className="wp-block-help">{ version }</p>
				<hr/>
				<RadioControl
					label={ __("Select a layout", 'epfl') }
					selected={ attributes.layout }
					options={ optionsLayoutList }
					onChange={ layout => setAttributes( { layout } ) }
				/>
			</InspectorControls>
			<div className={ className }>
				<h2 className="epfl-block-title">{ __('EPFL Custom Highlight', 'epfl') }</h2>
				<TextControl
					label={ __('Title', 'epfl')}
					value={ attributes.title }
					onChange={ title => setAttributes( { title } ) }
				/>
				<TextareaControl
					label={ __('Description', 'epfl')}
					value={ attributes.description }
					onChange={ description => setAttributes( { description } ) }
				/>
				<TextControl
					label={ __('Link', 'epfl') }
					value={ attributes.link }
					onChange={ link => setAttributes( { link } ) }
				/>
				<TextControl
					label={ __('Button label', 'epfl') }
					value={ attributes.buttonLabel }
					onChange={ buttonLabel => setAttributes( { buttonLabel } ) }
				/>
				{ ! attributes.imageId ? (
                    <MediaUpload
                        onSelect={ onImageSelect }
                        type="image"
                        value={ attributes.imageId }
                        render={ ( { open } ) => (
                            <Placeholder
								icon={ image }
                                label={ __("Image", 'epfl') }
                            >
                                <Button
                                    onClick={ open }
									isPrimary={ true }
                                >
                                    { __('Upload', 'epfl') }
                                </Button>
                            </Placeholder>
                        )}
                        />
                       ) : (
                        <p className="epfl-uploader-image-wrapper">
                        <img
                          src={ attributes.imageUrl }
                          alt={ attributes.imageUrl }
                          className="epfl-uploader-img"
                        />

                        { props.isSelected && (

                        <Button
                            className="epfl-uploader-remove-image"
                            onClick={ onRemoveImage }
                            icon="dismiss"
                        >
                            { __('Remove image', 'epfl') }
                        </Button>

                        ) }
                      </p>
                )}
			</div>
		</Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

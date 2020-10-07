import { image } from "@wordpress/icons";

import {
	hasCommonCategory,
	getTooltippedAttributes,
	getTooltippedExample,
} from '../block-utils.js'

import './style.scss'
import coverIcon from './cover-icon'

const version = "v1.0.4";

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
	TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/cover', {
	title: __( 'EPFL Cover', 'epfl'),
	description: __(
		'Display a large image in 16:9 format',
		'epfl'
	),
	icon: coverIcon,
	category: hasCommonCategory ? 'common' : 'design',
	attributes: getTooltippedAttributes({
		imageId: {
			type: 'number',
		},
		imageUrl: {
			type: 'string',
		},
		description : {
			type: 'string',
		}
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
					<img src={ blockThumbnails.cover } />
				</Fragment>
			);
		}

		function onImageSelect(imageObject) {
            setAttributes({
				imageUrl: imageObject.url,
				imageId: imageObject.id
			})
        }

        function onRemoveImage() {
            props.setAttributes({
              imageId: null,
              imageUrl: null,
            })
        }

		return (
		<Fragment>
			<InspectorControls>
				<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/cover-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
				<p className="wp-block-help">{ version }</p>
			</InspectorControls>
			<div className={ className }>
				<h2 className="epfl-block-title">{ __('EPFL Cover', 'epfl') }</h2>
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
				<hr/>
				<TextareaControl
					label={ __('Description', 'epfl')}
					value={ attributes.description }
					onChange={ description => setAttributes( { description } ) }
					help={ __('This description appears when the user clicks on the information icon', 'epfl') }
				/>
			</div>
		</Fragment>
		)

	},
	save: ( props ) => {
		return null;
	},
} );

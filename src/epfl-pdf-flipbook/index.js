import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import flipbookIcon from './flipbook-icon'
import { page as pdf } from "@wordpress/icons";

const version = "v1.0.1";

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
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/pdf-flipbook', {
	title: __( 'EPFL PDF Flipbook', 'epfl'),
	description: __(
		'Embed a PDF into a web page',
		'epfl'
	),
	icon: flipbookIcon,
	category: hasCommonCategory ? 'common' : 'media',
	attributes: getTooltippedAttributes({
		pdfId: {
			type: 'number',
		},
		pdfUrl: {
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
			return(
				<Fragment>
					<img src={ blockThumbnails.pdf } />
				</Fragment>
			);
		}

		const ALLOWED_MEDIA_TYPES = ['application/pdf'];

		function onPDFSelect(pdfObject) {
            setAttributes({
				pdfUrl: pdfObject.url,
				pdfId: pdfObject.id
			})
        }

        function onRemovePDF() {
            props.setAttributes({
              pdfId: null,
              pdfUrl: null,
            })
        }

		return (
		<Fragment>
			<InspectorControls>
				<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/pdf-flipbook-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
				<p className="wp-block-help">{ version }</p>
			</InspectorControls>
			<div className={ className }>
				<h2 className="epfl-block-title">{ __('EPFL PDF Flipbook', 'epfl') }</h2>
				{ ! attributes.pdfId ? (
                    <MediaUpload
                        onSelect={ onPDFSelect }
                        allowedTypes= { ALLOWED_MEDIA_TYPES }
                        value={ attributes.pdfId }
                        render={ ( { open } ) => (
                            <Placeholder
								icon={ pdf }
                                label={ __("PDF", 'epfl') }
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
                        <p className="epfl-uploader-file-wrapper">
							{ attributes.pdfUrl }

                        <Button
                            className="epfl-uploader-remove-file"
                            onClick={ onRemovePDF }
                            icon="dismiss"
                        >
                            { __('Remove PDF', 'epfl') }
                        </Button>

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

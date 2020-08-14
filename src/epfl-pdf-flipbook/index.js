
import flipbookIcon from './flipbook-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	MediaUpload,
	InspectorControls,
} = wp.editor;

const {
    Placeholder,
    IconButton,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/pdf-flipbook', {
	title: __( 'EPFL PDF Flipbook', 'epfl'),
	description: 'v1.0.1',
	icon: flipbookIcon,
	category: 'common',
	attributes: {
		pdfId: {
			type: 'number',
		},
		pdfUrl: {
			type: 'string',
		}
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {

		const { attributes, className, setAttributes } = props
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
				<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/pdf-flipbook-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
			</InspectorControls>
			<div className={ className }>
				<h2>{ __('EPFL PDF Flipbook', 'epfl') }</h2>
				{ ! attributes.pdfId ? (
                    <MediaUpload
                        onSelect={ onPDFSelect }
                        allowedTypes= { ALLOWED_MEDIA_TYPES }
                        value={ attributes.pdfId }
                        render={ ( { open } ) => (
                            <Placeholder
                                icon="images-alt"
                                label={ __("PDF", 'epfl') }
                                instructions={ __('Please, select a PDF', 'epfl') }
                            >
                                <IconButton
                                    className="components-icon-button wp-block-file__upload-button button button-large"
                                    onClick={ open }
                                    icon="upload"
                                >
                                    { __('Upload', 'epfl') }
                                </IconButton>
                            </Placeholder>
                        )}
                        />
                       ) : (
                        <p className="epfl-uploader-file-wrapper">
							{ attributes.pdfUrl }
                        
                        <IconButton
                            className="epfl-uploader-remove-file"
                            onClick={ onRemovePDF }
                            icon="dismiss"
                        >
                            { __('Remove PDF', 'epfl') }
                        </IconButton>

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

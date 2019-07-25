const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
    MediaUpload,
	InspectorControls,
} = wp.editor;

const {
    PanelBody,
    TextControl,
    TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/hero', {
	title: __( 'EPFL Hero', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: 'text',
	category: 'common',
	attributes: {
		title: {
			type: 'string',
        },
        text: {
			type: 'string',
        },
        imageId: {
            type: 'number',
        },
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props
        
        function onImageSelect(imageObject) {
			setAttributes({
				imageId: imageObject.id
			})
		}
        
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={ __('Title', 'wp-gutenberg-epfl') }>
                        <TextControl
                            value={ attributes.title }
                            onChange={ title => setAttributes( { title } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __('Text', 'wp-gutenberg-epfl') }>
                        <TextareaControl
                            value={ attributes.text }
                            onChange={ text => setAttributes( { text } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __('Select Image', 'wp-gutenberg-epfl') }>
                        <MediaUpload
                            onSelect={onImageSelect}
                            type="image"
                            value={attributes.imageId}
                            render={({ open }) => (
                                <div>
                                    <button onClick={open}>
                                    { __('Upload Image!', 'wp-gutenberg-epfl') }
                                    </button>
                                    <div style={ {marginTop: '5px'} }>{ __('Please, select a image. Recommended image size: 1920x1080', 'wp-gutenberg-epfl') }</div>
                                </div>
                            )}
                        />
				    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <div id="preview-box">
                        <h2>EPFL HERO</h2>
                        <div className="helper">{ __('Please fill the fields in the right-hand column', 'wp-gutenberg-epfl') }</div>
                    </div>
                </div>
            </Fragment>
		)		
	},
	save: ( props ) => {
		return null;
	},
} );
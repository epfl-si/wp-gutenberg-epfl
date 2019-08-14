import customHighlightIcon from './custom-highlight-icon'

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
	RadioControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/custom-highlight', {
	title: __( 'EPFL Custom Highlight', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: customHighlightIcon,
	category: 'common',
	attributes: {
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
		
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props
        
        function onImageSelect(imageObject) {
			setAttributes({
                imageId: imageObject.id,
                imageUrl: imageObject.url
			})
		}

		let optionsLayoutList = [
            { value: 'right', label: __('Right', 'wp-gutenberg-epfl')},
            { value: 'bottom', label: __('Bottom', 'wp-gutenberg-epfl')},
            { value: 'left', label: __('Left', 'wp-gutenberg-epfl')},
        ];
        
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={ __('Title', 'wp-gutenberg-epfl') }>
                        <TextControl
                            value={ attributes.title }
                            onChange={ title => setAttributes( { title } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __('Description', 'wp-gutenberg-epfl') }>
                        <TextareaControl
                            value={ attributes.description }
                            onChange={ description => setAttributes( { description } ) }
                        />
                    </PanelBody>
					<PanelBody title={ __('Link', 'wp-gutenberg-epfl') }>
                        <TextControl
                            value={ attributes.link }
                            onChange={ link => setAttributes( { link } ) }
                        />
                    </PanelBody>
					<PanelBody title={ __('Button label', 'wp-gutenberg-epfl') }>
                        <TextControl
                            value={ attributes.buttonLabel }
                            onChange={ buttonLabel => setAttributes( { buttonLabel } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __('Select Image', 'wp-gutenberg-epfl') }>
                        <MediaUpload
                            onSelect={onImageSelect}
                            type="image"
                            value={attributes.imageId}
                            render={({ open }) => (
                                <div>
                                    <img style={ {maxHeight: '200px'} } src={ attributes.imageUrl } />
                                    <button onClick={open}>
                                    { __('Upload Image!', 'wp-gutenberg-epfl') }
                                    </button>
                                    <div style={ {marginTop: '5px'} }>{ __('Please, select a image. Recommended image size: 1920x1080', 'wp-gutenberg-epfl') }</div>
                                </div>
                            )}
                        />
				    </PanelBody>
					<PanelBody title={ __( 'Layout', 'wp-gutenberg-epfl' ) }>
                    <RadioControl
                        label={ __("Select a layout", 'wp-gutenberg-epfl') }
                        selected={ attributes.layout }
                        options={ optionsLayoutList }
                        onChange={ layout => setAttributes( { layout } ) }
                    />
                </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <div id="preview-box">
                        <h2>EPFL Custom Highlight</h2>
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

const { __ } = wp.i18n

const {
    MediaUpload,
    RichText,
} = wp.editor;

const {
    TextControl,
    TextareaControl,
    PanelBody
} = wp.components;


function CardPanel ( props ) {
    const { attributes, setAttributes, index } = props;

    const setIndexedAttributes = (field_name, value) => {
        setAttributes({[`${field_name}${index}`]: value});
     };

    const onImageSelect = (imageObject) => {
        setAttributes({
            [`imageUrl${index}`]: imageObject.sizes.full.url,
            [`imageId${index}`]: imageObject.id
        })
    };

    // set a value or an empty string for each Control, or face :
    // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input

    return (
        <div>
            <PanelBody title={`Card ${index}`} initialOpen={false}>
                <TextControl
                    label={ __('Title (mandatory)', 'wp-gutenberg-epfl') }
                    value={ attributes['title' + index] || ''}
                    onChange={ value => setIndexedAttributes('title', value) }
                />
                <TextControl
                    label={ __('Link', 'wp-gutenberg-epfl') }
                    value={ attributes['link' + index]  || '' }
                    onChange={ value => setIndexedAttributes('link', value) }
                />
                <MediaUpload
                    onSelect={ onImageSelect }
                    type="image"
                    value={ attributes['imageUrl' + index]  || '' }
                    render={({ open }) => (
                        <div class="components-base-control">
                            <img style={ {maxHeight: '200px'} } src={ attributes['imageUrl' + index] } />
                            <button onClick={ open }>
                            { __('Select Image', 'wp-gutenberg-epfl') }
                            </button>
                            <div style={ { marginTop: '5px' } }>{ __('Please select an image. Recommended image size: 1920x1080', 'wp-gutenberg-epfl') }</div>
                        </div>
                    )}
                />
                <label><small>Text</small></label>
                <RichText
                        value={ attributes['content' + index]  || ''}
                        onChange={ value => setIndexedAttributes('content', value) }
                        tagName="div"
                        multiline="p"
                        placeholder={ __('Write your text here','wp-gutenberg-epfl')}
                        keepPlaceholderOnFocus = { true }
                        allowedFormats={[]}
                />
            </PanelBody>
        </div>
    );
}

export default CardPanel;

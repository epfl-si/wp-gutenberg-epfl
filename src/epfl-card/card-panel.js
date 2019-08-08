
const { __ } = wp.i18n

const {
    MediaUpload,
} = wp.editor;

const {
    PanelBody,
    TextControl,
    TextareaControl,
} = wp.components;


function CardPanel ( props ) {
    const { attributes, setAttributes, index } = props;

    const setIndexedAttributes = (field_name, value) => {
        setAttributes({[`${field_name}${index}`]: value});
     };

    const onImageSelect = (imageObject) => {
        setAttributes({
            [`image${index}`]: imageObject.sizes.full.url,
            [`imageId${index}`]: imageObject.id
        })
    };

    // set a value or an empty string for each Control, or face :
    // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input

    return (
        <PanelBody title={`Card ${index}`} >
            <TextControl
                label={ __('Title', 'wp-gutenberg-epfl') }
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
                value={ attributes['image' + index]  || '' }
                render={({ open }) => (
                    <div>
                        <button onClick={ open }>
                        { __('Upload Image', 'wp-gutenberg-epfl') }
                        </button>
                        <div style={ { marginTop: '5px' } }>{ __('Recommended image size: ???', 'wp-gutenberg-epfl') }</div>
                    </div>
                )}
            />
             <TextareaControl
                label={ __('Text', 'wp-gutenberg-epfl') }
                value={ attributes['content' + index]  || ''}
                onChange={ value => setIndexedAttributes('content', value) }
            />
        </PanelBody>
    );
}

export default CardPanel;


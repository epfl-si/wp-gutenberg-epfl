
const { __ } = wp.i18n

const {
    MediaUpload,
    RichText,
} = wp.editor;

const {
    TextControl,
    Placeholder,
    IconButton,
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

    const onRemoveImage = () => {
        setAttributes({
            [`imageUrl${index}`]: null,
            [`imageId${index}`]: null,
        })
    }

    let isSelected = ! attributes['imageId' + index] || ! attributes['imageUrl' + index];

    // set a value or an empty string for each Control, or face :
    // https://stackoverflow.com/questions/37427508/react-changing-an-uncontrolled-input
    
    return (
        <div>
            <h4>{`Card ${index}`}</h4>
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
            { isSelected ? (
                <MediaUpload
                    onSelect={ onImageSelect }
                    type="image"
                    value={ attributes['imageId' + index] }
                    render={ ( { open } ) => (
                        <Placeholder
                            icon="images-alt"
                            label={ __("Image", 'wp-gutenberg-epfl') }
                            instructions={ __('Please, select an image', 'wp-gutenberg-epfl') }
                        >
                            <IconButton
                                className="components-icon-button wp-block-image__upload-button button button-large"
                                onClick={ open }
                                icon="upload"
                            >
                                { __('Upload', 'wp-gutenberg-epfl') }
                            </IconButton>
                        </Placeholder>
                    )}
                />
                ) : (
                    <p className="epfl-uploader-image-wrapper">
                    <img
                        src={ attributes['imageUrl' + index] }
                        alt={ attributes['imageUrl' + index] }
                        class="epfl-uploader-img"
                    />

                    { props.attributes['imageUrl' + index] && (
        
                    <IconButton
                        className={'epfl-uploader-remove-image'}
                        onClick={ onRemoveImage }
                        icon="dismiss"
                    >
                        { __('Remove image', 'wp-gutenberg-epfl') }
                    </IconButton>

                    ) }
                    </p>
                )}
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
            <hr/>
        </div>
    );
}

export default CardPanel;

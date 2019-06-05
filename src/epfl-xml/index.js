
import xmlIcon from './xml-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.editor;

const {
    PanelBody,
    TextControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/xml', {
	title: __( 'EPFL XML', 'wp-gutenberg-epfl'),
	description: __('Display XML/XSLT', 'wp-gutenberg-epfl'),
	icon: xmlIcon,
	category: 'common',
	attributes: {
        xmlUrl: {
			type: 'url',
        },
        xsltUrl: {
			type: 'url',
        },
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props
        
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={ __('XML URL', 'wp-gutenberg-epfl') }>
                        <TextControl
                            value={ attributes.xmlUrl }
                            onChange={ url => setAttributes( { xmlUrl } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __('XSLT URL', 'wp-gutenberg-epfl') }>
                        <TextControl
                            value={ attributes.xsltUrl }
                            onChange={ url => setAttributes( { xsltUrl } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <div id="preview-box">
                        <h2>EPFL XML/XSLT</h2>
                        <div class="helper">{ __('Please fill the fields in the right-hand column', 'wp-gutenberg-epfl') }</div>
                    </div>
                </div>
            </Fragment>
		)		
	},
	save: ( props ) => {
		return null;
	},
} );

import tableauIcon from './tableau-icon'

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
    TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/tableau', {
	title: __( 'EPFL Tableau', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: tableauIcon,
	category: 'common',
	attributes: {
        content: {
            type: 'string',
        },
        url: {
			type: 'url',
        },
        width: {
			type: 'string',
        },
        height: {
            type: 'string',
        }
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props
        
        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={ __('EPFL Tableau content', 'wp-gutenberg-epfl') }>
                        <TextareaControl
                            value={ attributes.content }
                            onChange={ content => setAttributes( { content } ) }
                            help={ __('Paste here the content of the Embed Code when you press the "Share" button on an EPFL tableau view', 'wp-gutenberg-epfl') }
                        />
                    </PanelBody>
                    
                    <PanelBody title={ __('OR ', 'wp-gutenberg-epfl') }>
                        <label>URL</label>
                        <TextControl
                            value={ attributes.url }
                            onChange={ url => setAttributes( { url } ) }
                            help={ __('Url of the view (eg. "EPFLofficialstatistics/StatistiquesOfficielles")', 'wp-gutenberg-epfl') }
                        />
                        <label>Width</label>
                        <TextControl
                            value={ attributes.width }
                            onChange={ width => setAttributes( { width } ) }
                        />
                        <label>Height</label>
                        <TextControl
                            value={ attributes.height }
                            onChange={ height => setAttributes( { height } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <div id="preview-box">
                        <h2>EPFL TABLEAU</h2>
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
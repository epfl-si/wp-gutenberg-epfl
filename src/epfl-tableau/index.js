
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
					<hr/>
						<h4>For an URL</h4>
                        <TextControl
							label={ __('Width', 'wp-gutenberg-epfl') }
                            value={ attributes.width }
                            onChange={ width => setAttributes( { width } ) }
                        />
                        <TextControl
							label={ __('Height', 'wp-gutenberg-epfl') }
                            value={ attributes.height }
                            onChange={ height => setAttributes( { height } ) }
                        />
                </InspectorControls>
                <div className={ className }>
                    <h2>EPFL TABLEAU</h2>
                        <TextareaControl
							label={ __('EPFL Tableau content', 'wp-gutenberg-epfl') }
                            value={ attributes.content }
                            onChange={ content => setAttributes( { content } ) }
                            help={ __('Paste here the content of the Embed Code when you press the "Share" button on an EPFL tableau view', 'wp-gutenberg-epfl') }
                        />
                    <h4>OR</h4>
                        <TextControl
							label={ __('URL', 'wp-gutenberg-epfl') }
                            value={ attributes.url }
                            onChange={ url => setAttributes( { url } ) }
                            help={ __('Url of the view (eg. "EPFLofficialstatistics/StatistiquesOfficielles")', 'wp-gutenberg-epfl') }
                        />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

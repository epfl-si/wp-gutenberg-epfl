
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
	description: 'v1.0.3',
	icon: tableauIcon,
	category: 'common',
	attributes: {
        embedCode: {
            type: 'string',
        },
        tableauName: {
			type: 'string',
        },
        width: {
			type: 'integer',
        },
        height: {
            type: 'integer',
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
                    <p><a class="wp-block-help" href={ __('https://www.epfl.ch/campus/services/tableau-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
					<hr/>
						<h4>Tableau dimensions</h4>
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
                            value={ attributes.embedCode }
                            onChange={ embedCode => setAttributes( { embedCode } ) }
                            help={ __('Paste here the content of the Embed Code when you press the "Share" button on an EPFL tableau view', 'wp-gutenberg-epfl') }
                        />
                    <h4>OR</h4>
                        <TextControl
							label={ __('Tableau Name', 'wp-gutenberg-epfl') }
                            value={ attributes.tableauName }
                            onChange={ tableauName => setAttributes( { tableauName } ) }
                            help={ __('Name of the Tableau view (eg. "EPFLofficialstatistics/StatistiquesOfficielles")', 'wp-gutenberg-epfl') }
                        />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

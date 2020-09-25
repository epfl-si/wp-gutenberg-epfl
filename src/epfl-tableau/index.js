import { hasCommonCategory } from '../block-utils.js'

import tableauIcon from './tableau-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.blockEditor;

const {
    TextControl,
    TextareaControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/tableau', {
	title: __( 'EPFL Tableau', 'epfl'),
	description: 'v1.0.7',
	icon: tableauIcon,
    category: hasCommonCategory ? 'common' : 'embed',
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
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/tableau-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
					<hr/>
						<h4>{ __('Dimensions', 'epfl') }</h4>
                        <TextControl
							label={ __('Width', 'epfl') }
                            value={ attributes.width }
                            placeholder = "1000"
                            onChange={ width => {
                                width = Number(width);
                                setAttributes( { width } );
                            }}
                        />
                        <TextControl
							label={ __('Height', 'epfl') }
                            value={ attributes.height }
                            placeholder = "650"
                            onChange={ height => {
                                height = Number(height);
                                setAttributes( { height } );
                            }}
                        />
                </InspectorControls>
                <div className={ className }>
                    <h2 className="epfl-block-title">{ __('EPFL Tableau', 'epfl') }</h2>
                        <TextareaControl
							label={ __('Embed code', 'epfl') }
                            value={ attributes.embedCode }
                            onChange={ embedCode => setAttributes( { embedCode } ) }
                            help={ __('Paste here the content of the Embed Code when you press the "Share" button on an EPFL tableau view', 'epfl') }
                        />
                    <h4>{ __('OR', 'epfl') }</h4>
                        <TextControl
							label={ __('Tableau ID', 'epfl') }
                            value={ attributes.tableauName }
                            onChange={ tableauName => setAttributes( { tableauName } ) }
                            help={ __('Name of the Tableau view (eg. "EPFLofficialstatistics/StatistiquesOfficielles")', 'epfl') }
                        />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

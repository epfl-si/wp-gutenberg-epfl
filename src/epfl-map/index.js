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

registerBlockType( 'epfl/map', {
	title: __( 'EPFL Map', 'epfl'),
	description: 'v1.0.3',
	icon: 'admin-site-alt',
	category: 'common',
	attributes: {
		query: {
			type: 'string',
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
					<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/map-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
				</InspectorControls>
                <div className={ className }>
                    <h2>{ __('EPFL MAP', 'epfl') }</h2>
                    <TextControl
                        value={ attributes.query }
                        onChange={ query => setAttributes( { query } ) }
                        help={ __('A room for example: INN011', 'epfl') }
                    />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

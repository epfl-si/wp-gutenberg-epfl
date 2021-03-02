import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

const version = "v1.1.0";

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.blockEditor;

const {
	PanelBody,
	TextControl,
	SelectControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/map', {
	title: __( 'EPFL Map', 'epfl'),
	description: __(
		'Display a map from map.epfl.ch',
		'epfl'
	),
	icon: 'admin-site-alt',
	category: hasCommonCategory ? 'common' : 'embed',
	attributes: getTooltippedAttributes({
		query: {
			type: 'string',
		},
		searchType: {
			type: 'string',
			default: 'searchAll',
		},
	}),
	example: getTooltippedExample(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
		const { attributes, className, setAttributes } = props

		if ( attributes.asToolTip ) {
			// render the tooltip
			return(
				<Fragment>
					<img src={ blockThumbnails.map } />
				</Fragment>
			);
		}

			return (
				<Fragment>
					<InspectorControls>
						<p><a className="wp-block-help" href={__('https://www.epfl.ch/campus/services/website/map-en/', 'epfl')}
									target="new">{__('Online help', 'epfl')} </a></p>
						<p className="wp-block-help">{version}</p>
					</InspectorControls>
					<div className={className}>
						<h2 className="epfl-block-title">{__('EPFL Map', 'epfl')}</h2>
						<p>{ __('Rechercher à partir de :', 'epfl') }
							<SelectControl
								value={ attributes.searchType }
								options={ [
									{ label: __('Query', 'epfl'), value: 'searchAll' },
									{ label: __('A specific room', 'epfl'), value: 'searchRoom' },
									{ label: __('An URL copy-pasted from plan.epfl.ch', 'epfl'), value: 'searchURL' },
								] }
								onChange={ searchType => setAttributes({searchType}) }
							/>
							<TextControl
								value={attributes.query}
								onChange={query => setAttributes({query})}
							/>
						</p>
					</div>
				</Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

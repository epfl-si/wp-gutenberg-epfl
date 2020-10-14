import {
	hasCommonCategory,
	getTooltippedAttributes,
	getTooltippedExample,
} from '../block-utils.js'

import infoscienceIcon from './infoscience-icon'
import InspectorControlsInfoscience from './inspector'
import React from "react";

const version = "v1.1.2";

const { __ } = wp.i18n;

const {
	InspectorControls,
} = wp.blockEditor

const {
	registerBlockType,
} = wp.blocks;

const { Fragment } = wp.element;

registerBlockType( 'epfl/infoscience-search', {
	title: __( 'EPFL Infoscience', 'epfl'),
	description: __(
		'Display a list of publications from Infoscience',
		'epfl'
	),
	icon: infoscienceIcon,
	category: hasCommonCategory ? 'common' : 'embed',
	attributes: getTooltippedAttributes({
		url: {
			type: 'string',
		},
		pattern: {
			type: 'string',
		},
		field: {
			type: 'string',
		},
		operator2: {
			type: 'string',
		},
		pattern2: {
			type: 'string',
		},
		field2: {
			type: 'string',
		},
		operator3: {
			type: 'string',
		},
		pattern3: {
			type: 'string',
		},
		field3: {
			type: 'string',
		},
		format: {
			type: 'string',
			default: 'short'
		},
		limit: {
			type: 'integer',
		},
		summary: {
			type: 'boolean',
			default: false,
		},
		thumbnail: {
			type: 'boolean',
			default: true,
		},
		sort :{
			type: 'string',
			default: 'desc'
		},
		groupBy: {
			type: 'string',
			default: null,
		},
		debug: {
			type: 'boolean',
			default: null,
		},
		debugData: {
			type: 'boolean',
			default: null,
		},
		debugTemplate: {
			type: 'boolean',
			default: null,
		}
	}),
	example: getTooltippedExample(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {

		const { attributes, className, setAttributes } = props

		if ( attributes.asToolTip ) {
			// render the tooltip
			return (
				<Fragment>
					<img src={ blockThumbnails.infoscience } />
				</Fragment>
			);
		}

		return (
		<Fragment>
			<InspectorControls>
				<p className="wp-block-help">{ version }</p>
			</InspectorControls>
			<div className={ className }>
				<InspectorControlsInfoscience { ...{ attributes, setAttributes } } />
                <div id="preview-box">
                    <h2 className="epfl-block-title">{ __('EPFL Infoscience', 'epfl') }</h2>
                    <div className="helper">{ __('Please fill the fields in the right-hand column', 'epfl') }</div>
                </div>
			</div>
		</Fragment>
		)

	},
	save: props => {
		return null
	},
} );

import {
	hasCommonCategory,
	getTooltippedAttributes,
	getTooltippedExample,
} from '../block-utils.js'

import infoscienceIcon from './infoscience-icon'
import InspectorControlsInfoscience from './inspector'
import React from "react";

const version = "v2.0.0";

const { __ } = wp.i18n;

const {
	InspectorControls,
} = wp.blockEditor

const {
	registerBlockType,
	createBlock,
} = wp.blocks;

const { Fragment } = wp.element;

registerBlockType( 'epfl/infoscience-search', {
	title: 'EPFL Infoscience (obsolete)',
	description: __(
		'Do not use, this block is obsolete. Please migrate.',
		'epfl'
	),
	icon: infoscienceIcon,
	category: '',
	variations: [
		{
			name: 'epfl/infoscience-search-dspace',
			title: __('EPFL Infoscience', 'epfl'),
			description: __(
				'Display a list of publications from Infoscience',
				'epfl'
			),
			example: getTooltippedExample(),
			category: hasCommonCategory ? 'common' : 'embed',
			attributes: { serverEngine: 'dspace' },
			isActive: (blockAttributes, variationAttributes) =>
				blockAttributes.serverEngine === 'dspace',
			scope: ['block', 'inserter', 'transform'],

		},
	],
	transforms: {
		to: [
			{
				type: 'block',
				blocks: ['epfl/infoscience-search'],
				transform: (attributes) => {
					return createBlock(
						'epfl/infoscience-search',
						{ 'serverEngine': 'dspace', ...attributes },
					)
				},
			},
		],
	},
	attributes: getTooltippedAttributes({
		serverEngine: {
			type: 'string',
			default: 'invenio',
		},
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
		},
		deactivateCache: {
			type: 'boolean',
			default: null,
		}
	}),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: (props) => {

		const { attributes, className, setAttributes } = props

		if (attributes.asToolTip) {
			// render the tooltip
			return (
				<Fragment>
					<img src={ blockThumbnails.infoscience }/>
				</Fragment>
			)
		}

		return (
			<Fragment>
				<InspectorControls>
					<p className="wp-block-help">{ version }</p>
				</InspectorControls>
				<div className={ className }>
					<InspectorControlsInfoscience { ...{ attributes, setAttributes } } />
					{ attributes.serverEngine && attributes.serverEngine === 'dspace' ?
						<div id="preview-box">
							<h2 className="epfl-block-title">{ __('EPFL Infoscience', 'epfl') }</h2>
							<div className="helper">{ __('Please fill the fields in the right-hand column', 'epfl') }</div>
						</div> :
						<div id="preview-box">
							<h2 className="epfl-block-title">{ __('Obsolete EPFL Infoscience', 'epfl') }</h2>
							<div className="helper" style={ { 'textAlign': 'left' } }>
								<div style={ {
									'marginBottom': '12px',
									'textAlign': 'center'
								} }>{ __('This publication list is static. This block is obsolete.', 'epfl') }</div>
								<div>
									<div style={ { 'marginBottom': '12px', 'marginLeft': '24px' } }>
										{ __('Please follow this steps to migrate into a dynamic list on the new Infoscience:', 'epfl') }
									</div>
									<div style={ { 'marginLeft': '48px' } }>
										<div>{ __('1. While this block is selected, on the right side menu, select the \'Block\' tab.', 'epfl') }</div>
										<div>{ __('2. Then, click on the dropdown \'Transform to variation\' and select \'EPFL Infoscience\'', 'epfl') }</div>
									</div>
								</div>
							</div>
						</div>
					}
				</div>
			</Fragment>
		)
	},
	save: props => {
		return null
	},
});

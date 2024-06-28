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

const {
  TextareaControl,
} = wp.components;

const { decodeEntities } = wp.htmlEntities;

const { Fragment } = wp.element;

import { transformInvenioURLToDSpaceURL } from './transform'

registerBlockType( 'epfl/infoscience-search', {
	title: 'EPFL Infoscience (obsolete)',
	description: __(
		'Do not use, this block is obsolete. Please migrate.',
		'epfl'
	),
	icon: infoscienceIcon,
	category: hasCommonCategory ? 'common' : 'embed',
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

    const proposedMigrationUrl = attributes.url ?
      transformInvenioURLToDSpaceURL( decodeEntities(attributes.url) ) :
      ''

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
							<h2 className="epfl-block-title" style={ { 'backgroundColor': '#B51F1F' }}>{ __('EPFL Infoscience', 'epfl') } (Obsolete)</h2>
							<div className="helper" style={ { 'textAlign': 'left' } }>
								<div style={ {
									'marginBottom': '12px',
									'textAlign': 'center'
								} }>{ __('This block is obsolete. As a result, it will provide a static list of publication.', 'epfl') }</div>
								<div>
									<div style={ { 'marginBottom': '12px', 'marginLeft': '24px' } }>
										{ __('Please follow this steps to migrate into a dynamic list on the new Infoscience:', 'epfl') }
									</div>
									<div style={ { 'marginLeft': '48px' } }>
                    <ol>
                      <li>
                        <span>{ __('The first task it to build your correct url. Based on your current URL, the system may propose this one:', 'epfl') }</span>
                        <div><a href={ proposedMigrationUrl } target={ '_blank' }>{ proposedMigrationUrl }</a></div>
                      </li>
                      <li>
                        <span>{ __('Open the proposed URL and check that the result is corresponding to your likings or create a new URL on infoscience.epfl.ch', 'epfl') }</span>
                        <TextareaControl
                          value={ proposedMigrationUrl }
                          readonly
                          style={ { backgroundColor:'#EBEBE4' } }
                          //onChange={ url => setAttributes( { url } ) }
                        ></TextareaControl>
                      </li>
                      <li>{ __('While this block is selected, on the right side menu, select the \'Block\' tab.', 'epfl') }</li>
                      <li>{ __('Then, click on the dropdown \'Transform to variation\' and select \'EPFL Infoscience\'', 'epfl') }</li>
                    </ol>
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

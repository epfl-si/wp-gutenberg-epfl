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
  Button,
  TextareaControl,
} = wp.components;

const { decodeEntities } = wp.htmlEntities;

const { Fragment, useState } = wp.element;

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
			scope: ['block', 'inserter'],
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
	edit: ({ attributes, className, setAttributes }) => {

    const [ proposedMigrationUrl, setProposedMigrationUrl ] = useState( attributes.url ?
      transformInvenioURLToDSpaceURL( decodeEntities(attributes.url) ) :
      '' );

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
					{ attributes.serverEngine === 'dspace' ?
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
                } }>{ __('The new Infoscience site has been deployed. This block is now obsolete.', 'epfl') }
                </div>
                <div style={ {
                  'marginBottom': '12px',
                  'textAlign': 'center'
                } }>{ __('As a result, this block provide only a static list of the last known publications from the old system.', 'epfl') }
                </div>
                <div>
                  <div style={ { 'marginBottom': '12px', 'marginLeft': '24px' } }>
                    { __('I you want to migrate into a dynamic list, please follow this steps:', 'epfl') }
                  </div>
                  <div style={ { 'marginLeft': '48px', 'marginRight': '48px' } }>
                    <ul>
                      <li>
                        <span>{ __('Build your new url by going to ', 'epfl') }<a
                          href="https://infoscience.epfl.ch" target="_blank">Infoscience</a>
                        </span>
                        <span>
                          { __(' and paste the new url below.', 'epfl') }
                        </span>
                        { proposedMigrationUrl &&
                          <span>
                            { __(' Or, based on your old URL, use the proposed one below:', 'epfl') }
                          </span>
                        }
                        <div>
                          <TextareaControl
                            value={ proposedMigrationUrl }
                            onChange={ textValue => setProposedMigrationUrl(textValue) }
                          ></TextareaControl>
                        </div>
                      </li>
                      <span className={'mt-1'}>
                        <Button
                          variant="primary"
                          onClick={
                            event => setAttributes({ url: proposedMigrationUrl, serverEngine: 'dspace' })
                          }
                        >Migrate to a dynamic list
                        </Button>
                      </span>
                    </ul>
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

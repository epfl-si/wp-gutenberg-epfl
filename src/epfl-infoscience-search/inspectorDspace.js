import React from 'react';

const { __ } = wp.i18n
const { Component } = wp.element

const {
  InspectorControls,
} = wp.blockEditor

const {
    PanelBody,
  TextControl,
  TextareaControl,
  SelectControl,
  RadioControl,
  ToggleControl,
} = wp.components;


export default class InspectorControlsDspace extends Component {
    render() {
      const { attributes, setAttributes } = this.props

    let optionsFormat = [
      { value: 'short', label: __('Short', 'epfl') },
      { value: 'detailed', label: __('Detailed', 'epfl') },
    ];

    let optionsSort = [
      { value: 'desc', label: __('Descending', 'epfl') },
      { value: 'asc', label: __('Ascending', 'epfl') },
    ]

    let optionsGroupBy = [
      { value: null, label: '' },
      { value: 'year', label: __('Year', 'epfl') },
      { value: 'year_doctype', label: __('Year, then document type', 'epfl') },
      { value: 'doctype', label: __('Document type', 'epfl') },
      { value: 'doctype_year', label: __('Document type, then year', 'epfl') },
    ]

    return <>
      <InspectorControls>
        <PanelBody title={ __('A direct infoscience URL', 'epfl') }>
          <TextareaControl
            value={ attributes.url }
            onChange={ url => setAttributes( { url } ) }
            placeholder={ __('a https://infoscience.epfl.ch/search?... url', 'epfl') }
          />
        </PanelBody>
        <PanelBody title={ __('Limit', 'epfl') }>
          <TextControl
            value={ attributes.limit }
            onChange={ limit => {
              limit = Number(limit);
              setAttributes( { limit } );
              }}
            placeholder={ '20' }
            help={ __('Without a limit only the first 20 publications are shown', 'epfl') }
          />
        </PanelBody>
        <PanelBody title={ __('Sort', 'epfl') }>
          <RadioControl
                        selected={ attributes.sort }
                        options={ optionsSort }
            onChange={ sort => setAttributes( { sort } ) }
          />
        </PanelBody>
        <PanelBody title={ __('Options', 'epfl') } >
          <SelectControl
            label={ __('Group by with titles', 'epfl') }
            value={ attributes.groupBy }
            onChange={ groupBy => setAttributes( { groupBy } ) }
            options={ optionsGroupBy }
          />
          <RadioControl
            label={ __('Format', 'epfl') }
                        selected={ attributes.format }
                        help={ __('Detail level for a publication', 'epfl') }
                        options={ optionsFormat }
            onChange={ format => setAttributes( { format } ) }
          />
          <ToggleControl
            label={ __('Summaries', 'epfl') }
            checked={ attributes.summary }
            onChange={ summary => setAttributes( { summary } ) }
          />
          <ToggleControl
            label={ __('Thumbnails', 'epfl') }
                        checked={ attributes.thumbnail }
            onChange={ thumbnail => setAttributes( { thumbnail } ) }
          />
        </PanelBody>
      </InspectorControls>
    </>
    }
}

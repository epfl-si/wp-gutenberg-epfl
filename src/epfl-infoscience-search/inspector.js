import React from 'react';

const { __ } = wp.i18n
const { Component } = wp.element

const {
	InspectorControls,
} = wp.editor

const {
    PanelBody,
	TextControl,
	TextareaControl,
	SelectControl,
	RadioControl,
	ToggleControl,
} = wp.components;


export default class InspectorControlsInfoscience extends Component {

    render() {

        const { attributes, setAttributes } = this.props

        let optionsFormat = [
            { value: 'short', label: __('Short', 'wp-gutenberg-epfl') },
            { value: 'detailed', label: __('Detailed', 'wp-gutenberg-epfl') },
		];

		let optionsFieldFilter = [
            { value: 'any', label: __('Any field', 'wp-gutenberg-epfl') },
            { value: 'author', label: __('Author', 'wp-gutenberg-epfl') },
            { value: 'title', label: __('Title', 'wp-gutenberg-epfl') },
            { value: 'year', label: __('Year', 'wp-gutenberg-epfl') },
            { value: 'unit', label: __('Unit', 'wp-gutenberg-epfl') },
            { value: 'collection', label: __('Collection', 'wp-gutenberg-epfl') },
            { value: 'journal', label: __('Journal', 'wp-gutenberg-epfl') },
            { value: 'publisher', label: __('Publisher', 'wp-gutenberg-epfl') },
            { value: 'abstract', label: __('Abstract', 'wp-gutenberg-epfl') },
            { value: 'keyword', label: __('Keyword', 'wp-gutenberg-epfl') },
            { value: 'doi', label: __('DOI', 'wp-gutenberg-epfl') },
		]

		let optionsSort = [
			{ value: 'desc', label: __('Descending', 'wp-gutenberg-epfl') },
			{ value: 'asc', label: __('Ascending', 'wp-gutenberg-epfl') },
		]

		let optionsGroupBy = [
			{ value: null, label: '' },
			{ value: 'year', label: __('Year', 'wp-gutenberg-epfl') },
			{ value: 'year_doctype', label: __('Year, then document type', 'wp-gutenberg-epfl') },
			{ value: 'doctype', label: __('Document type', 'wp-gutenberg-epfl') },
			{ value: 'doctype_year', label: __('Document type, then year', 'wp-gutenberg-epfl') },
		]

        let content = "";

        content = (
            <InspectorControls>
				<PanelBody title={ __('A direct infoscience URL', 'wp-gutenberg-epfl') }>
					<TextareaControl
						value={ attributes.url }
						onChange={ url => setAttributes( { url } ) }
						placeholder={ __('a https://infoscience.epfl.ch/search?... url:', 'wp-gutenberg-epfl') }
					/>
				</PanelBody>
				<PanelBody title={ __('Or', 'wp-gutenberg-epfl') }>
					<TextControl
						label={ __('Search records with a textual pattern', 'wp-gutenberg-epfl') }
						value={ attributes.pattern }
						onChange={ pattern => setAttributes( { pattern } ) }
						placeholder={ __('search for:', 'wp-gutenberg-epfl') }
					/>
					<SelectControl
						label={ __('Field restriction', 'wp-gutenberg-epfl') }
						value={ attributes.fieldRestriction }
						onChange={ fieldRestriction => setAttributes( { fieldRestriction } ) }
						options={ optionsFieldFilter }
						help={ <a target="_blank" href="https://infoscience.epfl.ch/help/search-tips?ln=en">{ __('Search tips', 'wp-gutenberg-epfl') }</a> }
					/>
				</PanelBody>
				<PanelBody title={ __('Limit', 'wp-gutenberg-epfl') }>
					<TextControl
						value={ attributes.limit }
						onChange={ limit => setAttributes( { limit } ) }
						placeholder={ '100' }
						help={ __('Without a limit only the first 100 publications are shown', 'wp-gutenberg-epfl') }
					/>
				</PanelBody>
				<PanelBody title={ __('Sort', 'wp-gutenberg-epfl') }>
					<RadioControl
                        selected={ attributes.sort }
                        options={ optionsSort }
						onChange={ sort => setAttributes( { sort } ) }
					/>
				</PanelBody>
				<PanelBody title={ __('Options', 'wp-gutenberg-epfl') } >
					<SelectControl
						label={ __('Group by with titles', 'wp-gutenberg-epfl') }
						value={ attributes.group_by }
						onChange={ group_by => setAttributes( { group_by } ) }
						options={ optionsGroupBy }
					/>
					<RadioControl
						label={ __('Format', 'wp-gutenberg-epfl') }
                        selected={ attributes.format }
                        help={ __('Detail level for a publication', 'wp-gutenberg-epfl') }
                        options={ optionsFormat }
						onChange={ format => setAttributes( { format } ) }
					/>
					<ToggleControl
						label={ __('Summaries', 'wp-gutenberg-epfl') }
						checked={ attributes.summary }
						onChange={ summary => setAttributes( { summary } ) }
					/>
					<ToggleControl
						label={ __('Thumbnails', 'wp-gutenberg-epfl') }
                        checked={ attributes.thumbnail }
						onChange={ thumbnail => setAttributes( { thumbnail } ) }
					/>
				</PanelBody>
			</InspectorControls>
        )

        return content;
    }
}
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
			{ value: 'year', label: __('year as title', 'wp-gutenberg-epfl') },
			{ value: 'doctype', label: __('document type as title', 'wp-gutenberg-epfl') },
		]

        let content = "";

        content = (
            <InspectorControls>
				<PanelBody title={ __('Source', 'wp-gutenberg-epfl') }>
					<TextareaControl
						label={ __('A direct infoscience URL', 'wp-gutenberg-epfl') }
						value={ attributes.url }
						onChange={ url => setAttributes( { url } ) }
						placeholder={ __('a https://infoscience.epfl.ch/search?... url:', 'wp-gutenberg-epfl') }
					/>
					<b>OR</b>
					<TextControl
						label={ __('Search records with a textual pattern', 'wp-gutenberg-epfl') }
						value={ attributes.pattern }
						onChange={ pattern => setAttributes( { pattern } ) }
						placeholder={ __('search for:', 'wp-gutenberg-epfl') }
					/>
					<SelectControl
						label={ __('Field restriction', 'wp-gutenberg-epfl') }
						value={ attributes.fieldResriction }
						onChange={ fieldResriction => setAttributes( { fieldResriction } ) }
						options={ optionsFieldFilter }
					/>
					<TextControl
						label={ __('Limit', 'wp-gutenberg-epfl') }
						value={ attributes.limit }
						onChange={ limit => setAttributes( { limit } ) }
						placeholder={ '100' }
						help={ __('Without a limit only the first 100 publications are shown', 'wp-gutenberg-epfl') }
					/>
					<a target="_blank" href="https://infoscience.epfl.ch/help/search-tips?ln=en">{ __('Search tips', 'wp-gutenberg-epfl') }</a>
				</PanelBody>
				<PanelBody title={ __('Presentation', 'wp-gutenberg-epfl') } >
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
					<RadioControl
						label={ __('Sort', 'wp-gutenberg-epfl') }
                        selected={ attributes.sort }
                        options={ optionsSort }
						onChange={ sort => setAttributes( { sort } ) }
					/>
				</PanelBody>
				<PanelBody title={ __('Titles', 'wp-gutenberg-epfl') } >
					<SelectControl
						label={ __('Group by', 'wp-gutenberg-epfl') + ' (1)' }
						value={ attributes.group_by }
						onChange={ group_by => setAttributes( { group_by } ) }
						options={ optionsGroupBy }
					/>
					<SelectControl
						label={ __('Group by', 'wp-gutenberg-epfl') + ' (2)' }
						value={ attributes.group_by2 }
						onChange={ group_by2 => setAttributes( { group_by2 } ) }
						options={ optionsGroupBy }
					/>
				</PanelBody>
			</InspectorControls>
        )

        return content;
    }
}
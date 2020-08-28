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


export default class InspectorControlsInfoscience extends Component {

	constructor(props) {
		super(props);

		const { attributes, setAttributes } = this.props

		let showAdvancedSearch = false;

		if (attributes.pattern2 && attributes.pattern2.trim() != "") {
			showAdvancedSearch = true;
		}

		if (attributes.pattern3 && attributes.pattern3.trim() != "") {
			showAdvancedSearch = true;
		}

        this.state = {
            showAdvancedSearch: showAdvancedSearch,
		};
	}

	toggleBox = () => {
		this.setState(oldState => ({ showAdvancedSearch: !oldState.showAdvancedSearch }));
	}

    render() {

        const { attributes, setAttributes } = this.props

        let optionsFormat = [
            { value: 'short', label: __('Short', 'epfl') },
            { value: 'detailed', label: __('Detailed', 'epfl') },
		];

		let optionsFieldFilter = [
            { value: 'any', label: __('Any field', 'epfl') },
            { value: 'author', label: __('Author', 'epfl') },
            { value: 'title', label: __('Title', 'epfl') },
            { value: 'year', label: __('Year', 'epfl') },
            { value: 'unit', label: __('Unit', 'epfl') },
            { value: 'collection', label: __('Collection', 'epfl') },
            { value: 'journal', label: __('Journal', 'epfl') },
            { value: 'publisher', label: __('Publisher', 'epfl') },
            { value: 'abstract', label: __('Abstract', 'epfl') },
            { value: 'keyword', label: __('Keyword', 'epfl') },
            { value: 'doi', label: __('DOI', 'epfl') },
		]

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

		let optionsOperatorFilter = [
			{ value: 'and', label: __('AND', 'epfl') },
			{ value: 'or', label: __('OR', 'epfl') },
			{ value: 'and_not', label: __('AND NOT', 'epfl') },
		]

        let content = "";

        content = (
            <InspectorControls>
				<PanelBody title={ __('A direct infoscience URL', 'epfl') }>
					<TextareaControl
						value={ attributes.url }
						onChange={ url => setAttributes( { url } ) }
						placeholder={ __('a https://infoscience.epfl.ch/search?... url', 'epfl') }
					/>
				</PanelBody>
				<PanelBody title={ __('Or text patterns', 'epfl') }>
					<TextControl
						value={ attributes.pattern }
						onChange={ pattern => setAttributes( { pattern } ) }
						placeholder={ __('search for:', 'epfl') }
					/>
					<SelectControl
						label={ __('Field restriction', 'epfl') }
						value={ attributes.field }
						onChange={ field => setAttributes( { field } ) }
						options={ optionsFieldFilter }
						help={ <a target="_blank" href="https://infoscience.epfl.ch/docs/search-guide/">{ __('Search tips', 'epfl') }</a> }
					/>
					<h2><a href="#" onClick={this.toggleBox}>{ __('Additional search keys', 'epfl') } { this.state.showAdvancedSearch ? '[-]' : '[+]' }</a></h2>
					{
						!!this.state.showAdvancedSearch &&
            		<div>
						<SelectControl
							label={ <h4> { __('Second search text', 'epfl') } </h4> }
							value={ attributes.operator2 }
							onChange={ operator2 => setAttributes( { operator2 } ) }
							options={ optionsOperatorFilter }
						/>
						<TextControl
							value={ attributes.pattern2 }
							onChange={ pattern2 => setAttributes( { pattern2 } ) }
							placeholder={ __('search for:', 'epfl') }
						/>
						<SelectControl
							label={ __('Field restriction', 'epfl') }
							value={ attributes.field2 }
							onChange={ field2 => setAttributes( { field2 } ) }
							options={ optionsFieldFilter }
						/>
						<SelectControl
							label={ <h4> { __('Third search text', 'epfl') } </h4> }
							value={ attributes.operator3 }
							onChange={ operator3 => setAttributes( { operator3 } ) }
							options={ optionsOperatorFilter }
						/>
						<TextControl
							value={ attributes.pattern3 }
							onChange={ pattern3 => setAttributes( { pattern3 } ) }
							placeholder={ __('search for:', 'epfl') }
						/>
						<SelectControl
							label={ __('Field restriction', 'epfl') }
							value={ attributes.field3 }
							onChange={ field3 => setAttributes( { field3 } ) }
							options={ optionsFieldFilter }
						/>
					</div>
					}
				</PanelBody>
				<PanelBody title={ __('Limit', 'epfl') }>
					<TextControl
						value={ attributes.limit }
						onChange={ limit => {
							limit = Number(limit);
							setAttributes( { limit } );
						  }}
						placeholder={ '100' }
						help={ __('Without a limit only the first 100 publications are shown', 'epfl') }
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
        )

        return content;
    }
}

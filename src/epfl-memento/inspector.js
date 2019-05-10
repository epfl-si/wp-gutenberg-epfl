import * as axios from 'axios';
import React from 'react';
import Select from 'react-select';

const { __ } = wp.i18n
const { Component } = wp.element

const {
	InspectorControls,
} = wp.editor

const {
    PanelBody,
    SelectControl,
    RadioControl,
    TextControl,
} = wp.components

export default class InspectorControlsMemento extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            mementos: null,
            categories: null,
        }
    }

    componentDidMount() {
        let apiRestUrl = 'https://memento-test.epfl.ch/api/v1/';

        let entryPointMementos = `${apiRestUrl}mementos/?format=json&limit=800`;
		axios.get(entryPointMementos)
			.then( response => response.data.results )
			.then( mementos => this.setState({ mementos }) )
            .catch( err => console.log(err))

        let entryPointCategories = `${apiRestUrl}categories/?format=json&limit=800`;
        axios.get(entryPointCategories)
            .then( response => response.data.results )
            .then( categories => this.setState({ categories }) )
            .catch( err => console.log(err))
	}

    render() {

        const { attributes, setAttributes } = this.props
        
        let content = "";
        
        if (this.state.mementos !== null) {
            
            let optionsMementosList = [];

            this.state.mementos.forEach(memento => {
                optionsMementosList.push({ label: memento.en_name, value: memento.id });
            });
            
            let optionsTemplatesList = [
                { value: 'slider_with_the_first_highlighted_event', label: __('Template slider with the first highlighted event')},
                { value: 'slider_without_the_first_highlighted_event', label: __('Template slider without the first highlighted event')},
                { value: 'listing_with_the_first_highlighted_event', label: __('Template listing with the first highlighted event')},
                { value: 'listing_without_the_first_highlighted_event', label: __('Template listing without the first highlighted event')},
            ];

            let optionsLanguagesList = [
                { value: 'fr', label: __('French') },
                { value: 'en', label: __('English') },
            ];

            let optionsPeriodsList = [
                { value: 'upcoming', label: __('Upcomings events') },
                { value: 'past', label: __('Past events') },
            ];

            let optionsCategoriesList = [
                { value: '0', label: __('No filter') },
            ];

            this.state.categories.forEach(category => {
                optionsCategoriesList.push({ label: category.en_label, value: category.id });
            });

            content = (
                <InspectorControls>
                    <PanelBody title={ __( 'Memento', 'capitainewp-gutenberg-blocks' ) }>
                        <SelectControl 
                            label={ __("Select your memento") }
                            help={ __("The events come from the application memento.epfl.ch. If you don't have a memento, please send a request to 1234@epfl.ch") }
                            value={ attributes.memento }Select your category
                            options={ optionsMementosList }Select your category
                            onChange={ memento => setAttributes( { memento } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Template' ) }>
                        <RadioControl
                            label={ __("Select a template") }
                            help={ __("Do you need more information about templates? Read this documentation") }
                            selected={ attributes.template }
                            options={ optionsTemplatesList }
                            onChange={ template => setAttributes( { template } ) }
	                    />
                    </PanelBody>
                    <PanelBody title={ __( 'Language' ) }>
                        <RadioControl
                            label={ __("Select a language") }
                            help={ __("The language used to render news results") }
                            selected={ attributes.lang }
                            options={ optionsLanguagesList }
                            onChange={ lang => setAttributes( { lang } ) }
	                    />
                    </PanelBody>
                    <PanelBody title={ __( 'Period' ) }>
                        <RadioControl
                            label={ __("Select a period") }
                            help={ __("Do you want upcoming events or past events ?") }
                            selected={ attributes.period }
                            options={ optionsPeriodsList }
                            onChange={ period => setAttributes( { period } ) }
	                    />
                    </PanelBody>
                    <PanelBody title={ __( 'Category' ) }>
                        <SelectControl 
                            label={ __("Filter events by category") }
                            help={ __("Do you want filter events by category? Please select a category.") }
                            value={ attributes.categories }
                            options={ optionsCategoriesList }
                            onChange={ category => setAttributes( { category } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Keyword' ) }>
                        <TextControl 
                            label={ __("Filter events by keyword") }
                            help={ __("Do you want filter events by keyword? Please type a keyword.") }
                            value={ attributes.keyword }
                            onChange={ keyword => setAttributes( { keyword} )}
                        />
                    </PanelBody>
                    
                </InspectorControls>
            )
        }
        return content;
    }
}
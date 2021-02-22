import * as axios from 'axios';
import React from 'react';
import Select from 'react-select';
import { version } from './index'

const { __ } = wp.i18n
const { Component } = wp.element

const {
	InspectorControls,
} = wp.blockEditor

const {
    PanelBody,
    PanelRow,
    SelectControl,
    RadioControl,
    TextControl,
    RangeControl,
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
        let apiRestUrl = BASE_MEMENTO_API_REST_URL;

        let entryPointMementos = `${apiRestUrl}mementos/?format=json&limit=800&ordering=en_name`;
		axios.get(entryPointMementos)
			.then( response => response.data.results )
			.then( mementos => this.setState({ mementos }) )
            .catch( err => console.log(err))

        let entryPointCategories = `${apiRestUrl}categories/?format=json&limit=800&ordering=en_label`;
        axios.get(entryPointCategories)
            .then( response => response.data.results )
            .then( categories => this.setState({ categories }) )
            .catch( err => console.log(err))
	}

    render() {

        const { attributes, setAttributes } = this.props
        const handleCategoriesChange = ( categories ) => setAttributes( { categories: JSON.stringify( categories ) } );

        let content = "";

        if (this.state.mementos !== null && this.state.categories !== null) {

            let optionsMementosList = [];

            this.state.mementos.forEach(memento => {
                optionsMementosList.push({ label: memento.en_name, value: memento.id });
            });

            let optionsTemplatesList = [
                { value: 'slider_with_the_first_highlighted_event', label: __('Template slider with the first highlighted event', 'epfl')},
                { value: 'slider_without_the_first_highlighted_event', label: __('Template slider without the first highlighted event', 'epfl')},
                { value: 'listing_with_the_first_highlighted_event', label: __('Template listing with the first highlighted event', 'epfl')},
                { value: 'listing_without_the_first_highlighted_event', label: __('Template listing without the first highlighted event', 'epfl')},
            ];

            let optionsLanguagesList = [
                { value: 'fr', label: __('French', 'epfl') },
                { value: 'en', label: __('English', 'epfl') },
            ];

            let optionsPeriodsList = [
                { value: 'upcoming', label: __('Upcomings events', 'epfl') },
                { value: 'past', label: __('Past events', 'epfl') },
            ];

            let optionsCategoriesList = [
                { value: 0, label: __('No filter', 'epfl') },
            ];

            this.state.categories.forEach(category => {
                if (category.activated) {
                    optionsCategoriesList.push({ label: category.en_label, value: category.id });
                }
            });

            let optionsYearsList = [
              { value: 'no-filter', label: __('No filter', 'epfl') },
            ]

            const currentYear = new Date().getFullYear();
            for(let year = currentYear; year >= 2008 ; year--) {
              optionsYearsList.push({ label: year, value: year });
            }

            let filterPastEventsByYear;
            if (!!attributes.period && attributes.period === 'past') {
                filterPastEventsByYear = (
                    <SelectControl
                        label={ __("Filter events by year", 'epfl') }
                        value={ attributes.year }
                        options={ optionsYearsList }
                        onChange={ year => setAttributes( { year } ) }
                    />
                )
            }

            content = (
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/memento-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                    <PanelBody title={ __('Memento', 'capitainewp-gutenberg-blocks', 'epfl') }>
                        <SelectControl
                            label={ __("Select your memento", 'epfl') }
                            help={ __("The events come from the application memento.epfl.ch. If you don't have a memento, please send a request to 1234@epfl.ch", 'epfl') }
                            value={ attributes.memento }
                            options={ optionsMementosList }
                            onChange={ memento => {
                              memento = Number(memento);
                              setAttributes( { memento } );
                            }}
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Template', 'epfl' ) }>
                        <RadioControl
                            label={ __("Select a template", 'epfl') }
                            selected={ attributes.template }
                            options={ optionsTemplatesList }
                            onChange={ template => setAttributes( { template } ) }
	                    />
                        <RangeControl
                            label={ __("Select the number of events", 'epfl') }
                            value={ attributes.nbEvents }
                            onChange={ nbEvents  => setAttributes( { nbEvents } ) }
                            min={ 0 }
                            max={ 20 }
                            beforeIcon="arrow-down"
                            afterIcon="arrow-up"
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Language', 'epfl' ) }>
                        <RadioControl
                            label={ __("Select a language", 'epfl') }
                            help={ __("The language used to render news results", 'epfl') }
                            selected={ attributes.lang }
                            options={ optionsLanguagesList }
                            onChange={ lang => setAttributes( { lang } ) }
	                    />
                    </PanelBody>
                    <PanelBody title={ __('Period', 'epfl') }>
                        <RadioControl
                            label={ __("Select a period", 'epfl') }
                            selected={ attributes.period }
                            options={ optionsPeriodsList }
                            onChange={ period => setAttributes( { period } ) }
	                      />
                        { filterPastEventsByYear }
                    </PanelBody>
                    <PanelBody title={ __( 'Categories', 'epfl') }>
                        <PanelRow>
                        <Select
                            id='epfl-memento-categories'
                            name='select-categories'
                            value={ JSON.parse( attributes.categories ) }
                            onChange={ handleCategoriesChange }
                            options={ optionsCategoriesList }
                            isMulti='true'
                        />
                         </PanelRow>
                    </PanelBody>
                    <PanelBody title={ __( 'Keyword', 'epfl' ) }>
                        <TextControl
                            label={ __("Filter events by keyword", 'epfl') }
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

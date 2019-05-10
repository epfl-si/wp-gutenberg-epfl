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
    PanelRow,
    SelectControl,
    RadioControl,
    ToggleControl,
    RangeControl,
} = wp.components

export default class InspectorControlsMemento extends Component {

    constructor(props) {
        super(props);
        this.state = { mementosList : null }
    }

    componentWillMount() {
		axios.get('https://memento-test.epfl.ch/api/v1/mementos/?format=json&limit=800')
			.then( response => response.data.results )
			.then( mementosList => this.setState({ mementosList }) )
            .catch( err => console.log(err))
	}

    render() {

        const { attributes, setAttributes } = this.props
        
        let content = "";
        
        if (this.state.mementosList !== null) {
            
            let optionsMementosList = [];

            this.state.mementosList.forEach(memento => {
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

            content = (
                <InspectorControls>
                    <PanelBody title={ __( 'Memento', 'capitainewp-gutenberg-blocks' ) }>
                        <SelectControl 
                            label={ __("Select your memento") }
                            help={ __("The events come from the application memento.epfl.ch. If you don't have a memento, please send a request to 1234@epfl.ch") }
                            value={ attributes.memento }
                            options={ optionsMementosList }
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
                    
                </InspectorControls>
            )
        }
        return content;
    }
}
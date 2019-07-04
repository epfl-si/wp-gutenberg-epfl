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

export default class InspectorControlsNews extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            channels : null, 
            categories: null,
            themes: null,
        }
    }

    componentDidMount() {

        let apiRestUrl = "https://actu.epfl.ch/api/v1/";
        
        let entryPointChannels = `${apiRestUrl}channels/?format=json&limit=800`;
		axios.get(entryPointChannels)
			.then( response => response.data.results )
			.then( channels => this.setState({ channels }) )
            .catch( err => console.log(err))

        let entryPointCategories = `${apiRestUrl}categories/?format=json&limit=10`;
        axios.get(entryPointCategories)
            .then( response => response.data.results )
            .then( categories => this.setState({ categories }) )
            .catch( err => console.log(err))
        
        let entryPointsThemes = `${apiRestUrl}themes/?format=json&limit=10`;
        axios.get(entryPointsThemes)
            .then( response => response.data.results )
            .then( themes => this.setState({ themes }) )
            .catch( err => console.log(err))
	}

    render() {

        const { attributes, setAttributes } = this.props
        const handleThemesChange = ( themes ) => setAttributes( { themes: JSON.stringify( themes ) } );
        
        let content = "";
        
        if (this.state.channels !== null && this.state.categories !== null && this.state.themes !== null) {
            
            let optionsChannelsList = [];

            this.state.channels.forEach(channel => {
                optionsChannelsList.push({ label: channel.name, value: channel.id });
            });
            
            let optionsTemplatesList = [
                { value: 'listing', label: __('Template Listing', 'wp-gutenberg-epfl')},
                { value: 'highlighted_with_3_news', label: __('Template highlighted with 3 news', 'wp-gutenberg-epfl')},
                { value: 'highlighted_with_1_news', label: __('Template highlighted with 1 news', 'wp-gutenberg-epfl')},
                { value: 'card_with_1_news', label: __('Template card with 1 news', 'wp-gutenberg-epfl')},
                { value: 'card_with_2_news', label: __('Template card with 2 news', 'wp-gutenberg-epfl')},
                { value: 'card_with_3_news', label: __('Template card with 3 news', 'wp-gutenberg-epfl')},
            ];

            let optionsLanguagesList = [
                { value: 'fr', label: __('French', 'wp-gutenberg-epfl') },
                { value: 'en', label: __('English', 'wp-gutenberg-epfl') },
            ];

            let optionsCategoriesList = [
                { value: '0', label: __('No filter', 'wp-gutenberg-epfl') },
            ];

            this.state.categories.forEach(category => {
                optionsCategoriesList.push({ label: category.en_label, value: category.id });
            });

            let optionsThemesList = [
                { value: '0', label: __('No filter', 'wp-gutenberg-epfl') },
            ];

            this.state.themes.forEach(theme => {
                optionsThemesList.push({ label: theme.en_label, value: theme.id });
            });
            
            let nbNewsControl;
            if (attributes.template == 'listing') {
                nbNewsControl = <RangeControl
                            label={ __("Select the number of news", 'wp-gutenberg-epfl') }
                            value={ attributes.nbNews }
                            onChange={ nbNews  => setAttributes( { nbNews } ) }
                            min={ 0 }
                            max={ 20 }
                            beforeIcon="arrow-down"
                            afterIcon="arrow-up"
                        />;
            }

            content = (
                <InspectorControls>
                    <PanelBody title={ __( 'Channel', 'wp-gutenberg-epfl') }>
                        <SelectControl 
                            label={ __("Select your news channel", 'wp-gutenberg-epfl') }
                            help={ __("The news come from the application actu.epfl.ch. If you don't have a news channel, please send a request to 1234@epfl.ch", 'wp-gutenberg-epfl') }
                            value={ attributes.channel }
                            options={ optionsChannelsList }
                            onChange={ channel => setAttributes( { channel } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Template', 'wp-gutenberg-epfl' ) }>
                        <RadioControl
                            label={ __("Select a template", 'wp-gutenberg-epfl') }
                            help={ __("Do you need more information about templates? Read this documentation", 'wp-gutenberg-epfl') }
                            selected={ attributes.template }
                            options={ optionsTemplatesList }
                            onChange={ template => setAttributes( { template } ) }
	                    />
                        { nbNewsControl }
                        <ToggleControl
                            label={ __('Display the link "all news"', 'wp-gutenberg-epfl') }
                            checked={ attributes.displayLinkAllNews }
                            onChange={ () => setAttributes( { displayLinkAllNews: ! attributes.displayLinkAllNews } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Language', 'wp-gutenberg-epfl' ) }>
                        <RadioControl
                            label={ __("Select a language", 'wp-gutenberg-epfl') }
                            help={ __("The language used to render news results", 'wp-gutenberg-epfl') }
                            selected={ attributes.lang }
                            options={ optionsLanguagesList }
                            onChange={ lang => setAttributes( { lang } ) }
	                    />
                    </PanelBody>
                    <PanelBody title={ __( 'Themes', 'wp-gutenberg-epfl') }>
                        <PanelRow>
                            <Select
                                id='epfl-news-themes'
                                name='select-two'
                                value={ JSON.parse( attributes.themes ) }
                                onChange={ handleThemesChange }
                                options={ optionsThemesList }
                                isMulti='true'
                            />
                         </PanelRow>
                    </PanelBody>
                    <PanelBody title={ __( 'Category', 'wp-gutenberg-epfl' ) }>
                        <RadioControl
                            label={ __("Filter news by category", 'wp-gutenberg-epfl') }
                            help={ __("Do you want filter news by category ? Please select a category", 'wp-gutenberg-epfl') }
                            selected={ attributes.category }
                            options={ optionsCategoriesList }
                            onChange={ category => setAttributes( { category } ) }
	                    />
                    </PanelBody>
                </InspectorControls>
            )
        }
        return content;
    }
}
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
        this.state = { channelsList : null }
    }

    componentWillMount() {
		axios.get('https://actu-test.epfl.ch/api/v1/channels/?format=json&limit=800')
			.then( response => response.data.results )
			.then( channelsList => this.setState({ channelsList }) )
            .catch( err => console.log(err))
	}

    render() {

        const { attributes, setAttributes } = this.props
        const handleThemesChange = ( themes ) => setAttributes( { themes: JSON.stringify( themes ) } );
        
        let content = "";
        
        if (this.state.channelsList !== null) {
            
            let optionsChannelsList = [];

            this.state.channelsList.forEach(channel => {
                optionsChannelsList.push({ label: channel.name, value: channel.id });
            });
            /*
            let optionsTemplatesList = [
                { value: '1', label: __('Template Listing')},
                { value: '2', label: __('Template highlighted with 3 news')},
                { value: '3', label: __('Template highlighted with 1 news')},
                { value: '4', label: __('Template card with 1 news')},
                { value: '5', label: __('Template card with 2 news')},
                { value: '6', label: __('Template card with 3 news')},
            ];
            */
            
            let optionsTemplatesList = [
                { value: 'listing', label: __('Template Listing')},
                { value: 'highlighted_with_3_news', label: __('Template highlighted with 3 news')},
                { value: 'highlighted_with_1_news', label: __('Template highlighted with 1 news')},
                { value: 'card_with_1_news', label: __('Template card with 1 news')},
                { value: 'card_with_2_news', label: __('Template card with 2 news')},
                { value: 'card_with_3_news', label: __('Template card with 3 news')},
            ];

            let optionsLanguagesList = [
                { value: 'fr', label: __('French') },
                { value: 'en', label: __('English') },
            ]

            let optionsCategoriesList = [
                { value: '0', label: __('No filter') },
                { value: '1', label: __('Epfl') },
                { value: '2', label: __('Education') },
                { value: '3', label: __('Research') },
                { value: '4', label: __('Innovation') },
                { value: '5', label: __('Campus Life') },
            ]

            let optionsThemesList = [
                { value: '0', label: 'No filter' },
                { value: '1', label: 'Basic Sciences' },
                { value: '2', label: 'Health' },
                { value: '3', label: 'Computer Science' },
                { value: '4', label: 'Engineering' },
                { value: '5', label: 'Environment' },
                { value: '6', label: 'Buildings' },
                { value: '7', label: 'Culture' },
                { value: '8', label: 'Economy' },
                { value: '9', label: 'Energy' },
            ]

            content = (
                <InspectorControls>
                    <PanelBody title={ __( 'Channel', 'capitainewp-gutenberg-blocks' ) }>
                        <SelectControl 
                            label={ __("Select your news channel") }
                            help={ __("The news come from the application actu.epfl.ch. If you don't have a news channel, please send a request to 1234@epfl.ch") }
                            value={ attributes.channel }
                            options={ optionsChannelsList }
                            onChange={ channel => setAttributes( { channel } ) }
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
                        <ToggleControl
                            label={ __('Display the link "all news"') }
                            checked={ attributes.displayLinkAllNews }
                            onChange={ () => setAttributes( { displayLinkAllNews: ! attributes.displayLinkAllNews } ) }
                        />
                        <RangeControl
                            value={ attributes.nbNews }
                            onChange={ nbNews  => setAttributes( { nbNews } ) }
                            min={ 0 }
                            max={ 10 }
                            beforeIcon="arrow-down"
                            afterIcon="arrow-up"
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
                    <PanelBody title={ __( 'Category' ) }>
                        <RadioControl
                            label={ __("Filter news by category") }
                            help={ __("Do you want filter news by category ? Please select a category") }
                            selected={ attributes.category }
                            options={ optionsCategoriesList }
                            onChange={ category => setAttributes( { category } ) }
	                    />
                    </PanelBody>
                    <PanelBody title={ __( 'Themes' ) }>
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
                </InspectorControls>
            )
        }
        return content;
    }
}
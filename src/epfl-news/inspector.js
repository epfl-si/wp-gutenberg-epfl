import * as axios from 'axios';
import React from 'react';
import Select from 'react-select';
import { version } from './index';

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
    ToggleControl,
    RangeControl,
} = wp.components

export default class InspectorControlsNews extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedChannelId: props.attributes.channel,
            channels: null,
            categories: null,
            themes: null,
            sections: null,
        }
    }

    componentDidMount() {

        let apiRestUrl = BASE_NEWS_API_REST_URL;

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

        let channelId = this.props.attributes.channel;
        let entryPointsSections = `${apiRestUrl}channels/${channelId}/projects/?format=json&limit=10`;
        axios.get(entryPointsSections)
        .then( response => response.data )
        .then( sections => this.setState({ sections }) )
        .catch( err => console.log(err))

    }

    componentDidUpdate() {
        if (this.state.selectedChannelId !== this.props.attributes.channel) {

            // If the user changes channels, the sections must be reset
            this.props.attributes.sections = null;

            this.setState({ selectedChannelId: this.props.attributes.channel });
            let entryPointsSections = `${BASE_NEWS_API_REST_URL}channels/${this.props.attributes.channel}/projects/?format=json&limit=10`;

            axios.get(entryPointsSections)
                .then( response => response.data )
                .then( sections => this.setState({ sections }) )
                .catch( err => console.log(err))
        }
    }

    render() {

        const { attributes, setAttributes } = this.props;
        const handleThemesChange = ( themes ) => setAttributes( { themes: JSON.stringify( themes ) } );
        const handleSectionsChange = ( sections ) => setAttributes( { sections: JSON.stringify( sections ) } );

        let content = "";

        if (this.state.channels !== null && this.state.categories !== null && this.state.themes !== null) {

            let optionsChannelsList = [];

            this.state.channels.forEach(channel => {
                if (channel.is_active) {
                    optionsChannelsList.push({ label: channel.name, value: channel.id });
                }
            });

            let optionsTemplatesList = [
                { value: 'listing', label: __('Template Listing', 'epfl')},
                { value: 'highlighted_with_3_news', label: __('Template highlighted with 3 news', 'epfl')},
                { value: 'highlighted_with_1_news', label: __('Template highlighted with 1 news', 'epfl')},
                { value: 'card_with_1_news', label: __('Template card with 1 news', 'epfl')},
                { value: 'card_with_2_news', label: __('Template card with 2 news', 'epfl')},
                { value: 'card_with_3_news', label: __('Template card with 3 news', 'epfl')},
            ];

            let optionsLanguagesList = [
                { value: 'fr', label: __('French', 'epfl') },
                { value: 'en', label: __('English', 'epfl') },
                { value: 'de', label: __('German', 'epfl') },
            ];

            let optionsCategoriesList = [
                { value: 0, label: __('No filter', 'epfl') },
            ];

            this.state.categories.forEach(category => {
                optionsCategoriesList.push({ label: category.en_label, value: category.id });
            });

            let optionsThemesList = [
                { value: '0', label: __('No filter', 'epfl') },
            ];

            this.state.themes.forEach(theme => {
                optionsThemesList.push({ label: theme.en_label, value: theme.id });
            });

            let optionsSectionsList = [
              { value: '0', label: __('No filter', 'epfl') },
            ];

            let sectionControl;
            if (this.state.sections != null && this.state.sections.length !== 0) {

              this.state.sections.forEach(section => {
                optionsSectionsList.push({ label: section.en_label, value: section.id });
              });

              sectionControl = <PanelBody title={ __( 'Sections', 'epfl') }>
                  <PanelRow>
                      <Select
                          id='epfl-news-sections'
                          name='select-three'
                          value={ JSON.parse( attributes.sections ) }
                          onChange={ handleSectionsChange }
                          options={ optionsSectionsList }
                          isMulti='true'
                      />
                    </PanelRow>
              </PanelBody>;
            }

            const helpLinkURL = 'https://support.epfl.ch/epfl?id=epfl_sc_cat_item&sys_id=482a3e3f4f7b9b009d2bdf601310c735';
            const helpLinkText = `The news come from the application actu.epfl.ch. If you don\'t have a news channel, please create a request `;

            content = (
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/news-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                    <PanelBody title={ __( 'Channel', 'epfl') }>
                        <SelectControl
                            label={ __("Select your news channel", 'epfl') }
                            value={ attributes.channel }
                            options={ optionsChannelsList }
                            onChange={ channel => {
                              channel = Number(channel);
                              setAttributes( { channel } );
                            }}
                        />
                        <div className="custom-help small">
                            { __(helpLinkText, 'epfl') }
                            <a href={ helpLinkURL } target={ '_blank' } >{ __('here', 'epfl') }</a>.
                        </div>
                    </PanelBody>
                    <PanelBody title={ __( 'Template', 'epfl' ) }>
                        <RadioControl
                            label={ __("Select a template", 'epfl') }
                            help={ __("Preview the page to see the template applied", 'epfl') }
                            selected={ attributes.template }
                            options={ optionsTemplatesList }
                            onChange={ template => setAttributes( { template } ) }
	                    />
                        { attributes.template === 'listing' &&
							<RangeControl
								label={ __("Select the number of news", 'epfl') }
								value={ attributes.nbNews }
								onChange={ nbNews  => setAttributes( { nbNews } ) }
								min={ 0 }
								max={ 20 }
								beforeIcon="arrow-down"
								afterIcon="arrow-up"
							/>
						}
						{ ['highlighted_with_1_news', 'highlighted_with_3_news'].includes(attributes.template) &&
							<SelectControl
								label={ __("Select the text position", 'epfl') }
								value={ attributes.highlighted1TextPosition }
								options={ [
									{ value: 'horizontal', label: __('Centered', 'epfl') },
									{ value: 'left', label: __('Left', 'epfl') },
									{ value: 'right', label: __('Right', 'epfl') },
								] }
								onChange={ highlighted1TextPosition => setAttributes( { highlighted1TextPosition } )}
							/>
						}
                        <ToggleControl
                            label={ __('Display the link "all news"', 'epfl') }
                            checked={ attributes.displayLinkAllNews }
                            onChange={ () => setAttributes( { displayLinkAllNews: ! attributes.displayLinkAllNews } ) }
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
                    { sectionControl }
                    <PanelBody title={ __( 'Themes', 'epfl') }>
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
                    <PanelBody title={ __( 'Category', 'epfl' ) }>
                        <RadioControl
                            label={ __("Filter news by category", 'epfl') }
                            selected={ attributes.category }
                            options={ optionsCategoriesList }
                            onChange={ category => {
                                category = Number(category);
                                setAttributes( { category } );
                            }}
	                    />
                    </PanelBody>

                </InspectorControls>
            )
        }
        return content;
    }
}

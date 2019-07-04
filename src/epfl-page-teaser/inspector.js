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
} = wp.components

export default class InspectorControlsPageTeaser extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            pages: null,
        }
    }

    componentDidMount() {
        // TODO: Get only 100 pages and NOT all pages.
        // https://dev.to/jackedwardlyons/how-to-get-all-wordpress-posts-from-the-wp-api-with-javascript-3j48
        let apiRestUrl = "http://localhost/gutenberg/?rest_route=/wp/v2/pages&per_page=100";
        
        let entryPointsPages = apiRestUrl;
        axios.get(entryPointsPages)
            .then( response => response.data )
            .then( pages => this.setState({ pages }) )
            .catch( err => console.log(err))
	}

    render() {

        const { attributes, setAttributes } = this.props
        const handlePage1Change = ( page1 ) => setAttributes( { page1: JSON.stringify( page1 ) } );
        const handlePage2Change = ( page2 ) => setAttributes( { page2: JSON.stringify( page2 ) } );
        const handlePage3Change = ( page3 ) => setAttributes( { page3: JSON.stringify( page3 ) } );

        let content = "";
        
        if (this.state.pages !== null) {
            
            let optionsPagesList = [
                { value: '0', label: __('No filter', 'wp-gutenberg-epfl') },
            ];

            this.state.pages.forEach(page => {
                optionsPagesList.push({ label: page.title.rendered, value: page.id });
            });

            const divStyle = {
                height: '600px',
            };

            const selectStyle = {
                marginBottom: '20px'
            }

            content = (
                <InspectorControls>
                    <div style={divStyle}>
                        <PabelBody title={ __( 'Gray', 'wp-gutenberg-epfl' ) }>
                            
                        </PabelBody>
                        <PanelBody title={ __( 'Pages', 'wp-gutenberg-epfl') }>
                                <div style={selectStyle}>
                                    <Select
                                        id='epfl-page-teaser-page1'
                                        name='epfl-page-teaser-page1'
                                        value={ JSON.parse( attributes.page1 ) }
                                        onChange={ handlePage1Change }
                                        options={ optionsPagesList }
                                        
                                    />
                                </div>
                                <div style={selectStyle}>
                                    <Select
                                        id='epfl-page-teaser-page2'
                                        name='epfl-page-teaser-page2'
                                        value={ JSON.parse( attributes.page2 ) }
                                        onChange={ handlePage2Change }
                                        options={ optionsPagesList }                                
                                    />      
                                </div>
                                <div style={selectStyle}>
                                    <Select
                                        id='epfl-page-teaser-page3'
                                        name='epfl-page-teaser-page3'
                                        value={ JSON.parse( attributes.page3 ) }
                                        onChange={ handlePage3Change }
                                        options={ optionsPagesList }
                                        
                                    />
                                </div>
                        </PanelBody> 
                    </div>
                </InspectorControls>
            )
        }
        return content;
    }
}
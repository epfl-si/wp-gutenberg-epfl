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
    ToggleControl,
} = wp.components

const { withSelect } = wp.data

export default class InspectorControlsPageTeaser extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            pages: null,
        }
    }

    getHomeURL = () => {
        let href = window.location.href;
        let index = href.indexOf('/wp-admin');
        let homeUrl = href.substring(0, index);
        return homeUrl;
    }

    componentDidMount() {

        let homeUrl = this.getHomeURL();
            
        let apiRestUrl = `${homeUrl}/?rest_route=/wp/v2/pages&per_page=100`;

        axios.get(apiRestUrl).then(
            response => {
                // Total number of pages on the WP site
                let nbTotalPages = response.headers["x-wp-total"];

                // Total number of pages (in the pagination sense)
                let nbPages = response.headers["x-wp-totalpages"];
                
                // We build a table containing all the pages of the site
                const pages = [];

                for (let page = 1; page <= nbPages; page += 1) {

                    axios.get(`${apiRestUrl}&page=${page}`).then(

                        pagesByPagination => { 

                            pages.push(pagesByPagination.data);

                            if (pages.flat().length == nbTotalPages) {
                                this.setState({ pages: pages.flat() })            
                            }

                        }
                    );
                }
            }
        ).catch( err => console.log(err))
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
                        <PanelBody title={ __( 'Gray', 'wp-gutenberg-epfl' ) }>
                            <ToggleControl
                                label={ __('Change the background to gray', 'wp-gutenberg-epfl') }
                                checked={ attributes.gray }
                                onChange={ () => setAttributes( { gray: ! attributes.gray } ) }
                            />
                        </PanelBody>
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
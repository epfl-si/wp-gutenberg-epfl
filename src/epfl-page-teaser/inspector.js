import React from 'react';
import Select from 'react-select';
import { getAllPagesPostsOrCategories } from '../index';
import { version } from './index';

const { __ } = wp.i18n
const { Component } = wp.element

const {
	InspectorControls,
} = wp.blockEditor

const {
    PanelBody,
    ToggleControl,
    Spinner,
    TextControl,
} = wp.components

export default class InspectorControlsPageTeaser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: null,
        }
    }

    componentDidMount() {
        const current_lang_code = document.querySelector( '[name=post_lang_choice]' ).value;
        getAllPagesPostsOrCategories('pages', current_lang_code).then( (allPages) => {
            this.setState({ pages: allPages });
        });
    }

    render() {
		if ( ! this.state.pages ) {
			return (
				<p>
					<Spinner />
					{ __('Loading pages', 'epfl') }
				</p>
			)
		}

        const { attributes, setAttributes } = this.props
        const handlePage1Change = ( page1 ) => setAttributes( { page1: JSON.stringify( page1 ) } );
        const handlePage2Change = ( page2 ) => setAttributes( { page2: JSON.stringify( page2 ) } );
        const handlePage3Change = ( page3 ) => setAttributes( { page3: JSON.stringify( page3 ) } );

        let content = "";

        if (this.state.pages !== null) {

            let optionsPagesList = [];

            this.state.pages.forEach(page => {
                optionsPagesList.push({ label: page.title.rendered, value: page.id });
            });

            // add empty value at first, in case for an unselect
            optionsPagesList.unshift({ value: null, label: __('None', 'epfl') });

            {/*const divStyle = {
                height: '600px',
            };*/}

            const selectStyle = {
                marginBottom: '10px'
            }

            content = (
                <div >
	                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/page-teaser-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                    <PanelBody title={ __( 'Gray', 'epfl' ) }>
                        <ToggleControl
                            label={ __('Change the background to gray', 'epfl') }
                            checked={ attributes.grayBackground }
                            onChange={ () => setAttributes( { grayBackground: ! attributes.grayBackground } ) }
                        />
                    </PanelBody>
                	</InspectorControls>
                    <TextControl
                        label={ __('Title', 'epfl') }
                        value={ attributes.title }
                        onChange={ title => setAttributes( { title } ) }
                    />

                    <h4>{ __( 'Pages', 'epfl') }</h4>

					<div style={selectStyle}>
                    <Select
                        id='epfl-page-teaser-page1'
                        name='epfl-page-teaser-page1'
                        value={ JSON.parse( attributes.page1 ) }
                        onChange={ handlePage1Change }
                        options={ optionsPagesList }
                        placeholder={ __('Select page', 'epfl') }
                    />
					</div>
					<div style={selectStyle}>
                    <Select
                        id='epfl-page-teaser-page2'
                        name='epfl-page-teaser-page2'
                        value={ JSON.parse( attributes.page2 ) }
                        onChange={ handlePage2Change }
                        options={ optionsPagesList }
                        placeholder={ __('Select page', 'epfl') }
                    />
					</div>
                    <Select
                        id='epfl-page-teaser-page3'
                        name='epfl-page-teaser-page3'
                        value={ JSON.parse( attributes.page3 ) }
                        onChange={ handlePage3Change }
                        options={ optionsPagesList }
                        placeholder={ __('Select page', 'epfl') }
                    />
                </div>
            )
        }
        return content;
    }
}

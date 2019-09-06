
import React from 'react';
import Select from 'react-select';
import { getAllPagesOrPosts } from '../blocks';

const { __ } = wp.i18n
const { Component } = wp.element

const {
	InspectorControls,
} = wp.editor

const {
    PanelBody,
    RadioControl,
} = wp.components

export default class InspectorControlsPageHighlight extends Component {

    constructor(props) {
        super(props);
        this.state = {
            pages: null,
        }
    }

    componentDidMount() {
        const current_lang_code = document.querySelector( '[name=post_lang_choice]' ).value;
        getAllPagesOrPosts('pages', current_lang_code).then( (allPages) => {
            this.setState({ pages: allPages });
        });
	}

    render() {

        const { attributes, setAttributes } = this.props
        const handlePageChange = ( page ) => setAttributes( { page: JSON.stringify( page ) } );

        let content = "";

        let optionsLayoutList = [
            { value: 'right', label: __('Right', 'wp-gutenberg-epfl')},
            { value: 'bottom', label: __('Bottom', 'wp-gutenberg-epfl')},
            { value: 'left', label: __('Left', 'wp-gutenberg-epfl')},
        ];

        if (this.state.pages !== null) {

            let optionsPagesList = [];

            this.state.pages.forEach(page => {
                optionsPagesList.push({ label: page.title.rendered, value: page.id });
            });

            // add empty value at first, in case for an unselect
            optionsPagesList.unshift({ value: null, label: __('None', 'wp-gutenberg-epfl') });

            {/*const divStyle = {
                height: '600px',
            };*/}

            const selectStyle = {
                marginBottom: '20px'
            }

            content = (
				<div>
                <InspectorControls>
                        <PanelBody title={ __( 'Layout', 'wp-gutenberg-epfl' ) }>
                            <RadioControl
                                label={ __("Select a layout", 'wp-gutenberg-epfl') }
                                selected={ attributes.layout }
                                options={ optionsLayoutList }
                                onChange={ layout => setAttributes( { layout } ) }
                                help={ __('Decides where the text will be aligned, to allow the subject of the picture to be visible', 'wp-gutenberg-epfl')}
                            />
                        </PanelBody>
	                </InspectorControls>
                        <div >
                            <Select
                                id='epfl-page-highlight-page'
                                name='epfl-page-highlight-page'
                                value={ JSON.parse( attributes.page ) }
                                onChange={ handlePageChange }
                                options={ optionsPagesList }
                                placeholder={ __('Select page', 'wp-gutenberg-epfl') }
                            />
                        </div>
                    </div>
            )
        }
        return content;
    }
}

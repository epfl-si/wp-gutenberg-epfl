
import React from 'react';
import Select from 'react-select';
import { getAllPagesPostsOrCategories } from '../blocks';

const { __ } = wp.i18n
const { Component } = wp.element

const {
	InspectorControls,
} = wp.editor

const {
    PanelBody,
    RadioControl,
    Spinner,
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
        const handlePageChange = ( page ) => setAttributes( { page: JSON.stringify( page ) } );

        let content = "";

        let optionsLayoutList = [
            { value: 'right', label: __('Right', 'epfl')},
            { value: 'bottom', label: __('Bottom', 'epfl')},
            { value: 'left', label: __('Left', 'epfl')},
        ];

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
                marginBottom: '20px'
            }

            content = (
				<div>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/page-highlight-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                        <PanelBody title={ __( 'Layout', 'epfl' ) }>
                            <RadioControl
                                label={ __("Select a layout", 'epfl') }
                                selected={ attributes.layout }
                                options={ optionsLayoutList }
                                onChange={ layout => setAttributes( { layout } ) }
                                help={ __('Decides where the text will be aligned, to allow the subject of the picture to be visible', 'epfl')}
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
                                placeholder={ __('Select page', 'epfl') }
                            />
                        </div>
                    </div>
            )
        }
        return content;
    }
}

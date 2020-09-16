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
    SelectControl,
    ToggleControl,
    TextControl,
} = wp.components

export default class InspectorControlsStudentProjects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sections: null,
        }
    }

    componentDidMount() {
        // current URL will looks like: https://www.epfl.ch/site/path/wp-admin/post.php?post=61&action=edit
        let entryPointProjects = window.location.href.replace(/wp-admin\/.*/, 'wp-content/plugins/wp-gutenberg-epfl/frontend/epfl-student-projects/get-sections.php');
        axios.get(entryPointProjects)
            .then(response => {
                
                console.log(response);
                let sections = [];
                response.data.forEach((elem) => { 
                    if(typeof elem['code'] == 'string' && elem['code'].startsWith('PROJETS_')) sections.push(elem['code']) 
                });
                sections.sort();
                return sections;
            })
            .then(sections => this.setState({ sections }))
            .catch( err => console.log(err))
        
    }


    render() {

        const { attributes, setAttributes } = this.props;
        
        let content = "";

        if (this.state.sections !== null) {

            let optionsSectionsList = [{ value: '', label: __('<Please choose>', 'epfl') },];

            this.state.sections.forEach(section => {
                optionsSectionsList.push({ label: section.replace("PROJETS_", ""), 
                                           value: section });
            });


            content = (
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/student-projects-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <PanelBody title={ __( 'Section', 'epfl') }>
                        <SelectControl
                            value={ attributes.section }
                            onChange={ section => setAttributes( { section: section } ) }
                            options={ optionsSectionsList }
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Filters', 'epfl') }>
                        <ToggleControl
                            label={ __('Only current projects', 'epfl') }
                            checked={ attributes.onlyCurrentProjects }
                            onChange={ onlyCurrentProjects => setAttributes( { onlyCurrentProjects } ) }
                        />
                        <TextControl
                            label={ __('Professor(s) sciper(s)', 'epfl') }
                            help={ __('Separated with commas', 'epfl') }
							value={ attributes.professorScipers }
							onChange={ professorScipers => setAttributes( { professorScipers } ) }
						/>
                
                    </PanelBody>
                    
                </InspectorControls>
            )
        }
        return content;
    }
}
import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default class InspectorControlsStudentProjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            apiSource: ''
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // Check if apiSource has changed
        if (prevState.apiSource !== this.state.apiSource && this.state.apiSource !== '') {
            this.fetchData(this.state.apiSource);
        }
    }
    fetchData(source) {
        const basePath = 'wp-content/plugins/wp-gutenberg-epfl/frontend/epfl-student-projects/get-sections';
        const entryPointProjects = (source === 'isa' || source === 'zen') 
            ? window.location.href.replace(/wp-admin\/.*/, `${basePath}-${source}.php`)
            : null;
        if (entryPointProjects === null) {
          return 
        } 
        fetch(entryPointProjects)
        .then(response => response.json())
        .then(data => {
            let filteredAndMappedSections;
            if (this.state.apiSource === 'zen') {
                filteredAndMappedSections = data.map(section => ({
                    label: section.acronym,
                    value: section.acronym
                }));
            } else if (this.state.apiSource === 'isa') {
                filteredAndMappedSections = data
                    .filter(section => section.code && section.code.startsWith('PROJETS_'))
                    .map(section => ({
                        label: section.name.fr, 
                        value: section.code
                    }));
            }
            this.setState({
                sections: filteredAndMappedSections
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            this.setState({ sections: [] }); // Handle error by setting sections to empty
        });
    }
    
    render() {
        const { attributes, setAttributes } = this.props;
        const optionsSectionsList = this.state.sections.map(section => ({
            label: section.label,
            value: section.value
        }));
    
        return (
            <InspectorControls>
                <PanelBody title={__('API Source')}>
                    <SelectControl
                        label={__('Select API Source')}
                        value={this.state.apiSource}
                        options={[
                            { label: 'Select API', value: '' },
                            { label: 'ISA', value: 'isa' },
                            { label: 'ZEN', value: 'zen' }
                        ]}
                        onChange={(apiSource) => {
                            this.setState({ apiSource });
                            setAttributes({ apiSource });
                            this.fetchData(apiSource);
                        }}
                    />
                </PanelBody>
                <PanelBody title={__('Section')}>
                    <SelectControl
                        value={attributes.section}
                        onChange={section => setAttributes({ section })}
                        options={[{label: 'Please choose', value: ''}, ...optionsSectionsList]}
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
        );
    }    
}

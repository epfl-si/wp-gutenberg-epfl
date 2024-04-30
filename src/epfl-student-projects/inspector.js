import React from 'react';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, TextControl } from '@wordpress/components';
import { version } from './index';
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
        let entryPointProjects;
        if (source === 'isa') {
            entryPointProjects = window.location.href.replace(/wp-admin\/.*/, 'wp-content/plugins/wp-gutenberg-epfl/frontend/epfl-student-projects/get-sections-isa.php');
        } else if (source === 'zen') {
            entryPointProjects = window.location.href.replace(/wp-admin\/.*/, 'wp-content/plugins/wp-gutenberg-epfl/frontend/epfl-student-projects/get-sections-zen.php');
        } else {
            return;
        }
    
        fetch(entryPointProjects)
        .then(response => response.json())
        .then(data => {
            this.setState({
                sections: data.map(section => ({
                    label: (section.name && section.name.fr !== undefined) ? section.name.fr : section.acronym,
                    value: (section.code !== undefined) ? section.code : section.id
                }))
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

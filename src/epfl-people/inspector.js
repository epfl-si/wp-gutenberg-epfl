import React from 'react';

const { __ } = wp.i18n
const { Component } = wp.element

const {
	InspectorControls,
} = wp.editor

const {
    PanelBody,
    TextControl,
    RadioControl,
} = wp.components

export default class InspectorControlsPeople extends Component {

    render() {

        const { attributes, setAttributes } = this.props

        let optionsColumnsList = [
            { value: 'list', label: __('As list', 'wp-gutenberg-epfl')},
            { value: '1', label: __('As card, one column', 'wp-gutenberg-epfl')},
            { value: '3', label: __('As card, multiple columns', 'wp-gutenberg-epfl')},
        ];
        
        let content = "";
        
        content = (
            <InspectorControls>
                <PanelBody title={ __( 'Units', 'wp-gutenberg-epfl') }>
                    <TextControl
                        value={ attributes.units }
                        help={ __('You can enter many units separated by a comma', 'wp-gutenberg-epfl') }
						onChange={ units => setAttributes( { units } ) }
					/>
                </PanelBody>
                <PanelBody title={ __( 'Scipers', 'wp-gutenberg-epfl' ) }>
                    <TextControl
                        value={ attributes.scipers }
                        help={ __('You can enter many scipers separated by a comma', 'wp-gutenberg-epfl') }
						onChange={ scipers => setAttributes( { scipers } ) }
					/>
                </PanelBody>
                <PanelBody title={ __( 'Function', 'wp-gutenberg-epfl' ) }>
                    <TextControl
                        value={ attributes.fonction }
                        help={ __('You can enter a function to filter persons. The keyword must be in french. Example: professeur or enseignement') }
						onChange={ fonction => setAttributes( { fonction } ) }
					/>
                </PanelBody>
                <PanelBody title={ __( 'Doctoral programs', 'wp-gutenberg-epfl' ) }>
                    <TextControl
                        value={ attributes.doctoralProgram }
                        help={ __('Example: EDAM') }
						onChange={ doctoralProgram => setAttributes( { doctoralProgram } ) }
					/>
                </PanelBody>
                <PanelBody title={ __( 'Columns', 'wp-gutenberg-epfl' ) }>
                    <RadioControl
                        label={ __("Select a template", 'wp-gutenberg-epfl') }
                        selected={ attributes.columns }
                        options={ optionsColumnsList }
                        onChange={ columns => setAttributes( { columns } ) }
                    />
                </PanelBody>
            </InspectorControls>
        )
        
        return content;
    }
}
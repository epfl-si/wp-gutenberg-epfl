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
                <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/people-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
                <PanelBody title={ __( 'Select by', 'wp-gutenberg-epfl') }>
                    <strong>{__( 'Units', 'wp-gutenberg-epfl')}</strong>
                    <TextControl
                        value={ attributes.units }
                        help={ __('You can enter many units separated by a comma', 'wp-gutenberg-epfl') }
						onChange={ units => setAttributes( { units } ) }
					/>
                    <h2>{__( 'OR', 'wp-gutenberg-epfl')}</h2>
                    <strong>{__( 'Scipers', 'wp-gutenberg-epfl')}</strong>
                    <TextControl
                        value={ attributes.scipers }
                        help={ __('You can enter many scipers separated by a comma', 'wp-gutenberg-epfl') }
						onChange={ scipers => setAttributes( { scipers } ) }
					/>
                    <h2>{__( 'OR', 'wp-gutenberg-epfl')}</h2>
                    <strong>{__( 'Doctoral programs', 'wp-gutenberg-epfl')}</strong>
                    <TextControl
                        value={ attributes.doctoralProgram }
                        help={ __('Example: EDAM') }
						onChange={ doctoralProgram => setAttributes( { doctoralProgram } ) }
					/>
                </PanelBody>
                <PanelBody title={ __( 'Function', 'wp-gutenberg-epfl' ) }>
                    <TextControl
                        value={ attributes.fonction }
                        help={ __('You can enter a function to filter persons. The keyword must be in french. Example: professeur or enseignement') }
						onChange={ fonction => setAttributes( { fonction } ) }
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
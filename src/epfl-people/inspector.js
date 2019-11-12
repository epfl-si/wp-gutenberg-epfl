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
            { value: 'list', label: __('As list', 'epfl')},
            { value: '1', label: __('As card, one column', 'epfl')},
            { value: '3', label: __('As card, multiple columns', 'epfl')},
        ];

        let optionsOrderList = [
          { value: 'alphabetical', label: __('Alphabetical order', 'epfl')},
          { value: 'hierarchical', label: __('Hierarchical order', 'epfl')},
        ]

        let sortingPanelBody;
        if (!!attributes.units) {
            sortingPanelBody = <PanelBody title={ __( 'Sorting', 'wp-gutenberg-epfl' ) }>
                    <RadioControl
                        selected={ attributes.order }
                        options={ optionsOrderList }
                        onChange={ order => setAttributes( { order } ) }
                    />
                </PanelBody>
        }

        let content = "";

        content = (
            <InspectorControls>
                <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/people-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                <PanelBody title={ __( 'Select by', 'epfl') }>
                    <strong>{__( 'Units', 'epfl')}</strong>
                    <TextControl
                        value={ attributes.units }
                        help={ __('You can enter many units separated by a comma', 'epfl') }
						onChange={ units => setAttributes( { units } ) }
					/>
                    <h2>{__( 'OR', 'epfl')}</h2>
                    <strong>{__( 'Groups', 'epfl')}</strong>
                    <TextControl
                        value={ attributes.groups }
                        help={ __('You can enter many groups separated by a comma', 'epfl') }
						onChange={ groups => setAttributes( { groups } ) }
					/>
                    <h2>{__( 'OR', 'epfl')}</h2>
                    <strong>{__( 'Scipers', 'epfl')}</strong>
                    <TextControl
                        value={ attributes.scipers }
                        help={ __('You can enter many scipers separated by a comma', 'epfl') }
						onChange={ scipers => setAttributes( { scipers } ) }
					/>
                    <h2>{__( 'OR', 'epfl')}</h2>
                    <strong>{__( 'Doctoral programs', 'epfl')}</strong>
                    <TextControl
                        value={ attributes.doctoralProgram }
                        help={ __('Example: EDAM') }
						onChange={ doctoralProgram => setAttributes( { doctoralProgram } ) }
					/>
                </PanelBody>
                { sortingPanelBody }
                <PanelBody title={ __( 'Function', 'wp-gutenberg-epfl' ) }>
                    <TextControl
                        value={ attributes.fonction }
                        help={ __('You can enter a function to filter persons. The keyword must be in french. Example: professeur or enseignement') }
						onChange={ fonction => setAttributes( { fonction } ) }
					/>
                </PanelBody>
                <PanelBody title={ __( 'Columns', 'wp-gutenberg-epfl' ) }>
                    <RadioControl
                        label={ __("Select a template", 'epfl') }
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
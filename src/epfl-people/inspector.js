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
    TextControl,
} = wp.components

export default class InspectorControlsPeople extends Component {

    render() {

        const { attributes, setAttributes } = this.props
        
        let content = "";
        
        content = (
            <InspectorControls>
                <PanelBody title={ __( 'Units', 'wp-gutenberg-epfl') }>
                    <TextControl
						value={ attributes.units }
						onChange={ units => setAttributes( { units } ) }
					/>
                </PanelBody>
                <PanelBody title={ __( 'Scipers', 'wp-gutenberg-epfl' ) }>
                    <TextControl
						value={ attributes.scipers }
						onChange={ scipers => setAttributes( { scipers } ) }
					/>
                </PanelBody>
                <PanelBody title={ __( 'Function', 'wp-gutenberg-epfl' ) }>
                    <TextControl
						value={ attributes.fonction }
						onChange={ fonction => setAttributes( { fonction } ) }
					/>
                </PanelBody>
                <PanelBody title={ __( 'Columns', 'wp-gutenberg-epfl' ) }>
                    <TextControl
						value={ attributes.columns }
						onChange={ columns => setAttributes( { columns } ) }
					/>
                </PanelBody>
            </InspectorControls>
        )
        
        return content;
    }
}
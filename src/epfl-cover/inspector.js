import React from 'react';

const { __ } = wp.i18n
const { Component } = wp.element

const {
	InspectorControls,
} = wp.editor

const {
    PanelBody,
    PanelRow,
    SelectControl,
    RadioControl,
    ToggleControl,
    RangeControl,
} = wp.components

export default class InspectorControlsNews extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            
        }
    }

    render() {

        const { attributes, setAttributes } = this.props
       
        let content = "";
        
        content = (
            <InspectorControls>
                
            </InspectorControls>
        )
        
        return content;
    }
}
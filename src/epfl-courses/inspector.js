import React from 'react';

const { __ } = wp.i18n
const {
  Component,
  Fragment,
} = wp.element

const {
	InspectorControls,
} = wp.editor

const {
    PanelBody,
    TextControl,
    SelectControl,
} = wp.components

export default class InspectorControlsCourses extends Component {

    render() {

        const { attributes, setAttributes } = this.props

        let optionsTeachingLangList = [
            { value: '', label: __('All', 'epfl')},
            { value: 'fr', label: __('French', 'epfl')},
            { value: 'en', label: __('English', 'epfl')},
        ];

        let optionsSemesterList = [
            { value: '', label: __('All', 'epfl')},
            { value: 'ete', label: __('Summer', 'epfl')},
            { value: 'hiver', label: __('Winter', 'epfl')},
        ];

        let optionsOrientationList = [
            { value: '', label: __('All', 'epfl')},
            { value: 'MA', label: __('Master', 'epfl')},
            { value: 'BA', label: __('Bachelor', 'epfl')},
        ];

        let content = "";

        content = (
            <InspectorControls>
                <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/courses-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                <PanelBody title={ __( 'Select by', 'epfl') }>
                    <TextControl
                        label={__( 'Unit name', 'epfl')}
                        value={ attributes.unit }
                        help={ __('"GETALL" gives all courses in EPFL"', 'epfl') }
						onChange={ unit => setAttributes( { unit } ) }
					/>
                    <h3>{__( 'OR', 'epfl')}</h3>
                    <TextControl
                        label={__( 'Scipers', 'epfl')}
                        value={ attributes.scipers }
                        help={ __('You can enter many scipers separated by a comma', 'epfl') }
						onChange={ scipers => setAttributes( { scipers } ) }
					/>
                    <h3>{__( 'OR', 'epfl')}</h3>
                    <TextControl
                        label={__( 'Section name', 'epfl')}
                        value={ attributes.section }
						onChange={ section => setAttributes( { section } ) }
					/>
                    
                </PanelBody>
                <PanelBody title={ __( 'Filters', 'epfl' ) }>
                    <TextControl
                        label={ __("Course code", 'epfl') }
                        value={ attributes.courseCode }
						onChange={ courseCode => setAttributes( { courseCode } ) }
					/>
                    <TextControl
                        label={ __("Cursus", 'epfl') }
                        value={ attributes.cursus }
						onChange={ cursus => setAttributes( { cursus } ) }
					/>
                    <SelectControl
                        label={ __("Teaching language", 'epfl') }
                        value={ attributes.teachingLang }
                        options={ optionsTeachingLangList }
                        onChange={ teachingLang => setAttributes( { teachingLang } ) }
                    />
                    <SelectControl
                        label={ __("Semester", 'epfl') }
                        value={ attributes.semester }
                        options={ optionsSemesterList }
                        onChange={ semester => setAttributes( { semester } ) }
                    />
                    <SelectControl
                        label={ __("Orientation", 'epfl') }
                        value={ attributes.orientation }
                        options={ optionsOrientationList }
                        onChange={ orientation => setAttributes( { orientation } ) }
                    />
                </PanelBody>
            </InspectorControls>
        )

        return content;
    }
}
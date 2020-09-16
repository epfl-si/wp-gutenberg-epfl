import * as axios from 'axios';
import studentProjectsIcon from './student-projects-icon'
import InspectorControlsStudentProjects from './inspector'

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
} = wp.editor;

const {
    TextControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/student-projects', {
    title: __( 'EPFL Student Projects', 'epfl'),
    description: 'v1.0.2',
    icon: studentProjectsIcon,
    category: 'common',
    attributes: {
        title:{
            type: 'string',
        },
        section:{
            type: 'string',
        },
        onlyCurrentProjects: {
            type: 'boolean',
        },
        professorScipers: {
            type: 'string',
        }

    },
    supports : {
        customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
    },
    edit: ( props ) => {
        const { attributes, className, setAttributes } = props

        return (
            <Fragment>
                <InspectorControlsStudentProjects { ...{ attributes, setAttributes } } />
                <div className={ className }>
                    <h2 className="epfl-block-title">{ __('EPFL Student Projects', 'epfl') }</h2>
                    <TextControl
							label={ __('Title', 'epfl') }
							value={ attributes.title }
							onChange={ title => setAttributes( { title } ) }
						/>
                </div>
            </Fragment>
        )
    },
    save: ( props ) => {
        return null
    },
} );

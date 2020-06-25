
import semesterProjectsIcon from './semester-projects-icon'

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

registerBlockType( 'epfl/semester-projects', {
    title: __( 'EPFL Semester Projects', 'epfl'),
    description: 'v1.0.0',
    icon: semesterProjectsIcon,
    category: 'common',
    attributes: {
        title:{
            type: 'string',
        },
    },
    supports : {
        customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
    },
    edit: ( props ) => {
        const { attributes, className, setAttributes } = props

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/semester-projects-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    
                </InspectorControls>
                <div className={ className }>
                    <h2>{ __('EPFL Semester Projects', 'epfl') }</h2>
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

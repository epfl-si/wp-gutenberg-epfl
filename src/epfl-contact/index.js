import contactIcon from './contact-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.editor;

const {
    PanelBody,
    TextControl,
    TextareaControl,
    ToggleControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/contact', {
	title: __( 'EPFL Contact', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
	icon: contactIcon,
	category: 'common',
	attributes: {
        introduction: {
            type: 'text',
        },
        gray_wrapper: {
            type: 'boolean',
            default: false,
        },
        timetable1: {
			type: 'text',
        },
        timetable2: {
			type: 'text',
        },
        timetable3: {
			type: 'text',
        },
        timetable4: {
			type: 'text',
        },
        information1: {
			type: 'text',
        },
        information2: {
            type: 'text',
        },
        information3: {
            type: 'text',
        },
        map_query: {
            type: 'text',
        }
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title='Format'>
                        <ToggleControl
                            label={ __('Wrap with a gray border', 'wp-gutenberg-epfl') }
                            checked={ attributes.gray_wrapper }
                            onChange={ gray_wrapper => setAttributes( { gray_wrapper } ) }
                        />
                    </PanelBody>
                    <PanelBody title='Introduction'>
                        <TextareaControl
                            label={ __('Text introducing the contact informations', 'wp-gutenberg-epfl') }
                            value={ attributes.introduction }
                            onChange={ introduction => setAttributes( { introduction } ) }
                            help={ __('(optional)', 'wp-gutenberg-epfl') }
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Timetable' ) }>
                        <TextControl
                            value={ attributes.timetable1 }
                            onChange={ timetable1 => setAttributes( { timetable1 } ) }
                            help={ __('Ex. : Monday to thursday <b>09:00 am > 18:00 pm</b>', 'wp-gutenberg-epfl') }
                        />
                        <TextControl
                            value={ attributes.timetable2 }
                            onChange={ timetable2 => setAttributes( { timetable2 } ) }
                        />
                        <TextControl
                            value={ attributes.timetable3 }
                            onChange={ timetable3 => setAttributes( { timetable3 } ) }
                        />
                        <TextControl
                            value={ attributes.timetable4 }
                            onChange={ timetable4 => setAttributes( { timetable4 } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Information' ) }>
                        <TextareaControl
                            value={ attributes.information1 }
                            onChange={ information1 => setAttributes( { information1 } ) }
                        />
                        <TextareaControl
                            value={ attributes.information2 }
                            onChange={ information2 => setAttributes( { information2 } ) }
                        />
                        <TextareaControl
                            value={ attributes.information3 }
                            onChange={ information3 => setAttributes( { information3 } ) }
                        />
                    </PanelBody>
                    <PanelBody title={ __( 'Map' ) }>
                        <TextControl
                            label={ __('A room/place to get more information') }
                            value={ attributes.map_query }
                            onChange={ map_query => setAttributes( { map_query } ) }
                            help={ __('A room for example. See plan.epfl.ch for the right text of your room.', 'wp-gutenberg-epfl') }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <div id="preview-box">
                        <h2>EPFL Contact</h2>
                        <div class="helper">{ __('Please fill the fields in the right-hand column', 'wp-gutenberg-epfl') }</div>
                    </div>
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

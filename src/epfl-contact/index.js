
import contactIcon from './contact-icon'

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    RichText,
} = wp.editor;

const {
    PanelBody,
    TextControl,
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
        grayWrapper: {
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
            selector: '.information1'
        },
        information2: {
            type: 'text',
            selector: '.information2'
        },
        information3: {
            type: 'text',
            selector: '.information3'
        },
        mapQuery: {
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
                            checked={ attributes.grayWrapper }
                            onChange={ grayWrapper => setAttributes( { grayWrapper } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <h3>Contact</h3>
                    <label><strong>Introduction</strong></label>
                    <hr />
                    <RichText
                            label={ __('Text introducing the contact informations', 'wp-gutenberg-epfl') }
                            value={ attributes.introduction }
                            onChange={ introduction => setAttributes( { introduction } ) }
                            tagName="div"
                            multiline="p"
                            placeholder={ __('Our information desk is the central point of contact for any information.', 'wp-gutenberg-epfl') }
                            keepPlaceholderOnFocus = { true }
                            allowedFormats={[]}
                    />
                    <label><strong>{ __( 'Timetable', 'wp-gutenberg-epfl' ) }</strong></label>
                    <hr />
                    <RichText
                        tagName="div"
                        multiline={ false }
                        value={ attributes.timetable1 }
                        onChange={ timetable1 => setAttributes( { timetable1 } ) }
                        placeholder={ __('Monday to thursday 09:00 am > 18:00 pm', 'wp-gutenberg-epfl') }
                        keepPlaceholderOnFocus = { true }
                        className="timetable1"
                    />
                    <hr />
                    <RichText
                        tagName="div"
                        multiline={ false }
                        value={ attributes.timetable2 }
                        onChange={ timetable2 => setAttributes( { timetable2 } ) }
                        className="timetable2"
                    />
                    <hr />
                    <RichText
                        tagName="div"
                        multiline={ false }
                        value={ attributes.timetable3 }
                        onChange={ timetable3 => setAttributes( { timetable3 } ) }
                        className="timetable3"
                    />
                    <hr />
                    <RichText
                        tagName="div"
                        multiline={ false }
                        value={ attributes.timetable4 }
                        onChange={ timetable4 => setAttributes( { timetable4 } ) }
                        className="timetable4"
                    />
                    <label><strong>Information</strong></label>
                    <hr />
                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder={ __( 'An email ?', 'wp-gutenberg-epfl' ) }
                        keepPlaceholderOnFocus = { true }
                        value={ attributes.information1 }
                        className="information1"
                        onChange={ information1 => setAttributes( { information1 } ) }
                    />
                    <hr />
                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder={ __( 'A phone number ?', 'wp-gutenberg-epfl' ) }
                        keepPlaceholderOnFocus = { true }
                        value={ attributes.information2 }
                        className="information2"
                        onChange={ information2 => setAttributes( { information2 } ) }
                    />
                    <hr />
                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder={ __( 'An address ?', 'wp-gutenberg-epfl' ) }
                        keepPlaceholderOnFocus = { true }
                        value={ attributes.information3 }
                        className="information3"
                        onChange={ information3 => setAttributes( { information3 } ) }
                    />
                    <hr />
                    <label><strong>{ __( 'Map', 'wp-gutenberg-epfl' ) }</strong></label>
                    <TextControl
                        label={ __('A room/place shown in the interactive map:', 'wp-gutenberg-epfl') }
                        value={ attributes.mapQuery }
                        onChange={ mapQuery => setAttributes( { mapQuery } ) }
                        placeholder={ 'CM 0 361.2' }
                        help={ <a target="_blank" href="//plan.epfl.ch">{ __('See plan.epfl.ch for the right name of your room.', 'wp-gutenberg-epfl') }</a> }
                    />
                </div>
            </Fragment>
        )
    },
    save: ( props ) => {
        return null;
    },
} );

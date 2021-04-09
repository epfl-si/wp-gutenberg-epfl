import {
    hasCommonCategory,
    getTooltippedAttributes,
    getTooltippedExample,
} from '../block-utils.js'

import contactIcon from './contact-icon'

const version = "v1.1.0";

const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    RichText,
    InnerBlocks,
} = wp.blockEditor;

const {
    PanelBody,
    TextControl,
    ToggleControl,
    SelectControl,
} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/contact', {
    title: __( 'EPFL Contact', 'epfl'),
    description: __(
        'Display contact information and a map of the room location',
        'epfl'
    ),
    icon: contactIcon,
    category: hasCommonCategory ? 'common' : 'design',
    attributes: getTooltippedAttributes({
        grayWrapper: {
            type: 'boolean',
            default: false,
        },
        timetable1: {
            type: 'string',
        },
        timetable2: {
            type: 'string',
        },
        timetable3: {
            type: 'string',
        },
        timetable4: {
            type: 'string',
        },
        information1: {
            type: 'string',
            selector: '.information1'
        },
        information2: {
            type: 'string',
            selector: '.information2'
        },
        information3: {
            type: 'string',
            selector: '.information3'
        },
        mapQuery: {
            type: 'string',
        },
        searchType: {
            type: 'string',
            default: 'searchAll',
        },
    }),
    example: getTooltippedExample(),
    supports : {
        customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
    },
    edit: ( props ) => {
        const { attributes, className, setAttributes } = props

        if ( attributes.asToolTip ) {
            // render the tooltip
            return(
                <Fragment>
                    <img src={ blockThumbnails.contact } />
                </Fragment>
            );
        }

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/contact-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                    <p className="wp-block-help">{ version }</p>
                    <PanelBody title='Format'>
                        <ToggleControl
                            label={ __('Wrap with a gray border', 'epfl') }
                            checked={ attributes.grayWrapper }
                            onChange={ grayWrapper => setAttributes( { grayWrapper } ) }
                        />
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                    <h2 className="epfl-block-title">{ __('EPFL Contact', 'epfl') }</h2>
                    <label><strong>{ __('Introduction', 'epfl') }</strong></label>
                    <hr />
                    <InnerBlocks />
                    <label><strong>{ __( 'Timetable', 'epfl' ) }</strong></label>
                    <hr />
                    <RichText
                        tagName="div"
                        multiline={ false }
                        value={ attributes.timetable1 }
                        onChange={ timetable1 => setAttributes( { timetable1 } ) }
                        placeholder={ __('Monday to thursday 09:00 am > 18:00 pm', 'epfl') }
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
                        placeholder={ __( 'An email ?', 'epfl' ) }
                        keepPlaceholderOnFocus = { true }
                        value={ attributes.information1 }
                        className="information1"
                        onChange={ information1 => setAttributes( { information1 } ) }
                    />
                    <hr />
                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder={ __( 'A phone number ?', 'epfl' ) }
                        keepPlaceholderOnFocus = { true }
                        value={ attributes.information2 }
                        className="information2"
                        onChange={ information2 => setAttributes( { information2 } ) }
                    />
                    <hr />
                    <RichText
                        tagName="div"
                        multiline="p"
                        placeholder={ __( 'An address ?', 'epfl' ) }
                        keepPlaceholderOnFocus = { true }
                        value={ attributes.information3 }
                        className="information3"
                        onChange={ information3 => setAttributes( { information3 } ) }
                    />
                    <hr />
                    <label><strong>{ __( 'Map', 'epfl' ) }</strong></label>
                    <SelectControl
                      label={ __('A room/place shown in the interactive map:', 'epfl') }
                      value={ attributes.searchType }
                      options={ [
                          { label: __('A name or a place', 'epfl'), value: 'searchAll' },
                          { label: __('A room number', 'epfl'), value: 'searchRoom' },
                          { label: __('An URL copy-pasted from plan.epfl.ch', 'epfl'), value: 'searchURL' },
                      ] }
                      onChange={ searchType => setAttributes({searchType}) }
                    />
                    <TextControl
                        value={ attributes.mapQuery }
                        onChange={ mapQuery => setAttributes( { mapQuery } ) }
                        placeholder={ 'CM 0 361.2' }
                        help={ <a target="_blank" href="//plan.epfl.ch">{ __('See plan.epfl.ch for the right name of your room.', 'epfl') }</a> }
                    />
                </div>
            </Fragment>
        )
    },
    save: ( props ) => {
        return (
            <div>
                <InnerBlocks.Content />
            </div>
        );
    },
} );

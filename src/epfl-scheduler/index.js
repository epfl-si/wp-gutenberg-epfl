import schedulerIcon from './scheduler-icon'

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
    DateTimePicker,

} = wp.components;

const { Fragment } = wp.element;

function testTime(attributes) {
	if (!attributes.startDateTime || !attributes.endDateTime) {
		return (<p><b>{ __('Warning', 'epfl') }</b> <i>{ __('Please choose a time in the sidebar', 'epfl') }</i></p>)
	} else {
		return(<i>{ __('From', 'epfl') } {attributes.startDateTime.substring(0,10)}, {attributes.startDateTime.substring(11,20)} { __('to', 'epfl') } {attributes.endDateTime.substring(0,10)}, {attributes.endDateTime.substring(11,20)}</i> )
	}
};

registerBlockType( 'epfl/scheduler', {
	title: __( 'EPFL Scheduler', 'epfl'),
	description: 'v1.0.4',
	icon: schedulerIcon,
	category: 'common',
	attributes: {
        startDateTime: {
            type: 'string',
        },
        endDateTime: {
            type: 'string',
        },
    },
    supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
    edit: props => {

      const { attributes, className, setAttributes } = props

      return (
        <Fragment>
            <InspectorControls>
                <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/scheduler-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
                <PanelBody title={ __('Start Date & Time', 'epfl') }>
                    <DateTimePicker
                        currentDate={ attributes.startDateTime }
                        value={ attributes.startDateTime }
                        onChange={ startDateTime => setAttributes( { startDateTime } ) }
                    />
                </PanelBody>
                <PanelBody title={ __('End Date & Time', 'epfl') }>
                    <DateTimePicker
                        currentDate={ attributes.endDateTime }
						value={ attributes.endDateTime }
                        onChange={ endDateTime => setAttributes( { endDateTime } ) }
                        help={ __('Please select an end date. Format: mm/dd/yyyy', 'epfl') }
					/>
				</PanelBody>
            </InspectorControls>

            <div className={ className }>
				<h2 className="epfl-block-title">{ __('EPFL Scheduler', 'epfl') }</h2>
				{testTime(attributes)}
                <InnerBlocks />
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

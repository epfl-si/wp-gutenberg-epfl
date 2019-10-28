import schedulerIcon from './scheduler-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    RichText,
    InnerBlocks,
} = wp.editor;

const {
    PanelBody,
    DateTimePicker,

} = wp.components;

const { Fragment } = wp.element;

function testTime(attributes) {
	if (!attributes.startDateTime || !attributes.endDateTime) {
		return (<p><b>Warning</b> <i>Please choose a time in the sidebar</i></p>)
	} else {
		return(<i>From {attributes.startDateTime.substring(0,10)}, {attributes.startDateTime.substring(11,20)} to {attributes.endDateTime.substring(0,10)}, {attributes.endDateTime.substring(11,20)}</i> )
	}
};

registerBlockType( 'epfl/scheduler', {
	title: __( 'EPFL Scheduler', 'wp-gutenberg-epfl'),
	description: 'v1.0.2',
	icon: schedulerIcon,
	category: 'common',
	attributes: {
        content: {
            type: 'string',
            selector: '.content'
        },
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
                <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/scheduler-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
                <PanelBody title={ __('Start Date & Time', 'wp-gutenberg-epfl') }>
                    <DateTimePicker
                        currentDate={ attributes.startDateTime }
                        value={ attributes.startDateTime }
                        onChange={ startDateTime => setAttributes( { startDateTime } ) }
                    />
                </PanelBody>
                <PanelBody title={ __('End Date & Time', 'wp-gutenberg-epfl') }>
                    <DateTimePicker
                        currentDate={ attributes.endDateTime }
						value={ attributes.endDateTime }
                        onChange={ endDateTime => setAttributes( { endDateTime } ) }
                        help={ __('Please select a end date. Format: mm/dd/yyyy', 'wp-gutenberg-epfl') }
					/>
				</PanelBody>
            </InspectorControls>

            <div className={ className }>
				<h2>EPFL Scheduler</h2>
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

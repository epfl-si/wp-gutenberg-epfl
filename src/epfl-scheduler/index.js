
import schedulerIcon from './scheduler-icon'

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
    DateTimePicker,

} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/scheduler', {
	title: __( 'EPFL Scheduler', 'wp-gutenberg-epfl'),
	description: 'v1.0.0',
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
                {
                    <div>
                        <RichText
                            tagName="div"
                            multiline="p"
                            placeholder={ __( 'Write your content here', 'wp-gutenberg-epfl' ) }
                            value={ attributes.content }
                            className="content"
                            onChange={ content1 => setAttributes( { content } ) }
                        />
                    </div>
                }
            </div>
        </Fragment>
      )
    },
	save: ( props ) => {
		return null;
	},
} );
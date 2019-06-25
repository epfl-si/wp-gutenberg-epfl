
import schedulerIcon from './scheduler-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    RichText,
    BlockControls,
    Toolbar,
} = wp.editor;

const {
    PanelBody,
    TextControl,
    DatePicker,

} = wp.components;

const { Fragment } = wp.element;

registerBlockType( 'epfl/scheduler', {
	title: __( 'EPFL Scheduler', 'wp-gutenberg-epfl'),
	description: __('Display EPFL Scheduler', 'wp-gutenberg-epfl'),
	icon: schedulerIcon,
	category: 'common',
	attributes: {
        content: {
            type: 'string',
            
            selector: '.content'
        },
        startDate: {
            type: 'string',
        },
        endDate: {
            type: 'string',
        },
        startTime: {
            type: 'string',
            default: '00:00:00',
        },
        endTime: {
            type: 'string',
            default: '00:00:00',
        }
    },
    supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
    edit: props => {

      const { attributes, className, setAttributes } = props

      return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={ __('Start Date', 'wp-gutenberg-epfl') }>
                    <DatePicker
                        currentDate={ attributes.startDate }
                        value={ attributes.startDate }
                        onChange={ startDate => setAttributes( { startDate } ) }
                    />
                </PanelBody>
                <PanelBody title={ __('End Date', 'wp-gutenberg-epfl') }>
                    <DatePicker
                        currentDate={ attributes.endDate }
						value={ attributes.endDate }
                        onChange={ endDate => setAttributes( { endDate } ) }
                        help={ __('Please select a end date. Format: mm/dd/yyyy', 'wp-gutenberg-epfl') }
					/>
				</PanelBody>

                <PanelBody title={ __('Start Time', 'wp-gutenberg-epfl') }>
                    <TextControl
						value={ attributes.startTime }
                        onChange={ startTime => setAttributes( { startTime } ) }
                        help={ __('Please select a start time. Format: hh:mm:ss', 'wp-gutenberg-epfl') }
					/>
				</PanelBody>
                <PanelBody title={ __('End Time', 'wp-gutenberg-epfl') }>
                    <TextControl
						value={ attributes.endTime }
                        onChange={ endTime => setAttributes( { endTime } ) }
                        help={ __('Please select an end time. Format: hh:mm:ss', 'wp-gutenberg-epfl') }
					/>
				</PanelBody>
            </InspectorControls>
            <div className={ className }>
                {
                    <div>
                    {
                        <BlockControls>
                       
                    </BlockControls>
                    }
                <RichText
                    tagName="div"
                    multiline="p"
                    placeholder={ __( 'Ecrivez votre contenu ici' ) }
                    value={ attributes.content }
                    className="content"
                    onChange={ content => setAttributes( { content } ) }
                />
                </div>
                /* le conteneur (tagName) est une div, mais pourrait être un ul */
                /* chaque nouvelle ligne est un paragraphe, mais on aurait pu choisir un li */
                }
                
            </div>
        </Fragment>
      )
    },
	save: ( props ) => {
		return null;
	},
} );
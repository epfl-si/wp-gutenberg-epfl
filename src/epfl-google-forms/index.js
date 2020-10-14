import googleFormsIcon from './google-forms-icon'
import {
	hasCommonCategory,
	getTooltippedAttributes,
	getTooltippedExample,
} from '../block-utils.js'

const { __ } = wp.i18n;

const version = 'v1.0.9';

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.blockEditor;

const {
	TextareaControl,
	TextControl,
	Modal,
	Button
} = wp.components;

const {
	Fragment,
	useState,
} = wp.element;

registerBlockType( 'epfl/google-forms', {
	title: __( 'EPFL Google Forms', 'epfl'),
	description: __(
		'Embed a form created on Google Forms',
		'epfl'
	),
	icon: googleFormsIcon,
	category: hasCommonCategory ? 'common' : 'embed',
	attributes: getTooltippedAttributes({
        data: {
			type: 'string',
		},
		url: {
			type: 'string',
		},
		height: {
			type: 'integer',
		}
	}),
	example: getTooltippedExample(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
		const { attributes, className, setAttributes } = props

		if ( attributes.asToolTip ) {
			// render the tooltip
			return (
				<Fragment>
					<img src={ blockThumbnails.googleForms } />
				</Fragment>
			);
		}

		// information modal window
		const [ isConfirmationOpen, setConfirmationOpen ] = useState( false );
		const openConfirmationModal = () => setConfirmationOpen( true );
		const closeConfirmationModal = () => setConfirmationOpen( false );

		// Error modal window
		const [ isErrorOpen, setErrorOpen ] = useState( false );
		const openErrorModal = () => setErrorOpen( true );
		const closeErrorModal = () => setErrorOpen( false );


		// extract information from HTML pasted code
		function extractInfos(fromData, regex)
		{
			let infos = fromData.match(regex)

			if(Array.isArray(infos) && infos.length > 1)
			{
				return infos[1]
			}
			return false
		}

		// Parse HTML pasted code to extract necessary information
		function parseData(dataToParse) {

			if(dataToParse == "")
			{
				setAttributes( { data: "" } )
				return
			}
			// Extracting informations
			let parsedUrl = extractInfos(dataToParse, /src="(.*?)"/)
			let parsedHeight = extractInfos(dataToParse, /height="(.*?)"/)

			// One of the information cannot be found
			if(parsedUrl !== false  || parsedHeight !== false )
			{
				// Updating attributes.
				setAttributes( { url: parsedUrl } )
				parsedHeight = Number(parsedHeight)
				setAttributes( { height: parsedHeight } )

				// Display confirmation
				openConfirmationModal()

				// We set text area as empty
				setAttributes( { data: "" } )
			}
			else // There was at least one error
			{
				// Displaying error box
				openErrorModal()
				// keeping pasted value in cell
				setAttributes( { data: dataToParse } )
			}

        }

        return (
            <Fragment>
				<InspectorControls>
					<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/website/google-form-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
					<p className="wp-block-help">{ version }</p>
				</InspectorControls>
                <div className={ className }>
                    <h2 className="epfl-block-title">{ __('EPFL Google Forms', 'epfl') }</h2>
                        <TextareaControl
							value={ attributes.data }
							onChange={ parseData }
							rows = { '2' }
                            placeholder={ __('Paste here the <iframe> HTML code you find in "< >" tab when you press the "Send" button on a GoogleForm edition page, it will extract needed parameters', 'epfl') }
                        />
					<h4>{ __('Configuration', 'epfl') }</h4>
                        <TextControl
							label={ __('URL', 'epfl') }
                            value={ attributes.url }
                            onChange={ url => setAttributes( { url } ) }
                        />
						<TextControl
							label={ __('Height', 'epfl') }
                            value={ attributes.height }
                            onChange={ height => setAttributes( { height } ) }
                        />
						{ isConfirmationOpen && (
						<Modal
							title={ __('Information extracted', 'epfl') }
							onRequestClose={ closeConfirmationModal }>
							<p>{ __('Information have been extracted from pasted HTML code', 'epfl') }</p>
							<Button isDefault onClick={ closeConfirmationModal }>
								{ __('Close', 'epfl') }
							</Button>
						</Modal>
						) }
						{ isErrorOpen && (
						<Modal
							title={ __('Error extracting information', 'epfl') }
							onRequestClose={ closeErrorModal }>
							<p><font color="#F00">{ __('Wrong HTML code given, impossible to extract information.', 'epfl') }</font></p>
							<Button isDefault onClick={ closeErrorModal }>
								{ __('Close', 'epfl') }
							</Button>
						</Modal>
						) }
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return null;
	},
} );

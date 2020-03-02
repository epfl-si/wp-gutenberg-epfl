
import googleFormsIcon from './google-forms-icon'

const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.editor;

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
	title: __( 'Google Forms', 'epfl'),
	description: 'v1.0.9',
	icon: googleFormsIcon,
	category: 'common',
	attributes: {
        data: {
			type: 'string',
		},
		url: {
			type: 'string',
		},
		height: {
			type: 'integer',
		}
	},
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
		const { attributes, className, setAttributes } = props
		
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
					<p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/google-form-en/', 'epfl') } target="new">{ __('Online help', 'epfl') } </a></p>
				</InspectorControls>
                <div className={ className }>
                    <h2>{ __('EPFL Google Forms', 'epfl') }</h2>
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

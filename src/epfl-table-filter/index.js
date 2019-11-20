import tableFilterIcon from './table-filter-icon'


const { __ } = wp.i18n;

const {
    registerBlockType,
} = wp.blocks;

const {
    InspectorControls,
    InnerBlocks,
} = wp.editor;

const {
    PanelBody,
    ToggleControl,
    TextControl,
    SelectControl,
} = wp.components;

const { Fragment } = wp.element;

const TEMPLATE = [
	['core/table', {}, [] ]
]

const getAttributes = () => {
    let atts = {
        largeDisplay: {
            type: 'boolean',
            default: false,
        },
        placeHolder: {
            type: 'string',
        },
        tableHeaderOptions: {
            type: 'string',
        },
    };

    return atts;
}

let optionsHeader = [
    { value: '', label: __('No header', 'wp-gutenberg-epfl') },
    { value: 'header', label: __('Header', 'wp-gutenberg-epfl') },
    { value: 'header,sort', label: __('Header & sort', 'wp-gutenberg-epfl') },
];

registerBlockType( 'epfl/table-filter', {
	title: __( 'EPFL Table Filter', 'wp-gutenberg-epfl'),
	description: 'v1.0.1',
	icon: tableFilterIcon,
	category: 'common',
	attributes: getAttributes(),
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
        const { attributes, className, setAttributes } = props;

        return (
            <Fragment>
                <InspectorControls>
                    <p><a className="wp-block-help" href={ __('https://www.epfl.ch/campus/services/table-filter-en/', 'wp-gutenberg-epfl') } target="new">{ __('Online help', 'wp-gutenberg-epfl') } </a></p>
                    <PanelBody title='Format'>
                        <ToggleControl
                            label={ __('Large display', 'wp-gutenberg-epfl') }
                            checked={ attributes.largeDisplay }
                            onChange={ largeDisplay => setAttributes( { largeDisplay } ) }
                        />
                        <strong>{__( 'Placeholder', 'wp-gutenberg-epfl')}</strong>
                        <TextControl
                            value={ attributes.placeHolder }
                            help={ __('Text to display in search box', 'wp-gutenberg-epfl') }
                            onChange={ placeHolder => setAttributes( { placeHolder } ) }
                        />
                        <SelectControl
							label={ <h4> { __('Table header', 'wp-gutenberg-epfl') } </h4> }
							value={ attributes.tableHeaderOptions }
							onChange={ tableHeaderOptions => setAttributes( { tableHeaderOptions } ) }
							options={ optionsHeader }
						/>
                    </PanelBody>
                </InspectorControls>
                <div className={ className }>
                        <h2>{ __('Table', 'wp-gutenberg-epfl') }</h2>
                        <InnerBlocks 
                            template={ TEMPLATE }
                            templateLock="all" 
                           />
                </div>
            </Fragment>
		)
	},
	save: ( props ) => {
		return (
                <InnerBlocks.Content />
            
        );
	},
} );

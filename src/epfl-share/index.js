const { __ } = wp.i18n;

const {
	registerBlockType,
} = wp.blocks;

const { Fragment } = wp.element;

registerBlockType( 'epfl/share', {
	title: __( 'EPFL Share', 'epfl'),
	description: 'v1.0.0',
	icon: 'text',
	category: 'common',
	supports : {
		customClassName: false, // Removes the default field in the inspector that allows you to assign a custom class
	},
	edit: ( props ) => {
		const { attributes, className, setAttributes } = props

		return (
			<Fragment>
				<div className={ className }>
					<div id="preview-box">
						<h2>{ __('EPFL Share', 'epfl') }</h2>
						<div className="helper">{ __('Share this page', 'epfl') }</div>
					</div>
				</div>
			</Fragment>
			)
	},
	save: ( props ) => {
		return null;
	},
} );

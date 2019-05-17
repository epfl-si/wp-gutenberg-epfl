const { __ } = wp.i18n
const { Spinner } = wp.components
const { Component } = wp.element

export default class PreviewCover extends Component {

	state = {
		
	}

	render() {


		const { className, attributes } = this.props
		
			
		return (
			<div className={ className }>
				<h1>SALUT !</h1>	
			</div>
		)
	}
}

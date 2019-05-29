const { __ } = wp.i18n
const { Component } = wp.element

export default class PreviewNews extends Component {

	render() {
        
        const { className } = this.props

        let helper = __('Merci de renseigner les champs présents dans la colonne de droite');

		return (
			<div className={ className }>
                <div id="preview-box">
                    <h2>EPFL PEOPLE</h2>
                    <div class="helper">{ __(helper) }</div>
                </div>
			</div>
		)
	}
}

const { __ } = wp.i18n
const { Component } = wp.element

export default class PreviewNews extends Component {
    render() {
        const { className } = this.props
        return (
            <div className={ className }>
                <div id="preview-box">
                    <h2>EPFL PEOPLE</h2>
                    <div className="helper">{ __('Please fill the fields in the right-hand column', 'wp-gutenberg-epfl') }</div>
                </div>
            </div>
        )
    }
}

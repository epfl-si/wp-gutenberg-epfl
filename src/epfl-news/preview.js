import * as axios from 'axios';
import stripHtml from "string-strip-html";
import moment from 'moment';

const { __ } = wp.i18n
const { Spinner } = wp.components
const { Component } = wp.element

export default class PreviewNews extends Component {

	state = {
		newsList: null,
		channelName: null,
		newsUrl: null,
	}

	getURL() {
		const { attributes } = this.props;

    let newsUrl = `${BASE_API_REST_URL}channels/${attributes.channel}/news/`;
    newsUrl += `?format=json&lang=${attributes.lang}&limit=${attributes.nbNews}`;

		if (attributes.category !== 0) {
			newsUrl += `&category=${attributes.category}`;
		}

		if (attributes.themes !== null) {
			let themes = JSON.parse(attributes.themes);
			themes.forEach(theme => {
				newsUrl += `&themes=${theme.value}`;
			});
    }
    
    if (attributes.sections !== null) {
			let sections = JSON.parse(attributes.sections);
			sections.forEach(section => {
				newsUrl += `&projects=${section.value}`;
			});
		}

		return newsUrl;
	}

	getNews() {
    let newsUrl = this.getURL();

		axios.get(newsUrl)
			.then( response => response.data.results )
			.then( newsList => {
				let channelName = "";
				if (newsList.length > 0) {
					channelName = newsList[0].channel.name.toLowerCase();
				}
				this.setState({ newsList: newsList, channelName: channelName, newsUrl: newsUrl })
			})
			.catch( err => console.log(err))
	}

	componentDidMount() {
		this.getNews();
	}

	componentDidUpdate() {
		if (this.getURL() !== this.state.newsUrl) {
			this.getNews();
		}
	}

	render() {

		if ( ! this.state.newsList ) {
			return (
				<p>
					<Spinner />
					{ __('Loading EPFL news', 'epfl') }
				</p>
			)
		}

		if ( this.state.newsList.length === 0 ) {
			return (
				<p>
					{ __('No news found', 'epfl') }
				</p>
			)
		} else  {
			//console.log(this.state.newsList);
		}

		let linkAllNews;
		const { className, attributes } = this.props

		if (attributes.displayLinkAllNews) {
      let url = `https://actu.epfl.ch/search/${this.state.channelName}`;
			linkAllNews = (
				<p className="text-center">
					<a className="link-pretty" href={ url }>Toutes les actualités</a>
				</p>
			)
		}

		return (
			<div className={ className }>
				<div className="list-group">

					{ this.state.newsList.map( news => {
						return (

							<a key={news.id} href="#" className="list-group-item list-group-teaser link-trapeze-vertical">
								<div className="list-group-teaser-container">
									<div className="list-group-teaser-thumbnail">
										<picture>
											<img src={ news.thumbnail_url } className="img-fluid" alt={ news.visual_description } />
										</picture>
									</div>
									<div className="list-group-teaser-content" itemScope itemType="http://schema.org/Article">
										<p className="h5" itemProp="name">{ news.title }</p>
										<p>
											<time dateTime={ news.publish_date } itemProp="datePublished">{ moment(news.publish_date).format('L').split('/').join('.') } </time>
											<span className="text-muted" itemProp="description">— { stripHtml(news.subtitle) }</span>
										</p>
									</div>
								</div>
							</a>

							)
					}) }
					{ linkAllNews }
				</div>
			</div>
		)
	}
}

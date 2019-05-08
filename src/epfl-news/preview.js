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
	}

	getNews() {
		const { attributes } = this.props;
		
		let URL_NEWS = `https://actu-test.epfl.ch/api/v1/channels/${attributes.channel}/news/`;
		URL_NEWS += `?format=json&lang=${attributes.lang}&limit=${attributes.nbNews}`;

		if (attributes.category !== "0") {
			URL_NEWS += `&category=${attributes.category}`;
		}
		
		if (attributes.themes !== null) {
			let themes = JSON.parse(attributes.themes);
			themes.forEach(theme => {
				URL_NEWS += `&themes=${theme.value}`;
			});
		}

		axios.get(URL_NEWS)
			.then( response => response.data.results )
			.then( newsList => {
				let channelName = "";
				if (newsList.length > 0) {
					channelName = newsList[0].channel.name.toLowerCase();
				}
				this.setState({ newsList: newsList, channelName: channelName }) 
			})
			.catch( err => console.log(err))
	}

	componentDidMount() {
		this.getNews();
	}

	componentDidUpdate() {
		this.getNews();	
	}

	render() {

		if ( ! this.state.newsList ) {
			return (
				<p>
					<Spinner />
					{ __('Chargement des actualités') }
				</p>
			)
		}

		if ( this.state.newsList.length === 0 ) {
			return (
				<p>
					{ __('Aucune actualité trouvée') }
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
				<p class="text-center">
					<a class="link-pretty" href={ url }>Toutes les actualités</a>
				</p>
			)
		}
					
		return (
			<div className={ className }>
				<div class="list-group">
				
					{ this.state.newsList.map( news => {
						return (
							
							<a href="#" className="list-group-item list-group-teaser link-trapeze-vertical">
								<div className="list-group-teaser-container">
									<div className="list-group-teaser-thumbnail">
										<picture>
											<img src={ news.thumbnail_url } className="img-fluid" alt={ news.visual_description } />
										</picture>
									</div>
									<div className="list-group-teaser-content" itemscope itemtype="http://schema.org/Article">
										<p className="h5" itemprop="name">{ news.title }</p>
										<p>
											<time datetime={ news.publish_date } itemprop="datePublished">{ moment(news.publish_date).format('L').split('/').join('.') } </time>
											<span className="text-muted" itemprop="description">— { stripHtml(news.subtitle) }</span>
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

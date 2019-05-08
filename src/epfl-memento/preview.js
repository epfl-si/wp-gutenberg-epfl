import * as axios from 'axios';
import stripHtml from "string-strip-html"; 
import moment from 'moment';

const { __ } = wp.i18n
const { Spinner } = wp.components
const { Component } = wp.element

export default class PreviewMemento extends Component {

	state = {
		eventsList: null,
	}

	getEvents() {
		const { attributes } = this.props;
		
		let URL_EVENTS = `https://memento-test.epfl.ch/api/v1/mementos/${attributes.memento}/events/`;
		URL_EVENTS += `?format=json&lang=${attributes.lang}&limit=5`;

		if (attributes.category !== "0") {
			URL_NEWS += `&category=${attributes.category}`;
		}

		axios.get(URL_EVENTS)
			.then( response => response.data.results )
			.then( eventsList => {
				this.setState({ eventsList: eventsList }) 
			})
			.catch( err => console.log(err))
	}

	componentDidMount() {
		this.getEvents();
	}

	componentDidUpdate() {
		this.getEvents();	
	}

	render() {

		if ( ! this.state.eventsList ) {
			return (
				<p>
					<Spinner />
					{ __('Loading events') }
				</p>
			)
		}

		if ( this.state.eventsList.length === 0 ) {
			return (
				<p>
					{ __('No events found') }
				</p>
			)
		} else  {
			console.log(this.state.eventsList);
		}

        const { className, attributes } = this.props
        
        return (
            <div className={ className }>
            <div className="list-group">

                { this.state.eventsList.map( event => {
					return (

                        <a href="#" className="list-group-item list-group-item-gray list-group-teaser link-trapeze-vertical" itemscope itemtype="http://schema.org/Event">
                            <div className="list-group-teaser-container">
                                <div className="list-group-teaser-thumbnail">
                                    <picture>
                                        <img src={ event.visual_url} class="img-fluid" alt={ event.image_description } />
                                    </picture>
                                </div>
                                <div className="list-group-teaser-content">
                                    <p className="h5 card-title" itemprop="name">{ event.title }</p>
                                    <div className="card-info mt-0">
                                        <span className="card-info-date" itemprop="startDate" content="2018-01-10T12:00">10.01.2018</span>
                                        <span className="event-time">13:00</span>
                                        <span className="event-time">17:30</span>
                                        <p>
                                            <span itemprop="performer" itemscope itemtype="http://schema.org/performer">
                                                Avec <b>Prof. Dr. Aditya Mueller</b>
                                            </span>            
                                            <span itemprop="location" itemscope itemtype="http://schema.org/Place">
                                                <br />
                                                Lieu : <b><span itemprop="name">ArtLab EPFL</span></b>
                                                <br /> Catégorie : <b>Événements culturel</b><br />
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    )
                }) }
            </div>
            </div>
        )

        {/* 
		return (
			<div className={ className }>
				<div class="list-group">
				
					{ this.state.eventsList.map( event => {
						return (
							
							<a href="#" className="list-group-item list-group-teaser link-trapeze-vertical">
								<div className="list-group-teaser-container">
									<div className="list-group-teaser-thumbnail">
										<picture>
											<img src={ event.visual_url } className="img-fluid" alt={ event.image_description } />
										</picture>
									</div>
									<div className="list-group-teaser-content" itemscope itemtype="http://schema.org/Article">
										<p className="h5" itemprop="name">{ event.title }</p>
										<p>
											<time datetime={ event.publish_date } itemprop="datePublished">{ moment(event.start_date).format('L').split('/').join('.') } </time>
											<span className="text-muted" itemprop="description">— { stripHtml(event.description) }</span>
										</p>
									</div>
								</div>
							</a>
						
							)
					}) }
					
				</div>
			</div>
        )
        */}		
	}
}

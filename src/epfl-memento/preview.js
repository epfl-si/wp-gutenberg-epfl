import * as axios from 'axios';

const { __ } = wp.i18n
const { Spinner } = wp.components
const { Component } = wp.element

export default class PreviewMemento extends Component {

	state = {
		events: null,
		eventsUrl: null
	}

	getEventsUrl() {

		const { attributes } = this.props;
		
		let eventsUrl = `https://memento-test.epfl.ch/api/v1/mementos/${attributes.memento}/events/`;
		eventsUrl += `?format=json&lang=${attributes.lang}&period=${attributes.period}&limit=5`;

		if (attributes.category !== "0") {
			eventsUrl += `&category=${attributes.category}`;
		}

		if (attributes.keyword !== '') {
			eventsUrl += `&keywords=${attributes.keyword}`;
		}

		return eventsUrl;
	}

	getEvents() {
		let eventsUrl = this.getEventsUrl();
		axios.get(eventsUrl)
			.then( response => response.data.results )
			.then( events => {
				this.setState({ events: events, eventsUrl: eventsUrl }) 
			})
			.catch( err => console.log(err))
	}

	componentDidMount() {
		this.getEvents();
	}

	componentDidUpdate() {
		console.log(`${this.state.eventsUrl}` == `${this.getEventsUrl()}`);
		if (this.getEventsUrl() !== this.state.eventsUrl) {
			this.getEvents();
		}
	}
	
	getVisualUrl(event, memento) {
		
		let visualUrl = "";
		if (event.academic_calendar_category == null) {
			if (event.visual_url) {
				visualUrl = event.visual_url;
			} else {
				if (memento == '11') {
					visualUrl = "https://memento.epfl.ch/static/img/Others.jpg";
				} else {
					visualUrl = "https://memento.epfl.ch/static/img/default.jpg";
				}
			}
		} else {
			visualUrl = "https://memento.epfl.ch/static/img/";
			visualUrl += event.academic_calendar_category.en_label;
			visualUrl += ".jpg";
		}
		return visualUrl;
	}

	render() {

		if ( ! this.state.events ) {
			return (
				<p>
					<Spinner />
					{ __('Loading events') }
				</p>
			)
		}

		if ( this.state.events.length === 0 ) {
			return (
				<p>
					{ __('No events found') }
				</p>
			)
		} else  {
			// console.log(this.state.events);
		}

		const { className, attributes } = this.props
		const academicCalendarStyle = { 
			position: 'absolute', color: '#FFF', padding: '10px 0 0 10px', lineHeight: '1.35em', fontSize:'1em'
		}
        
        return (
            <div className={ className }>
            <div className="list-group">

                { this.state.events.map( event => {
					
					let visualUrl = this.getVisualUrl(event, attributes.memento);
					let academicCalendarCategory = event.academic_calendar_category == null ? '' : event.academic_calendar_category.fr_label;
					return (

                        <a key={event.id} href="#" className="list-group-item list-group-item-gray list-group-teaser link-trapeze-vertical" itemScope itemType="http://schema.org/Event">
                            <div className="list-group-teaser-container">
                                <div className="list-group-teaser-thumbnail">
                                    <picture>
										<span style={academicCalendarStyle}>
            								<meta itemProp="eventStatus" content="https://schema.org/EventCancelled" />
											{ academicCalendarCategory }
          								</span>
                                        <img src={ visualUrl} className="img-fluid" alt={ event.image_description } />
                                    </picture>
                                </div>
                                <div className="list-group-teaser-content">
                                    <p className="h5 card-title" itemProp="name">{ event.title }</p>
                                    <div className="card-info mt-0">
                                        <span className="card-info-date" itemProp="startDate" content="2018-01-10T12:00">10.01.2018</span>
                                        <span className="event-time">13:00</span>
                                        <span className="event-time">17:30</span>
                                        <p>
                                            <span itemProp="performer" itemScope itemType="http://schema.org/performer">
                                                Avec <b>Prof. Dr. Aditya Mueller</b>
                                            </span>            
                                            <span itemProp="location" itemScope itemType="http://schema.org/Place">
                                                <br />
                                                Lieu : <b><span itemProp="name">ArtLab EPFL</span></b>
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
	}
}

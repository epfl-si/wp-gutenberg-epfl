import * as axios from 'axios';

const { __ } = wp.i18n
const { Spinner } = wp.components
const { Component } = wp.element

export default class PreviewMemento extends Component {

	state = {
		events: null,
	}

	getEvents() {
		const { attributes } = this.props;
		
		let urlEvents = `https://memento-test.epfl.ch/api/v1/mementos/${attributes.memento}/events/`;
		urlEvents += `?format=json&lang=${attributes.lang}&period=${attributes.period}&limit=5`;

		if (attributes.category !== "0") {
			urlEvents += `&category=${attributes.category}`;
		}

		if (attributes.keyword !== '') {
			urlEvents += `&keywords=${attributes.keyword}`;
		}

		axios.get(urlEvents)
			.then( response => response.data.results )
			.then( events => {
				this.setState({ events: events }) 
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
			//console.log(this.state.events);
		}

        const { className, attributes } = this.props
        
        return (
            <div className={ className }>
            <div className="list-group">

                { this.state.events.map( event => {
					return (

                        <a key={event.id} href="#" className="list-group-item list-group-item-gray list-group-teaser link-trapeze-vertical" itemScope itemType="http://schema.org/Event">
                            <div className="list-group-teaser-container">
                                <div className="list-group-teaser-thumbnail">
                                    <picture>
                                        <img src={ event.visual_url} className="img-fluid" alt={ event.image_description } />
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

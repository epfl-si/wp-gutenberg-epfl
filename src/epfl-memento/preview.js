import * as axios from 'axios';
import moment from 'moment';

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

		let eventsUrl = `${BASE_MEMENTO_API_REST_URL}mementos/${attributes.memento}/events/`;
    eventsUrl += `?format=json&period=${attributes.period}&limit=${attributes.nbEvents}`;

    if (attributes.lang === 'fr') {
      eventsUrl += `&lang=fr,en`;
    } else {
      eventsUrl += `&lang=en,fr`;
    }

		if (attributes.categories !== null) {
			let categories = JSON.parse(attributes.categories);
			categories.forEach(category => {
			  eventsUrl += `&category=${category.value}`;
			});
		}

		if (attributes.keyword !== '') {
			eventsUrl += `&keywords=${attributes.keyword}`;
    }
    
    if (attributes.period === 'past' && attributes.year !== 'no-filter') {
      eventsUrl += `&start_year=${attributes.year}`;
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
					{ __('Loading events', 'epfl') }
				</p>
			)
		}

		if ( this.state.events.length === 0 ) {
			return (
				<p>
					{ __('No event found', 'epfl') }
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

          let placeAndRoom;
          if (!!event.place_and_room) {
            placeAndRoom = <span><br/>{ __('Place and room', 'epfl') }: <b><span itemProp="name">{ event.place_and_room }</span></b></span>;
          }

          let urlOnlineRoom;
          if (!!event.url_online_room) {
            urlOnlineRoom = <span><br/>{ __('Online', 'epfl') }: <b><span itemProp="name">{ event.url_online_room }</span></b></span>;
          }

          let eventSpeakerContent;
          if (!!event.speaker) {
            eventSpeakerContent = <span>{ __('With', 'epfl') } <b>{event.speaker}</b></span>;
          }

          let academicCalendarCategory;
          if (!!event.academic_calendar_category) {
            academicCalendarCategory = event.academic_calendar_category.fr_label;
          }

          let startDate;
          if (!!event.start_date) {
            startDate = <span className="card-info-date" itemProp="startDate">{moment(event.start_date).format("DD-MM-YYYY")}</span>
          }

          let startTime;
          if (!!event.start_time) {
            startTime = <span className="event-time">{ moment(event.start_time,'h:mm').format('h:mm') }</span>
          }

          let endTime;
          if (!!event.end_time) {
            endTime = <span className="event-time">{ moment(event.end_time,'h:mm').format('h:mm') }</span>
          }

          let endDate;
          if (!!event.end_date) {
            endDate = <span className="card-info-date" itemProp="endDate">{moment(event.end_date).format("DD-MM-YYYY")}</span>
          }

          let category;
          if (!!event.category.en_label) {
            category = <span>{ __('Category:', 'epfl') } <b>{ event.category.en_label }</b></span>
          }

					return (
            <a key={event.id} href="#" className="list-group-item list-group-item-gray list-group-teaser link-trapeze-vertical" itemScope itemType="http://schema.org/Event">
              <div className="list-group-teaser-container">
                  <div className="list-group-teaser-thumbnail">
                    <picture>
                      <span style={ academicCalendarStyle }>
                        { academicCalendarCategory }
                      </span>
                      <img src={ visualUrl } className="img-fluid" alt={ event.image_description } />
                    </picture>
                    </div>
                    <div className="list-group-teaser-content">
                      <p className="h5 card-title" itemProp="name">{ event.title }</p>
                        <div className="card-info mt-0">
                          { startDate } - { endDate } <br />
                          { startTime } > { endTime }
                          <p>
                            <span>
                            { eventSpeakerContent }
                            </span>
                            <span>
                                { placeAndRoom }
                                { urlOnlineRoom }
                                <br />
                                { category }<br />
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

import * as axios from 'axios'
import dayjs from 'dayjs'
import DOMPurify from 'dompurify'

const { __ } = wp.i18n
const { Spinner } = wp.components
const { Component } = wp.element

export default class PreviewMemento extends Component {

	state = {
		events: null,
		eventsUrl: null
	}

	getEventsUrl() {

		const { attributes } = this.props
		let eventsUrl = ''

		if (attributes.memento === 0) {  // get all events on 0
			eventsUrl = `${ BASE_MEMENTO_API_REST_URL }events/`
		} else {
			eventsUrl = `${ BASE_MEMENTO_API_REST_URL }mementos/${ attributes.memento }/events/`
		}

		eventsUrl += `?format=json&period=${ attributes.period }&limit=${ attributes.nbEvents }`

		if (attributes.lang === 'fr') {
			eventsUrl += `&lang=fr,en`
		} else {
			eventsUrl += `&lang=en,fr`
		}

		if (attributes.categories !== null) {
			let categories = JSON.parse(attributes.categories)
			categories.forEach(category => {
				eventsUrl += `&category=${ category.value }`
			})
		}

		if (attributes.keyword !== '') {
			eventsUrl += `&keywords=${ attributes.keyword }`
		}

		if (attributes.period === 'past' && attributes.year !== 'no-filter') {
			eventsUrl += `&start_year=${ attributes.year }`
		}

		return eventsUrl
	}

	getEvents() {
		let eventsUrl = this.getEventsUrl()
		axios.get(eventsUrl)
			.then(response => response.data.results)
			.then(events => {
				this.setState({ events: events, eventsUrl: eventsUrl })
			})
			.catch(err => console.log(err))
	}

	componentDidMount() {
		this.getEvents()
	}

	componentDidUpdate() {
		if (this.getEventsUrl() !== this.state.eventsUrl) {
			this.getEvents()
		}
	}

	getVisualUrl(event, memento) {

		let visualUrl = ''
		if (event.academic_calendar_category == null) {
			if (event.visual_url) {
				visualUrl = event.visual_url
			} else {
				if (memento == '11') {
					visualUrl = 'https://memento.epfl.ch/static/img/Others.jpg'
				} else {
					visualUrl = 'https://memento.epfl.ch/static/img/default.jpg'
				}
			}
		} else {
			visualUrl = 'https://memento.epfl.ch/static/img/'
			visualUrl += event.academic_calendar_category.en_label
			visualUrl += '.jpg'
		}
		return visualUrl
	}

	render() {

		if (!this.state.events) {
			return (
				<p>
					<Spinner/>
					{ __('Loading events', 'epfl') }
				</p>
			)
		}

		if (this.state.events.length === 0) {
			return (
				<p>
					{ __('No event found', 'epfl') }
				</p>
			)
		} else {
			// console.log(this.state.events);
		}

		const { className, attributes } = this.props
		const academicCalendarStyle = {
			position: 'absolute', color: '#FFF', padding: '10px 0 0 10px', lineHeight: '1.35em', fontSize: '1em'
		}

		return (
			<div className={ className }>
				<div className="list-group">
					{ this.state.events.map(event => {

						let visualUrl = this.getVisualUrl(event, attributes.memento)

						let placeAndRoom
						if (!!event.place_and_room) {
							placeAndRoom = <span><br/>{ __('Place and room', 'epfl') }: <b><span
								itemProp="name">{ event.place_and_room }</span></b></span>
						}

						let urlOnlineRoom
						if (!!event.url_online_room) {
							urlOnlineRoom = <span><br/>{ __('Online', 'epfl') }: <b><span
								itemProp="name">{ event.url_online_room }</span></b></span>
						}

						let eventSpeakerContent
						if (!!event.speaker) {
							eventSpeakerContent = <span>{ __('With', 'epfl') } <b
								dangerouslySetInnerHTML={ { __html: DOMPurify.sanitize(event.speaker) } }></b></span>
						}

						let academicCalendarCategory
						if (!!event.academic_calendar_category) {
							academicCalendarCategory = event.academic_calendar_category.fr_label
						}

						const startTime = dayjs(event.start_date + ' ' + ( event.start_time || '' )),
							endTime = dayjs(( event.end_date || event.start_date ) + ' ' + ( event.end_time || ( event.start_time || '' ) ))
						let startDateSpan
						if (!!event.start_date) {
							startDateSpan = <span className="card-info-date"
												  itemProp="startDate">{ startTime.format('DD-MM-YYYY') }</span>
						}

						let startTimeSpan
						if (!!event.start_time) {
							startTimeSpan = <span className="event-time">{ startTime.format('H:mm') }</span>
						}

						let endTimeSpan
						if (!!event.end_time) {
							endTimeSpan = <span className="event-time">{ endTime.format('H:mm') }</span>
						}

						let endDateSpan
						if (!!event.end_date) {
							endDateSpan = <span className="card-info-date"
												itemProp="endDate">{ endTime.format('DD-MM-YYYY') }</span>
						}

						let category
						if (!!event.category.en_label) {
							category = <span>{ __('Category:', 'epfl') } <b>{ event.category.en_label }</b></span>
						}

						return (
							<a key={ event.id } href="#"
							   className="list-group-item list-group-item-gray list-group-teaser link-trapeze-vertical"
							   itemScope itemType="http://schema.org/Event">
								<div className="list-group-teaser-container">
									<div className="list-group-teaser-thumbnail">
										<picture>
                      <span style={ academicCalendarStyle }>
                        { academicCalendarCategory }
                      </span>
											<img src={ visualUrl } className="img-fluid"
												 alt={ event.image_description }/>
										</picture>
									</div>
									<div className="list-group-teaser-content">
										<p className="h5 card-title" itemProp="name">{ event.title }</p>
										<div className="card-info mt-0">
											{ startDateSpan } - { endDateSpan } <br/>
											{ startTimeSpan } > { endTimeSpan }
											<p>
                            <span>
                            { eventSpeakerContent }
                            </span>
												<span>
                                { placeAndRoom }
													{ urlOnlineRoom }
													<br/>
													{ category }<br/>
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

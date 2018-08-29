import React, { Component } from 'react';

class ListView extends Component {
	state = {
	query: ''
	}

	updateSelectValue =(query) => {
			if (query === 'All genre') {
				query = ''
			}
			this.props.getVenues(query)
	}

	render() {

	return (
		<div id="list-view" className="list-view menu-close">		
			<select className="select-box" role="menu" aria-label="filter the list by food genre" tabIndex="0" onChange={(event) =>
				this.updateSelectValue(event.target.value)}>
				<option value="restaurant-" select='false' tabIndex="-1">--Choose the genre--</option>
				<option value="japanese">Japanese</option>
				<option value="french">French</option> 
				<option value="indian">Indian</option>
				<option value="italian">Italian</option>
				<option value="moroccan">Moroccan</option>
			</select>
			 
			<div className="list-field">
				<ol className="restaurants-list">
				{
					this.props.restaurantList.map(venues => {
						return (
							<li className="rest-name" key={venues.venue.id} role="presentation" tabIndex="0">
								<div onClick={() =>
									this.props.updateMap(venues.venue.name)} //click in the list and call updated initMap								
								>
								{venues.venue.name}
								</div>
							</li>	
						);				
					})
				}
				</ol>
			</div>
		</div>
    )}	
}

export default ListView;
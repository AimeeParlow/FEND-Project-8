import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import ListView from './components/ListView';

class App extends Component {
	state = {
		venues: [], //restaurants' info
		query: '' //keyword for searching on API
	}

	componentDidMount() {
		this.getVenues()
	}
	
	renderMap = () => { //load google map
		loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyA4AP8-J1NH8iZ6wdlXXxBoNsdoyBV1MP4&libraries=places&callback=initMap")
		window.initMap = this.initMap
	}
	
	getVenues = (query) => { //getting info from foursquare
		const endPoint = "https://api.foursquare.com/v2/venues/explore?"
		const parameters = {
			client_id:"VOWHF12AYY4BQZRETFYVEDGRZQ52LSQGZN14RKDAHQFWCYBD",
			client_secret:"411SGC4GHFVJ4RL4ADHY31XO54HRYATEC11QHONIPWFI3D3P",
			query:"restaurant-" + query,
			near:"Paris",
			v: "20182808"
		}
		
		axios.get(endPoint + new URLSearchParams(parameters))//fetch info from foursquare
		.then(response => {
			this.setState({
				venues: response.data.response.groups[0].items
			}, this.renderMap())
			})
			.catch(error => {		
				alert(error)
			})
	}
	
	initMap = (value) => {
        
		//create and display default map
		let map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: 48.853089, lng: 2.350460 },
          zoom: 12
        })
		
		//create an info window
		let infowindow = new window.google.maps.InfoWindow()

			
		//display markers on the map
		this.state.venues.map(currentVenues => {
		
			//contents in the info window
			let contentString = 
				`<div className="info-name">${currentVenues.venue.name}</div>` +
				`<div className="info-address">Address: ${currentVenues.venue.location.address}, 
					${currentVenues.venue.location.city}</div>`
			
			//display a marker at proper location of each restaurant on the map
			let marker = new window.google.maps.Marker({
			position: {lat: currentVenues.venue.location.lat, lng: currentVenues.venue.location.lng},
			map: map,
			title: currentVenues.venue.name //show the name on-cursor
			})
			
			//click on a marker
		    marker.addListener('click', function() {
				
				//create the content
				infowindow.setContent(contentString)
				
				//open info window
				infowindow.open(map, marker)
			})
			
			//if a restaurant in the list-view is clicked, display its marker 
			if(value !== '' && currentVenues.venue.name === value){
				infowindow.setContent(contentString)
				infowindow.open(map, marker)
			}
			return {}
		})
	}
	
	//function for menu button for mobile 
	clickAction=()=> {
	let listView = document.getElementById('list-view');
	listView.classList.toggle("menu-open");
	}
	
	render() {
		return(		
			<main role="main">
				<header id="header">
					<span>Neighborhood Map</span>
				</header>
				<div id="container">				
					<ListView 
						restaurantList = {this.state.venues}
						getVenues = {this.getVenues}
						initMap = {this.initMap}
					/>
					<div id="menu" className="menu" role="menu">
						<button className="button" tabIndex="0" onClick={this.clickAction}>☰</button>
					</div>
 					<div id="map" role="application" tabIndex="-1"></div>
				</div>
			</main>
	)}
}

//function for loading map
function loadScript(url) {
	let index = window.document.getElementsByTagName("script")[0]
	let script = window.document.createElement("script")
	script.src = url
	script.sync = true
	script.defer = true
	index.parentNode.insertBefore(script, index)
}

export default App;

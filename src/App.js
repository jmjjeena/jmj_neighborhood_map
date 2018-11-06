import React, { Component } from 'react';
import './App.css';
import Map from './component/Map';
import SquareAPI from "./API/";
import SideBar from './component/SideBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 15,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }
 
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers) });
  };

  handleMarkerClick = (marker) => {
    this.closeAllMarkers();
    console.log(marker);
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers,marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({venues: Object.assign(this.state.venues, newVenue) });
      console.log(newVenue);
    }); 
  };

  handleListItemCheck = venue => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
    // console.log(venue);
  }

  componentDidMount() {
    SquareAPI.search({
      near: "San Francisco,CA",
      query: "Cafe",
      limit: 10,
      radius: 500
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        };
      });
      this.setState({
        venues,
        center,
        markers
      });
      console.log(markers);
    });
  }

  render() {
    return (
      <div className="App">
      <SideBar {...this.state} handleListItemCheck = {this.handleListItemCheck}/>
        <Map {...this.state}
        handleMarkerClick = {this.handleMarkerClick}/>
      </div>
    );
  }
}

export default App;

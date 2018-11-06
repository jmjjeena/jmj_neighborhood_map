import React, { Component } from 'react';
import './App.css';
import SquareAPI from "./API/";
import Map from "./component/Map";
import SideBar from './component/SideBar';
import InfoPane from './component/Info-Pane';

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
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
    // console.log(marker);
    marker.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker) });
    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({venues: Object.assign(this.state.venues, newVenue) });
      // console.log(newVenue);
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
      this.setState({ venues, center, markers });
      // console.log(results)
    });
  }

  render() {
    return (
      <main role="main">
        <header role="banner" id="title">

          <h1>Best Cafés in San Francisco</h1>
          <h2>Information and Locations of Cafés</h2>
          <p>(You can use the list filter on the left or quickly reference the info cards on the right.)</p>
        </header>

        <div className="App">
          <SideBar id="side-bar" role="main" aria-label="venue filter results list"
          {...this.state} handleListItemCheck = {this.handleListItemCheck}/>

          <Map role="complementary" aria-label="map"
          {...this.state}
          handleMarkerClick = {this.handleMarkerClick}/>

          <InfoPane {...this.state}
            handleListItemClick={this.handleListItemClick} />
        </div>
      </main>
    );
  }
}

export default App;

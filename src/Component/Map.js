/*global google*/
import React, { Component } from 'react';
import { 
        withScriptjs, 
        withGoogleMap, 
        GoogleMap, 
        Marker,
        InfoWindow
        } from "react-google-maps"

        // Set map bounds
const MyMapComponent = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            role="application"
            aria-label="map"
            id="map"
            defaultZoom={8}
            zoom={props.zoom}
            defaultCenter={{ lat: 37.775073, lng: -122.419457 }}
            center={props.center}
        >
            {props.markers && 
                props.markers
                    .filter(marker => marker.isVisible)
                    .map((marker, idx, arr) => {
                        //match venue with marker
                        const venueInfo = props.venues.find(venue => venue.id === marker.id);
                        return (
                            <Marker 
                                key={idx}
                                position={{lat: marker.lat, lng: marker.lng }}
                                onClick={() => props.handleMarkerClick(marker)}
                                 //markers drop when loaded and bounce if only one location left
                                animation={arr.length === 1 || marker.isOpen ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
                            >
                                {marker.isOpen && 
                                    venueInfo.bestPhoto && (
                                    <InfoWindow onCloseClick={() => props.closeAllMarkers()}>
                                            <React.Fragment>
                                                <img 
                                                    src = {`${venueInfo.bestPhoto.prefix}170x170${
                                                        venueInfo.bestPhoto.suffix
                                                    }`}
                                                    alt={"Venue"}
                                                />
                                            <h3>{venueInfo.name}</h3>
                                            <a href={venueInfo.shortUrl}>More Info</a>
                                            <p>{venueInfo.price.currency}</p>
                                            <p>{venueInfo.contact.formattedPhone}</p>
                                            <p>{venueInfo.location.formattedAddress[0]}</p>
                                            <p>{venueInfo.location.formattedAddress[1]}</p>
                                            </React.Fragment>
                                        </InfoWindow>
                                    )}
                            </Marker>
                        );
                    })}
        </GoogleMap>
    ))
); 
    

export default class Map extends Component {
    render() {
        return (
            < MyMapComponent
                {...this.props}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCVjG1_rpwST332EGF3YRDaSO0ez-ws_aw"
                loadingElement={< div style={{ height: `100%` }} />}
                //sizes map to allow room for sidebar
                containerElement={< div style={{ height: `100%`, width: `50%` }} />}
                mapElement={< div style={{ height: `100%`}} />}
            />
        )
    }
}


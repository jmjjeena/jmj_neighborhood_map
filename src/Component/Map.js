import React, { Component } from 'react';
import { withScriptjs, 
         withGoogleMap, 
         GoogleMap, 
         Marker,
         InfoWindow
        } from "react-google-maps"

const MyMapComponent = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            defaultZoom={8}
            zoom={props.zoom}
            defaultCenter={{ lat: 37.775073, lng: -122.419457 }}
            center={props.center}
        >
            {props.markers && 
                props.markers
                    .filter(marker => marker.isVisible)
                    .map((marker, idx) => {
                        const venueInfo = props.venues.find(venue => venue.id === marker.id);
                       return (
                       <Marker 
                            key={idx} 
                            position={{lat: marker.lat, lng: marker.lng}}
                            onClick={() => props.handleMarkerClick(marker)}
                        >
                            {marker.isOpen && 
                            venueInfo.bestPhoto && (
                            <InfoWindow>
                                <React.Fragment>
                                    <img 
                                        src = {`${venueInfo.bestPhoto.prefix}200x200${
                                            venueInfo.bestPhoto.suffix
                                        }`}
                                        alt={"Venue pic"}
                                    />
                                        <p>{venueInfo.name}</p>
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
                containerElement={< div style={{ height: `400px` }} />}
                mapElement={< div style={{ height: `100%` }} />}
            />
        )
    }
}


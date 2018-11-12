/*global google*/
//above google comment required for marker animations
import React, { Component } from "react";
import VenueCard from './VenueCard';

import { 
        withScriptjs,
        withGoogleMap, 
        GoogleMap, 
        Marker, 
        InfoWindow 
    } from "react-google-maps";
import ErrorBoundary from "./ErrorBoundary";

const MapComponent = withScriptjs(
    withGoogleMap(props => (
        <GoogleMap
            role="application"
            aria-label="map"
            id="map"
            defaultZoom={8}
            zoom={props.zoom}
            defaultCenter={{ lat: 37.775073, lng: -122.419457}}
            center={{
                lat: parseFloat(props.center.lat),
                lng: parseFloat(props.center.lng)
            }}
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
                                position={{ lat: marker.lat, lng: marker.lng }}
                                onClick={() => props.handleMarkerClick(marker)}
                                //markers drop when loaded and bounce if only one location left
                                animation={arr.length === 1 || marker.isOpen ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
                                icon={{
                                    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                                }}
                            >
                                {marker.isOpen &&
                                    venueInfo.bestPhoto && (
                                    <InfoWindow className="venueCard" onCloseClick={() => props.closeAllMarkers()}>
                                        <VenueCard 
                                            prefix= {venueInfo.bestPhoto.prefix}
                                            suffix={venueInfo.bestPhoto.suffix}
                                            name={venueInfo.name}
                                            shortUrl={venueInfo.shortUrl}
                                            price={venueInfo.price}
                                            formattedPhone={venueInfo.contact.formattedPhone}
                                            formattedAddress={venueInfo.location.formattedAddress}
                                        />
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
            <ErrorBoundary>
                {/* // uncomment below to test full app error message(for maps only test, break api key or url in map.js) */}
                {/* {null.map(errorTestSwitch => errorTestSwitch)}  */}
                {/* // Error from above flashes for only 2 seconds in developer mode, build and deploy for sustained testing */}
                <MapComponent className="map"
                    {...this.props}
                    // error from broken url will hold frame size and display info
                    // wrong api key shows default google error message
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCVjG1_rpwST332EGF3YRDaSO0ez-ws_aw"
                    loadingElement={<div style={{ height: `100%` }} />}
                    //sizes map to allow room for sidebar
                    containerElement={<div style={{ height: `100%`, width: `75%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </ErrorBoundary>
        )
    }
}


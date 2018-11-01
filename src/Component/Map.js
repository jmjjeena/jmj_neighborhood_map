import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: 37.775073, lng: -122.419457 }}
    >
        {props.isMarkerShown && <Marker position={{ lat: 37.775073, lng: -122.419457 }} />}
    </GoogleMap>
))

    

export default class Map extends Component {
    render() {
        return (
            < MyMapComponent
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCVjG1_rpwST332EGF3YRDaSO0ez-ws_aw"
                loadingElement={< div style={{ height: `100%` }} />}
                containerElement={< div style={{ height: `400px` }} />}
                mapElement={< div style={{ height: `100%` }} />}
            />
        )
    }
}


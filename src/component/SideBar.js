import React, { Component } from "react";
import VenueList from "./VenueList";

export default class SideBar extends Component {
    state = {
            query: "",
            venues: []
        };

    handleFilterVenues = () => {
        const { query } = this.state;
        const { venues } = this.props;

        if (query.trim() !== "") {
            const allVenues = venues.filter(venue => 
                venue.name.toLowerCase().includes(query.toLowerCase()))
            return allVenues;
        }
        return venues;
    };
    handleChange = e => {
        const value = e.target.value;
        const { venues, markers, updateSuperState } = this.props;

        this.setState({ query: value });
        const newMarkers = venues.map(venue => {
            const matched = 
                venue.name.toLowerCase().includes(value.toLowerCase());
            const marker = markers.find(marker => marker.id === venue.id);
            // filters venues as input matches
            if (matched) {
                marker.isVisible = true;
            } else {
                marker.isVisible = false;
            }
            return marker;
        });
        updateSuperState({ markers: newMarkers });
    };
    render() {
        const { handleListItemClick} = this.props;
        const { handleFilterVenues, handleChange } = this;
        return (
            <div className="sideBar">
                {/* search bar */}
                <div className="cursor">
                    <input
                        // aria-label={labelText}
                        role="Search"
                        aria-required="true"
                        type={"search"}
                        id="search"
                        tabIndex="0"
                        placeholder={"Search"}
                        onChange={e => handleChange(e)} 
                    />
                </div>
               
                <VenueList
                    {...this.props}
                    venues={handleFilterVenues()}
                    handleListItemClick={handleListItemClick} 
                />
            </div>
        );
    }
}

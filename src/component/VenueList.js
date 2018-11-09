import React from "react";
import ListItem from "./ListItem";

const VenueList = ({ venues, handleListItemClick }) => {
    return (
        <ol className="venueList">
            {venues &&
                venues.map((venue, idx) => (
                    <ListItem
                        key={idx}
                        {...venue}
                        handleListItemClick={handleListItemClick} 
                    />
                ))}
        </ol>
    );
}
        
export default VenueList;

import React from "react";

const VenueCard = (props) => {
    return (
        <div className="venueCard">
            <img src={`${props.prefix}170x170${props.suffix}`} alt={"Venue"} />
            <h3>{props.name}</h3>
            <a href={props.shortUrl}>More Info</a>
            <p>{props.price && props.price.currency ? props.price.currency : ""}</p>
            <p>{props.formattedPhone}</p>
            <p>{props.formattedAddress[0]}</p>
            <p>{props.formattedAddress[1]}</p>
        </div>
    );
}

export default VenueCard;
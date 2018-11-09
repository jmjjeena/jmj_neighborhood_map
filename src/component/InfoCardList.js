import React from "react";
import CardData from "./CardData";

const InfoCardList = ({ venues, handleListItemClick }) => {
    return (
        <div>
            {venues &&
                venues.map((venue, index) => (
                    <CardData
                        key={index}
                        {...venue}
                        handleListItemClick={handleListItemClick}
                    />
                ))}
        </div>
    );
}

export default InfoCardList;


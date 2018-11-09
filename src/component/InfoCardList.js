import React from "react";
import PaneData from "./PaneData";

const InfoCardList = ({ venues, handleListItemClick }) => {
    return (
        <div>
            {venues &&
                venues.map((venue, index) => (
                    <PaneData
                        key={index}
                        {...venue}
                        handleListItemClick={handleListItemClick}
                    />
                ))}
        </div>
    );
}

export default InfoCardList;


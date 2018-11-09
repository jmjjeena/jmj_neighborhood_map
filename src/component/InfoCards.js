import React, { Component } from "react";
import InfoCardList from "./InfoCardList";

export default class InfoCards extends Component {
    constructor() {
        super();
        this.state = {
            query: "",
            venues: []
        };
    }
    render() {
        console.log("props in InfoCards", this.props)
        return (
            <div className="info-cards">
                <h3 id="info-cards" tabIndex="0">Info Cards</h3>

                <InfoCardList
                    {...this.props}
                />
            </div>
        )
    }
}

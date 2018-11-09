import React, { Component } from "react";
import InfoList from "./InfoList";

export default class InfoPane extends Component {
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

                <InfoList
                    {...this.props}
                />
            </div>
        )
    }
}

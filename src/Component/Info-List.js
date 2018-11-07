import React, { Component } from "react";
import PaneData from "./Pane-Data";

export default class InfoList extends Component {
    render() {
        return (
            <div>
                {this.props.venues &&
                    this.props.venues.map((venue, index) => (
                        <PaneData key={index} {...venue} handleListItemClick={this.props.handleListItemClick} />
                    ))}
            </div>
        );
    }
}


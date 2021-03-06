import React, { Component } from "react";

export default class CardData extends Component {
    render() {
        return (

            <button className="card-data" onClick={() => this.props.handleListItemClick(this.props)}>
                <h4>{this.props.name}</h4>
                <p className="details">
                    {this.props.location.formattedAddress[0]}
                    {this.props.location.formattedAddress[1]}
                    {this.props.location.formattedAddress[0]}
                    {this.props.location.formattedAddress[1]}
                </p>
            </button>
        );
    }
}
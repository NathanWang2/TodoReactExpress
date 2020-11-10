import React, { Component } from 'react';
import { swapApp } from "./../../services/applicationChoice/app-choice";
import { Redirect } from "react-router-dom";

export default class ShareTaskApp extends Component {

    constructor(props) {
        super(props);

        this.switchApps = this.switchApps.bind(this);

        this.state = {
            redirect: {
                willRedirect: false,
                location: "",
            },
        }
    }

    // Change the app choice and then redirect.
    switchApps() {
        swapApp().then(newLocation => {
            console.debug("New Location: ", newLocation)

            const redirect = {
                location: newLocation,
                willRedirect: true,
            };

            this.setState({ redirect });
        });
    }

    render() {
        if (this.state.redirect.willRedirect) {
            return <Redirect to={this.state.redirect.location} />;
        }

        return (
            <div>
                <h1>Welcome to the Task Sharing Application!</h1>
                <p>
                    If you would like to switch applications
					<button onClick={this.switchApps}>click here!</button>
                    <br />
                    <br />
					This portion of the applicaion isn't done yet. <br />
                    Feel free to use the basic todo feature!
				</p>
            </div>
        )
    }
}
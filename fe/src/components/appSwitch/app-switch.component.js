import React, { Component } from "react";
import { set, get } from "idb-keyval";
import { Redirect, Link } from "react-router-dom";

const DB_NAME = "isModernApp";

const checkPreselect = async () => {
	const selection = await get(DB_NAME);

	console.debug("This is the selection: ", selection);
	if (typeof selection !== "undefined") {
		console.debug("Redirect to: ", selection);
		return selection;
	}
	return null;
};
/**
 * I'm thinking here I ask which app the user would like to use.
 * Save the choice in the indexedDB.
 *
 * Also have choices for them to switch even after they've selected.
 */
export default class AppSwitch extends Component {
	constructor() {
		super();

		this.state = {
			isModernApp: false,
			redirect: false,
			location: "",
		};

		this.onRadioChange = this.onRadioChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentDidMount() {
		checkPreselect().then((selection) => {
			if (selection) {
				this.setState({ redirect: true, location: selection });
			}
		});
	}

	onRadioChange = (e) => {
		let res = false;

		if (e.target.value === "true") {
			res = true;
		}
		this.setState({
			isModernApp: res,
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		const res = this.state.isModernApp;

		this.setState({ redirect: true });
		if (res) {
			// New app
			set(DB_NAME, "/create");
			this.setState({ location: "/create" });
		} else {
			// Basic app
			set(DB_NAME, "/basic");
			this.setState({ location: "/basic" });
		}
	};

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.location} />;
		}
		return (
			<div>
				<h1>Welcome to my first PWA!</h1>
				<p>
					Just to expalin, there are 2 applications. A basic todo
					application and a Task Sharing Application. The Basic
					application requires nothing to start, just click the button
					and you are on your way! The Task sharing application will
					require an email login to get the full functionality.
				</p>
				<h3>Which app would you like start out with?</h3>
				<h5>
					Don't worry, you can always switch between the applications
					:)
				</h5>
				<form onSubmit={this.onSubmit}>
					<label>
						<input
							type="radio"
							value="false"
							checked={this.state.isModernApp === false}
							onChange={this.onRadioChange}
						/>
						<span>Basic ToDo App</span>
					</label>
					<br />
					<label>
						<input
							type="radio"
							value="true"
							checked={this.state.isModernApp === true}
							onChange={this.onRadioChange}
						/>
						<span>Task Sharing App</span>
					</label>
					<br />
					<button type="submit">Choose App</button>
				</form>
			</div>
		);
	}
}

import React, { Component } from "react";

import {
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	TableBody,
	Toolbar,
	Typography,
	IconButton,
	Tooltip,
	makeStyles,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";

import "./main-table.css";

// Might add dates for each tasks to be done and how frequently.
const MOCK_TASKS = [
	{
		taskId: 1,
		title: "Dishes",
		desc: "Wash the dishes",
		users: ["Me", "roommate", "Dog?"],
	},
	{
		taskId: 2,
		title: "Trash",
		desc: "Take trash outside",
		users: ["roomate", "Dog?", "Me"],
	},
	{
		taskId: 3,
		title: "Cook",
		desc: "Make the lunches",
		users: ["Me", "roommate", "Dog?"],
	},
];

const useToolbarStyles = makeStyles((theme) => ({
	title: {
		flex: "1 1 100%",
	},
}));

function TableTitle() {
	const classes = useToolbarStyles();
	return (
		<Toolbar className="mainTable">
			<Typography className={classes.title} color="inherit" variant="h6">
				Tasks
			</Typography>
			<Tooltip title="Filter list">
				<IconButton>
					<FilterListIcon />
				</IconButton>
			</Tooltip>
		</Toolbar>
	);
}

export default class MainTable extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<TableTitle />
				<TableContainer component={Paper}>
					<Table size="medium" stickyHeader>
						<TableHead>
							<TableRow>
								<TableCell>Task Name</TableCell>
								<TableCell align="left">Description</TableCell>
								<TableCell align="left">
									Person In Charge
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{MOCK_TASKS.map((row) => (
								<TableRow key={row.taskId}>
									<TableCell align="left">
										{row.title}
									</TableCell>
									<TableCell align="left">
										{row.desc}
									</TableCell>
									<TableCell align="left">
										{row.users[0]}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		);
	}
}

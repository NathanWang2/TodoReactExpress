import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Link,
	Menu,
	MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import "./nav-bar.css";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	linkHover: {
		"&:hover": {
			// Secondary color
			color: "#ff4081",
		},
	},
}));

export default function NavBar() {
	const classes = useStyles();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" className="main">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon onClick={handleClick} />
						<Menu
							id="simple-menu"
							anchorEl={anchorEl}
							keepMounted
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Random</MenuItem>
							<MenuItem onClick={handleClose}>
								Another Entry
							</MenuItem>
							<MenuItem onClick={handleClose}>Logout</MenuItem>
						</Menu>
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						<Link
							href="/"
							color="inherit"
							className={classes.linkHover}
						>
							Not My Turn
						</Link>
					</Typography>
					{/* <Button color="inherit">
						<Typography variant="h6" className={classes.title}>
							Login
						</Typography>
					</Button> */}
				</Toolbar>
			</AppBar>
		</div>
	);
}

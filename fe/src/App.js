import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import TodoList from "./components/basicTodoApp/todos-list.component.js";
import EditTodo from "./components/edit-todo.component";
import CreateTodo from "./components/create-todo.component";
import NavBar from "./components/nav/nav-bar.component.js";
import AppSwitch from "./components/appSwitch/app-switch.component.js";
import ShareTaskApp from "./components/shareTaskApp/share-task-app.component";

function App() {
	return (
		<Router>
			<NavBar />
			<div className="container">
				<Switch>
					<Route path="/" exact>
						<AppSwitch />
					</Route>
					<Route path="/basic">
						<TodoList />
					</Route>
					<Route path="/full">
						<ShareTaskApp />
					</Route>
					<Route path="/edit/:id">
						<EditTodo />
					</Route>
					<Route path="/create">
						<CreateTodo />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;

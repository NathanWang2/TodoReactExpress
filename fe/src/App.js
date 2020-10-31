import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import TodoList from "./components/todos-list.component.js";
import EditTodo from "./components/edit-todo.component";
import CreateTodo from "./components/create-todo.component";

function App() {
	return (
		<Router>
			<div className="container">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<Link to="/" className="navbar-brand">
						Todo App
					</Link>
					{/* <div className="collpase navbar-collapse">
						<ul className="navbar-nav mr-auto">
							<li className="navbar-item">
								<Link to="/" className="nav-link">
									Todos
								</Link>
							</li>
							<li className="navbar-item">
								<Link to="/create" className="nav-link">
									Create Todo
								</Link>
							</li>
						</ul>
					</div> */}
				</nav>
				<h2>Todo App</h2>
				<Switch>
					<Route path="/" exact>
						<TodoList />
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

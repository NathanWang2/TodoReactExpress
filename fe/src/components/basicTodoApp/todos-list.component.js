import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { todoItem } from "../../models/todo-item";
import { set, get, del } from "idb-keyval";
import CreateTodo from "../create-todo.component";
import appChoice from "../../services/applicationChoice/app-choice";

const Todo = (props) => (
	<tr>
		<td>{props.todo.todo_description}</td>
		<td>{props.todo.todo_responsible}</td>
		<td>{props.todo.todo_priority}</td>
		<td>
			<Link to={"/edit/" + props.todo._id}>Edit</Link>
		</td>
	</tr>
);

const TodoForm = ({ addTodo }) => {
	let input;

	return (
		<div>
			<input
				ref={(node) => {
					input = node;
				}}
			/>

			<button
				onClick={() => {
					if (input.value.trim() !== "") {
						addTodo(input.value);
						input.value = "";
					}
				}}
			>
				+
			</button>
		</div>
	);
};

const RemoveComp = ({ todo, removeItem }) => {
	return (
		<div>
			<li
				onClick={() => {
					removeItem(todo.todoId);
				}}
			>
				{todo.todoDescription}
			</li>
		</div>
	);
};

const ListItems = ({ todos, removeItem }) => {
	// Map through the todos
	const todoNode = todos.map((todo) => {
		return (
			<RemoveComp todo={todo} key={todo.todoId} removeItem={removeItem} />
		);
	});
	return <ul>{todoNode}</ul>;
};

/**
 * Updates the local indexed db with the full state of the todo list
 */
const addOrRmDB = async function (todoItem) {
	set("todo-list", todoItem);
};

/**
 * Get's all todo tasks that are in the local indexed db
 */
const getAllTodoItems = async function () {
	const value = await get("todo-list");
	if (typeof value !== "undefined") {
		return value;
	}

	// console.debug(value);
	return false;
};

export default class TodosList extends Component {
	constructor(props) {
		super(props);
		this.switchApps = this.switchApps.bind(this);
		this.state = {
			todos: [
				// {
				// 	todoDescription: "Hi",
				// 	todoResponsible: "",
				// 	todoPriority: "",
				// 	todoCompleted: false,
				// },
			],
			redirect: {
				willRedirect: false,
				location: "",
			},
		};
	}

	componentDidMount() {
		// This is for offline use. It will update the state with indexed db data
		getAllTodoItems()
			.then((answer) => {
				if (answer) {
					this.updateState(answer);
				}
			})
			.catch((e) => {
				console.error(e);
			});
		// 	axios
		// 		.get("http://localhost:4000/todos")
		// 		.then((response) => {
		// 			this.setState({ todos: response.data });
		// 			console.debug("RESULTS: ", this.state.todos);
		// 		})
		// 		.catch(function (error) {
		// 			console.log(error);
		// 		});
	}

	/**
	 * If there are items in the indexed db, it will update the state here
	 * so the bullet points update properly
	 * @param allItems list of todo items from the indexed db
	 */
	updateState(allItems) {
		this.setState({ todos: allItems });
	}

	addTodo(val) {
		// console.debug("Adding Item");
		const newItem = new todoItem();

		newItem.todoId = new Date().getMilliseconds();
		newItem.todoDescription = val;
		newItem.todoPriority = "low";

		this.state.todos.push(newItem);

		addOrRmDB(this.state.todos);

		this.setState({ todos: this.state.todos });
	}

	removeItem(id) {
		// console.debug("Removing Item");
		const remainder = this.state.todos.filter((todo) => {
			if (todo.todoId !== id) {
				return todo;
			}
		});

		addOrRmDB(remainder);
		this.setState({ todos: remainder });
	}

	// Change the app choice and then redirect.
	switchApps() {
		appChoice.setApplication("/create");

		const redirect = {
			location: "/create",
			willRedirect: true,
		};

		console.debug("This is my object: ", redirect);
		console.debug("This is the state: ", this.state.redirect);

		// this.state.redirect.willRedirect = true;
		// this.state.redirect.location = "/create";

		this.setState({ redirect });
	}

	// todoList() {
	// 	return this.state.todos.map(function (currentTodo, i) {
	// 		return <Todo todo={currentTodo} key={i} />;
	// 	});
	// }

	render() {
		if (this.state.redirect.willRedirect) {
			return <Redirect to={this.state.redirect.location} />;
		}

		return (
			<div>
				<h1>Welcome to the Basic Todo List Application!</h1>
				<p>
					You can use this as an todo list! No need for internet :)
					<br />A more feature rich application will be coming soon!
					If you would like to swtich applications,
					<button onClick={this.switchApps}> click here!</button>
					<br />
					Feel free to add items. <br />
					Remove items by clicking on the item itself
				</p>

				<TodoForm addTodo={this.addTodo.bind(this)} />

				<ListItems
					todos={this.state.todos}
					removeItem={this.removeItem.bind(this)}
				/>

				{/* <CreateTodo /> */}
				{/* <table
					className="table table-striped"
					style={{ marginTop: 20 }}
				>
					<thead>
						<tr>
							<th>Description</th>
							<th>Responsible</th>
							<th>Priority</th>
							<th>Delete</th>
							<th>Action</th> This will eventually be an edit option maybe
						</tr>
					</thead>
					<tbody>{this.todoList()}</tbody>
				</table> */}
			</div>
		);
	}
}

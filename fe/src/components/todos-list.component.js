import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { todoItem } from "../models/todo-item";
import CreateTodo from "./create-todo.component";

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
					addTodo(input.value);
					input.value = "";
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

export default class TodosList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			todos: [
				// {
				// 	todo_description: "Hi",
				// 	todo_responsible: "",
				// 	todo_priority: "",
				// 	todo_completed: false,
				// },
			],
		};
	}

	// componentDidMount() {
	// 	axios
	// 		.get("http://localhost:4000/todos")
	// 		.then((response) => {
	// 			this.setState({ todos: response.data });
	// 			console.debug("RESULTS: ", this.state.todos);
	// 		})
	// 		.catch(function (error) {
	// 			console.log(error);
	// 		});
	// }

	addTodo(val) {
		console.debug("Adding Item");
		const newItem = new todoItem();

		newItem.todoId = new Date().getMilliseconds();
		newItem.todoDescription = val;
		newItem.todoPriority = "low";

		this.state.todos.push(newItem);

		this.setState({ todos: this.state.todos });
	}

	removeItem(id) {
		console.debug("Removing Item");
		const remainder = this.state.todos.filter((todo) => {
			if (todo.todoId !== id) {
				return todo;
			}
		});

		console.log("Remainder: ", remainder);

		this.setState({ todos: remainder });
	}

	// todoList() {
	// 	return this.state.todos.map(function (currentTodo, i) {
	// 		return <Todo todo={currentTodo} key={i} />;
	// 	});
	// }

	render() {
		return (
			<div>
				<p>In the Todo List Component</p>

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

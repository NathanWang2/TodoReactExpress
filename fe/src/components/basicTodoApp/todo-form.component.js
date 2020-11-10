import React, { Component } from "react";
import { Button, TextField } from '@material-ui/core';

export default class TodoForm extends Component {
    constructor(props) {
        super(props);
        // Prop function
        this.addTodo = props.addTodo;

        this.submit = this.submit.bind(this);
        this.onInputchange = this.onInputchange.bind(this);

        this.state = {
            newTask: ""
        }
    }

    onInputchange(event) {
        this.setState({
            newTask: event.target.value
        });
    }

    submit(event) {
        // This stops the refresh of the page
        event.preventDefault();
        const word = this.state.newTask;

        console.debug("event: ", event)
        if (word.trim() !== "") {
            this.addTodo(word);
            this.setState({
                newTask: ""
            })
        }
    }

    render() {
        return (
            <form className="todoForm" onSubmit={this.submit}>
                <TextField
                    id="newTask"
                    className="inputField"
                    label="Task"
                    placeholder="Enter a todo task"
                    variant="outlined"
                    value={this.state.newTask}
                    onChange={this.onInputchange}
                />

                <div className="submitTask" >
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Add Task
		        	</Button>
                </div>
            </form>
        )
    }
}
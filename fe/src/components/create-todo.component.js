import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {

    constructor(props) {
        super(props);

        this.onChangeDesc = this.onChangeDesc.bind(this);
        this.onChangeResponsible = this.onChangeResponsible.bind(this);
        this.onChangePriority = this.onChangePriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
    }

    onChangeDesc(desc) {
        this.setState({
            todo_description: desc.target.value
        });
    }

    onChangeResponsible(person) {
        this.setState({
            todo_responsible: person.target.value
        });
    }

    onChangePriority(prio) {
        this.setState({
            todo_priority: prio.target.value
        });
    }

    onSubmit(e) {
        // To prevent the default sumbit action for this method.
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);

        const newTodo = {
            todo_desc: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:4000/add', newTodo)
            .then(res => console.debug(res.data));

        // Reset the state
        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: ''
        })
    }

    render() {
        return (
            <div>
                <h3> Create New Todo</h3>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label> Descirption: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter a description of the task"
                            value={this.state.todo_description}
                            onChange={this.onChangeDesc}
                        />
                    </div>

                    <div className="form-group">
                        <label>Responsible: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter who is responsible"
                            value={this.state.todo_responsible}
                            onChange={this.onChangeResponsible}
                        />
                    </div>

                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityLow"
                                value="Low"
                                checked={this.state.todo_priority === "Low"}
                                onChange={this.onChangePriority} />
                            <label className="form-check-label">Low</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityMedium"
                                value="Medium"
                                checked={this.state.todo_priority === "Medium"}
                                onChange={this.onChangePriority}
                            />
                            <label className="form-check-label">Medium</label>
                        </div>

                        <div className="form-check form-check-inline">
                            <input className="form-check-input"
                                type="radio"
                                name="priorityOptions"
                                id="priorityHigh"
                                value="High"
                                checked={this.state.todo_priority === "High"}
                                onChange={this.onChangePriority}
                            />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}
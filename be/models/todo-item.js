class TodoItems {
    constructor(Data) {
        try {

            if (Data !== undefined) {
                console.debug("In the constructor with data")
                this.todo_description = Data.todo_description;
                this.todo_responsible = Data.todo_responsible;
                this.todo_priority = Data.todo_priority;
                this.todo_completed = Data.todo_completed;
            } else {
                console.debug("EMPTY DATA")
                this.todo_description = "";
                this.todo_responsible = "";
                this.todo_priority = "";
                this.todo_completed = false;
            }
        } catch (error) {
            console.debug(error)
        }
    }
}
module.exports = TodoItems;



// }
// class TodoItem {
//     constructor() {
//         this.todo_description = "";
//         this.todo_responsible = "";
//         this.todo_priority = "";
//         this.todo_completed = false;
//     }
// }
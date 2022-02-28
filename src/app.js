const app = Vue.createApp({
    data() {
        return {
            common: {
                mainTitle: "To Do List App",
            },
            task: {
                addTask: "Add Task",
                deleteTask: "Delete",
                taskDescriptionPlaceHolder: "Task Description",
                taskDescription: "",
                taskList: [],
            }
        }
    },
    computed: {
        completedTextDecoration() {
            return { 'textDecoration': true }
        }
    },
    methods: {
        onChangeTaskEvent: function (event) {
            this.task.taskDescription = event.target.value;
        },
        onAddTaskEvent() {
            if (this.task.taskDescription && this.task.taskDescription !== "") {
                this.task.taskList.push({ isDone: false, taskDescription: this.task.taskDescription });
                this.task.taskDescription = "";
            } else {
                alert("task description cannot be at the moment.");
            }
        },
        onDeleteTaskEvent(index) {
            if (this.task.taskList[index].isDone) {
                alert("You can not delete task has alredy completed.");
            } else {
                this.task.taskList.splice(index, 1);
            }
        },
        onChangeTaskCompleteSituation: function (index, isDone) {
            this.task.taskList[index].isDone = isDone;
        }
    }
});

app.mount("#app");
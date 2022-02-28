const app = Vue.createApp({
    data() {
        return {
            common: {
                mainTitle: "To Do List App",
                userSelectionTitle: "User List",
            },
            user: {
                userList: []
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
        isThereAnyUser() {
            return this.user.userList.length !== 0;
        },
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
    },
    created() {
        axios
            .get("https://raw.githubusercontent.com/teyfikavkan/vue3-cdn-todolist/main/mock/userList.json")
            .then(result => {
                const user = {
                    "userList": result.data.userList,
                };
                this.user = user;
            })
            .catch(error => {
                console.error(error)
            });
    }
});

app.mount("#app");
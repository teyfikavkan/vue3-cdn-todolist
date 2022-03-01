const app = Vue.createApp({
    data() {
        return {
            common: {
                mainTitle: "To Do List App",
            },
            user: {
                userList: [],
                selectedUserId: "",
                userListText: "User List",
                deselectSelectedUserText: "Deselect User"
            },
            task: {
                addTaskText: "Add Task",
                deleteTaskText: "Delete",
                completedTaskCountText: "Completed Task Count:",
                uncompletedTaskCountText: "Uncompleted Task Count:",
                taskDescriptionPlaceHolder: "Task Description",
                taskDescription: "",
                taskList: [],
            }
        }
    },
    computed: {
        completedTextDecoration() {
            return { 'textDecoration': true }
        },
        countCompletedTask() {
            if (this.task.taskList.length !== 0) {

                return this.task.taskList.filter(task => task.isDone).length;
            }

            return 0;
        },
        countUncompletedTask() {
            if (this.task.taskList.length !== 0) {

                return this.task.taskList.filter(task => !task.isDone).length;
            }

            return 0;
        },
        getSelectedUserName() {
            if (this.user.selectedUserId && this.user.selectedUserId !== "") {
                return this.user.userList.find(u => u.id === this.user.selectedUserId).userName;
            }

            return this.user.userListText
        }
    },
    methods: {
        isThereAnyUser() {
            return this.user.userList.length !== 0;
        },
        onDeselectSelectedUser(event) {
            event.stopPropagation();
            this.user.selectedUserId = "";
        },
        onClickUserListDropdown(item) {
            this.user.selectedUserId = item.id;
            console.log(item);
        },
        onChangeTaskEvent: function (event) {
            this.task.taskDescription = event.target.value;
        },
        onAddTaskEvent() {
            if (this.task.taskDescription && this.task.taskDescription !== "") {
                if (!this.user.selectedUserId || this.user.selectedUserId === "") {
                    alert("You must choose a user!");
                } else {

                    this.task.taskList.push({ isDone: false, taskDescription: this.task.taskDescription, userId: this.user.selectedUserId });
                    this.task.taskDescription = "";
                }
            } else {
                alert("Task description cannot be at the moment.");
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
    beforeCreate() {
        console.log("beforeCreate Çalıştı..");
    },
    created() {
        console.log("created Çalıştı..");
        axios
            .get("https://raw.githubusercontent.com/teyfikavkan/vue3-cdn-todolist/main/mock/userList.json")
            .then(result => {
                const user = {
                    "userList": result.data.userList,
                };
                this.user = { ...this.user, ...user };
            })
            .catch(error => {
                console.error(error)
            });
    },
    beforeMount() {
        console.log("beforeMount Çalıştı..");
    },
    mounted() {
        console.log("mounted Çalıştı..");
    },
    beforeUpdate() {
        console.log("beforeUpdate Çalıştı..");
    },
    updated() {
        console.log("updated Çalıştı..");
    },
    beforeUnmount() {
        console.log("beforeUnmount Çalıştı..");
    },
    unmounted() {
        console.log("unmounted Çalıştı..");
    },
});

app.mount("#app");

/* setTimeout(() => {
    app.unmount();
}, 5000); */
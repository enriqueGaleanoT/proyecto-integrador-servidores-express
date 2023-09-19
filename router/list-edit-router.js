const express = require("express");
const listEditRouter = express.Router();
const taskList = require("../data");
listEditRouter.use(express.json());
const middlewaresMethods = require("../middlewares/methodValidations");
listEditRouter.use(middlewaresMethods.validarMetodos);

listEditRouter.get("/task",  (req, res)=>{
    res.status(200).json(taskList.tasks);
});


listEditRouter.post("/add-task", middlewaresMethods.validateMethodPOST,(req, res)=>{
    const createTask = req.body;
    console.log(createTask);
    taskList.tasks.push(createTask);
    res.status(200).send({message: "Task added"});
});

listEditRouter.put("/update-task/:id", middlewaresMethods.validateMethodPUT, (req, res)=>{
    const taskId = req.params.id
    const taskFindId = taskList.tasks.findIndex((element) => element.id === taskId);
    console.log(taskFindId);

    if (taskFindId === -1) {
        return res.status(404).send({message: "Task not found"});
    }
    const newTask = req.body;
    taskList.tasks[taskFindId]= {...taskList.tasks[taskFindId], ...newTask};
    res.status(200).send({message: "Task Updated"});

});

listEditRouter.delete("/delete-task/:id", (req, res)=>{
    const taskIdDelete = req.params.id;
    const taskIdDeleteFind = taskList.tasks.findIndex((element) => element.id === taskIdDelete);
    console.log(taskIdDeleteFind);
    if (taskIdDeleteFind === -1) {
        console.log("entra aqui");
        return res.status(404).send({message: "Task not found, cannot eliminate"});
    }
    const taskDeleted = taskList.tasks.splice(taskIdDeleteFind, 1);
    console.log(taskDeleted[0]);
    res.status(200).send(taskDeleted[0]);

});


module.exports = listEditRouter;
const express = require("express");
const listEditRouter = express.Router();
const taskList = require("./data");

listEditRouter.use(express.json());

listEditRouter.get("/view-tasks", (req, res)=>{
    res.status(200).json(taskList.tasks);
});

listEditRouter.post("/add-task", (req, res)=>{
    const createTask = req.body;
    console.log(createTask);
    taskList.tasks.push(createTask);
    res.status(200).send({message: "Tarea creada exitosamente xD"});
});

listEditRouter.put("/task/:id", (req, res)=>{
    const taskId = req.params.id
    const taskFindId = taskList.tasks.findIndex((element) => element.id === taskId);
    console.log(taskFindId);

    if (taskFindId === -1) {
        return res.status(404).send({message: "Task no encontrada"});
    }
    const newTask = req.body;
    taskList.tasks[taskFindId]= {...taskList.tasks[taskFindId], ...newTask};
    res.status(200).send(taskList.tasks[taskFindId]);

});

listEditRouter.delete("/task/:id", (req, res)=>{
    const taskIdDelete = req.params.id;
    const taskIdDeleteFind = taskList.tasks.findIndex((element) => element.id === taskIdDelete);

    if (!taskIdDeleteFind === -1) {
        return res.status(404).send({message: "Tarea no encontrada, no se puede eliminar"});
    }
    const taskDeleted = taskList.tasks.splice(taskIdDeleteFind, 1);
    console.log(taskDeleted[0]);
    res.status(200).send(taskDeleted[0]);
});


module.exports = listEditRouter;
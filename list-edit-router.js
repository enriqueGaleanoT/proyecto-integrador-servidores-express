const express = require("express");
const listEditRouter = express.Router();
const taskList = require("./data");

listEditRouter.get("/view-tasks", (req, res)=>{
    res.status(200).json(taskList.tasks);
});

listEditRouter.post("/add-task", (req, res)=>{
    const createTask = req.body;
    console.log(createTask);
    taskList.tasks.push(createTask);
    res.status(200).json({message: "Tarea creada exitosamente xd"});
});


module.exports = listEditRouter;
const express = require("express");
const listViewRouter = express.Router();

const taskList = require("./data");

const validateTask = (req, res, next) =>{
    const validate = req.params.complete;
    if(validate === "completado"){
        return res.status(404).send({message: "Recurso no encontrado por favor intente con completed"});
    } else if (validate === "no-completado"){
        return res.status(404).send({message: "Recurso no encontrado por favor intente con not-completed"});
    }
    next();

}

listViewRouter.get("/tasks", (req, res)=>{
    res.status(200).send(taskList.tasks);

});

listViewRouter.get("/completeTask/:complete", validateTask,(req, res)=>{
    const typeTask = req.params.complete;
    const tasksView = taskList.tasks.filter(element => element.isCompleted === typeTask);

    if (typeTask === "completed") {
        res.status(200).send(tasksView);
    }else if(typeTask === "not-completed"){
        res.status(200).send(tasksView);
    }

});

module.exports = listViewRouter;

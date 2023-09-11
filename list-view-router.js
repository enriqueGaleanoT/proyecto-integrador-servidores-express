const express = require("express");
const listViewRouter = express.Router();

const taskList = {
    tasks: [
        {
            id:"1234561",
            isCompleted:"completed",
            description:"Walk the dog 1",
        },
        {
            id:"1234562",
            isCompleted:"not-completed",
            description:"Do homework",
        }
        ,
        {
            id:"1234563",
            isCompleted:"completed",
            description:"wash dishes",
        }
        ,
        {
            id:"123454",
            isCompleted:"not-completed",
            description:"Get Gas",
        }
        ,
        {
            id:"123455",
            isCompleted:"completed",
            description:"check task list",
        },
        {
            id:"123456",
            isCompleted:"not-completed",
            description:"Walk the dog",
        }
    ]
};

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

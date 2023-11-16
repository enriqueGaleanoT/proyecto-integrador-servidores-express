const express = require("express");
const listViewRouter = express.Router();
const taskList = require("../data.js");
listViewRouter.use(express.json());

const validateTask = (req, res, next) =>{
    const validate = req.params.complete;
    if(validate === "completado"){
        return res.status(404).send({message: "Id not founded, please try with the Id word completed"});
    } else if (validate === "no-completado"){
        return res.status(404).send({message: "Id not founded, please try with the Id word not-completed"});
    }
    next();

}

listViewRouter.get("/task", (req, res)=>{
    res.status(200).send(taskList.tasks);

});

listViewRouter.get("/task-id/:id", (req, res)=>{
    const oneTaskId = req.params.id;
    const oneTaskIdFind = taskList.tasks.find((element) => element.id === oneTaskId);
    
    if(oneTaskIdFind === -1){
        console.log("entra aqui?");
        return res.status(404).send({error: "Task not found"});
    }
    res.status(200).send(oneTaskIdFind);
});

listViewRouter.get("/task-completes/:complete", validateTask,(req, res)=>{
    const typeTask = req.params.complete;
    const tasksView = taskList.tasks.filter(element => element.isCompleted === typeTask);
    if (typeTask === "completed") {
        res.status(200).send(tasksView);
    }else if(typeTask === "not-completed"){
        res.status(200).send(tasksView);
    }
});

module.exports = listViewRouter;

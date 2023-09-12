const express = require("express");
const listEditRouter = express.Router();
const taskList = require("./data");

listEditRouter.use(express.json());

const validateMethodPOST = (req, res, next) =>{
    // const bodyPOST = req.body.value;
    if(req.method === "POST" && Object.keys(req.body).length === 0){
        console.log("entra aqui");
        return res.status(400).send({error: "El cuerpo no puede estar vacio"});
    }
    const {id, description, isCompleted} = req.body;
    console.log(id + " " + isCompleted +  " " +  description);
   
    if (!id || !description || !isCompleted) {
        return res.status(400).send({error: "You need the appropriate attributes"});
    }
    next();
};


listEditRouter.get("/task",  (req, res)=>{
    res.status(200).json(taskList.tasks);
    const tipo = req.method;
    console.log(tipo);
});

listEditRouter.post("/task", validateMethodPOST,(req, res)=>{
    const createTask = req.body;
    console.log(createTask);
    taskList.tasks.push(createTask);
    res.status(200).send({message: "Task added"});
});

listEditRouter.put("/task/:id", (req, res)=>{
    const taskId = req.params.id
    const taskFindId = taskList.tasks.findIndex((element) => element.id === taskId);
    console.log(taskFindId);

    if (taskFindId === -1) {
        return res.status(404).send({message: "Task not found"});
    }
    const newTask = req.body;
    taskList.tasks[taskFindId]= {...taskList.tasks[taskFindId], ...newTask};
    res.status(200).send(taskList.tasks[taskFindId]);

});

listEditRouter.delete("/task/:id", (req, res)=>{
    const taskIdDelete = req.params.id;
    const taskIdDeleteFind = taskList.tasks.findIndex((element) => element.id === taskIdDelete);

    if (!taskIdDeleteFind === -1) {
        return res.status(404).send({message: "Task not found, cannot eliminate"});
    }
    const taskDeleted = taskList.tasks.splice(taskIdDeleteFind, 1);
    console.log(taskDeleted[0]);
    res.status(200).send(taskDeleted[0]);
});


module.exports = listEditRouter;
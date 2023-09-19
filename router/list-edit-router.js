const express = require("express");
const listEditRouter = express.Router();
const taskList = require("../data");
listEditRouter.use(express.json());
const middlewaresMethods = require("../middlewares/methodValidations");

// const validateMethodPOST = (req, res, next) =>{
//     const dataPOST = req.body;
//     const {id, description, isCompleted} = req.body;
//     if(Object.keys(req.body).length === 0){
//         console.log("entra aqui");
//         return res.status(404).send({error: "Dont leave the body empty"});
//     } else if (!id || !description || !isCompleted) {
//         return res.status(404).send({error: "You need the appropriate JSON attributes"});
//     }

//     if ((dataPOST.id === " ") || (dataPOST.id === "")) {
//         return res.status(404).send({error: "Attribute Id is not filled"});
//     }else if (dataPOST.isCompleted === " " || dataPOST.isCompleted === ""){
//         return res.status(404).send({error: "Attribute isCompleted is not filled"});
//     }else if(dataPOST.description === " " || dataPOST.description === ""){
//         return res.status(404).send({error: "Attribute description is not filled"});
//     }
//     console.log(id + " " + isCompleted +  " " +  description);
//     next();
// };

// const validateMethodPUT = (req, res, next) =>{
//     const dataPUT = req.body;
//     const {id, description, isCompleted} = req.body;

//     if (!id || !description || !isCompleted) {
//         return res.status(404).send({error: "You need the appropriate JSON attributes"});
//     }

//     if (Object.keys(req.body).length === 0) {
//         return res.status(404).send({error: "Dont leave the body empty"})
//     }else if (dataPUT.id === " " || dataPUT.id === "") {
//         return res.status(404).send({error: "Attribute Id is not filled"});
//     }else if (dataPUT.isCompleted === " " || dataPUT.isCompleted === ""){
//         return res.status(404).send({error: "Attribute isCompleted is not filled"});
//     }else if(dataPUT.description === " " || dataPUT.description === ""){
//         return res.status(404).send({error: "Attribute description is not filled"});
//     }
//     next();
// };

// const validarMetodos = (req, res, next)=>{
//     const metodos = ['GET', 'POST', 'PUT', 'DELETE'];
//     if (!metodos.includes(req.method)) {
//         return res.status(404).send({message: "This Method is not allowed"});
//     }
//     next();
// }


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
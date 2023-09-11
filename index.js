const express = require("express");
const app = express();
const HOST = "http://localhost";
const PORT = 2000;

const taskList = [
    {
        "id":"123456",
        "isCompleted":false,
        "description":"Walk the dog",
    }
];


app.get("/", (req, res)=>{
    res.status(200).send(taskList);
});

app.listen(PORT, ()=>{
    console.log(`${HOST}:${PORT}`);
});
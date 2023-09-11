const express = require("express");
const app = express();
const HOST = "http://localhost";
const PORT = 2000;
const routerV1 = require("./list-view-router");

// const taskList = [
//     {
//         "id":"123456",
//         "isCompleted":false,
//         "description":"Walk the dog",
//     }
// ];


// app.get("/", (req, res)=>{
//     res.status(200).send(taskList);
// });

app.use(express.json());
app.use("/api/v1", routerV1);

app.listen(PORT, ()=>{
    console.log(`${HOST}:${PORT}`);
});
const express = require("express");
const app = express();
const HOST = "http://localhost";
const PORT = 2000;
const routerViewV1 = require("./list-view-router");
const routerEditV1 = require("./list-edit-router");

app.use(express.json());
app.use("/api/v1/view", routerViewV1); //Calls list-view-router js
app.use("/api/v1/edit", routerEditV1);//Calls list-edit-router js

app.listen(PORT, ()=>{
    console.log(`${HOST}:${PORT}`);
});
const express = require("express");
const app = express();
const HOST = "http://localhost";
const routerViewV1 = require("./router/list-view-router");
const routerEditV1 = require("./router/list-edit-router");
require("dotenv").config();
app.use(express.json());
app.use("/api/v1/view", routerViewV1); //Calls list-view-router js
app.use("/api/v1/edit", routerEditV1);//Calls list-edit-router js

app.listen(process.env.PORT, ()=>{
    console.log(`${HOST}:${process.env.PORT}`);
});
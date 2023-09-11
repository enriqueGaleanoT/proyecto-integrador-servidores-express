const express = require("express");
const app = express();
const HOST = "http://localhost";
const PORT = 2000;

app.listen(PORT, ()=>{
    console.log(`${HOST}:${PORT}`);
});
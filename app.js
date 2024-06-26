/*
    Elizabeth Pursell & Chris Buck
    emp520@lehigh.edu & cdb325@lehigh.edu
    CSE264 - 011
    Final Project
*/

const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(
    path.resolve(__dirname, "public")
));

app.listen(3000, () => console.log("Starting up Dinosaur Game"));
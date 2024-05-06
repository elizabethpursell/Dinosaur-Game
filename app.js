/*
    Elizabeth Pursell & Chris Buck
    emp520@lehigh.edu & cdb325@lehigh.edu
    CSE264 - 011
    Final Project
*/

const express = require("express");
const path = require("path");
const fsPromises = require('fs').promises;

const app = express();

app.use(express.static(
    path.resolve(__dirname, "public")
));

app.listen(3000, () => console.log("Starting up Bouncing Rectangles"));

var wordList = [];
fsPromises.readFile("./words.txt")
    .then(function (result) {
        wordList = ("" + result).split("\n");
    })
    .catch(function (error) {
        console.log(error);
    })

app.get("/word", (req, res) => {
    let retObj = {"word": wordList[Math.floor(Math.random() * wordList.length)]};
    const ret = JSON.stringify(retObj);
    res.end(ret);
});
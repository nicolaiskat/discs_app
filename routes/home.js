const express = require("express");
const fs = require('fs');
const urlPath = fs.realpathSync('public');

const router = express.Router();

router.get(["/", "/index"], (req, res) => {
    fs.readFile(urlPath + "/index.html", 'utf8', function(err, content){
        res.send(content);
    });
});


router.get("/list", (req, res) => {
    fs.readFile(urlPath + "/list.html", 'utf8', function(err, content){
        res.send(content);
    });
});


router.get("/search", (req, res) => {
    fs.readFile(urlPath + "/search.html", 'utf8', function(err, content){
        res.send(content);
    });
});


router.get("/taske", (req, res) => {
    fs.readFile(urlPath + "/taske.html", 'utf8', function(err, content){
        res.send(content);
    });
});


router.get("/visu", (req, res) => {
    fs.readFile(urlPath + "/visu.html", 'utf8', function(err, content){
        res.send(content);
    });
});


module.exports = router;
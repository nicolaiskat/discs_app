const express = require("express");
const fs = require('fs');

const router = express.Router();

router.get("/", (req, res) => {
    const indexPath = fs.realpathSync('index.html');
    fs.readFile(indexPath, 'utf8', function(err, content){
        res.send(content);
    });
});

module.exports = router;
const express = require("express");
var cors = require('cors');
const homeRoute = require('./routes/home');
const discsRoute = require('./routes/discs');

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));
app.use('/', homeRoute);
app.use('/api/discs', discsRoute);

app.listen(3000, () => console.log("Server ready"));
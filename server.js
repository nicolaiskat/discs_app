const express = require("express");
var cors = require('cors');
const homeRoute = require('./routes/home');
const discsRoute = require('./routes/discs');
const mydiscsRoute = require('./routes/mydiscs')

const app = express();
app.use(express.json());
app.use(cors({origin: '*'}));
app.use('/', homeRoute);
app.use('/api/discs', discsRoute);
app.use('/api/mydiscs', mydiscsRoute)

app.listen(3000, () => console.log("Server ready"));
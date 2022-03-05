const express = require("express");
const homeRoute = require('./routes/home');
const discsRoute = require('./routes/discs');

const app = express();
app.use(express.json());
app.use('/', homeRoute);
app.use('/discs', discsRoute);

app.listen(3000, () => console.log("Server ready"));
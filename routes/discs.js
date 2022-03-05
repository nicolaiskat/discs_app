const express = require("express");
const ObjectId = require('mongodb').ObjectId;
const mongo = require("mongodb").MongoClient;
require('dotenv/config');

let collection = "discs";
let database = "alldiscsdb";
let db, discs;

mongo.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err);
      return
    };
    db = client.db(database);
    discs = db.collection(collection);
  }
);
const router = express.Router();

//Get discs
router.get("/", (req, res) => {
  discs.find().toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return
    };
    res.status(200).json({ discs: items });
  });
});

//Get disc by id
router.get("/:id", (req, res) => {
  discs.find({ _id: new ObjectId(req.params.id) }).toArray((err, items) => {
    if (err) {
      console.error(err);
      res.status(500).json({ err: err });
      return
    };
    res.status(200).send(items[0]);
  });
});

//Post to discs
router.post("/", (req, res) => {
  const body = req.body
  discs.insertOne(
      { 
          Manufacturer: body.Manufacturer,
          ["Disc Name"]: body["Disc Name"],
          Type: body.Type,
          Speed: parseInt(body.Speed),
          Glide: parseInt(body.Glide),
          Turn: parseInt(body.Turn),
          Fade: parseInt(body.Fade),
          ["Production Date"]: body["Production Date"],
      }, 
      (err, result) => {
      if (err) {
          console.error(err);
          res.status(500).json({ err: err });
          return
      };
      console.log(result);
      res.status(200).json({ ok: true });
  });
});

//Delete disc by id
router.delete("/:id", (req, res) => {
  const result = discs.deleteOne({ _id: new ObjectId(req.params.id) });
  if (result) res.status(204).send("Succesfully deleted");
  else res.status(500).send("Disc not found");
});

module.exports = router;
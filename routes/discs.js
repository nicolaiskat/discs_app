const express = require("express");
const mongo = require("mongodb").MongoClient;
require('dotenv/config');

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
    db = client.db("alldiscsdb");
    discs = db.collection("discs");
  }
);
const router = express.Router();

router.post("/", (req, res) => {
    const body = req.body
    discs.insertOne(
        { 
            Manufacturer: body.Manufacturer,
            ["Disc Name"]: body["Disc Name"],
            Type: body.Type,
            Speed: body.Speed,
            Glide: body.Glide,
            Turn: body.Turn,
            Fade: body.Fade,
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

module.exports = router;
const { response } = require("express");
const express = require("express");
const ReservationEntry = require("../models/ReservationModel");
const router = express.Router();

//Post new entry
router.post("/", async (req, res, next) => {
  try {
    const reservationEntry = new ReservationEntry(req.body);
    const createdEntry = await reservationEntry.save();
    res.json(createdEntry);
    console.log(createdEntry);
  } catch (error) {
    console.log(error.name);
    if (error.name === "ValidationError") {
      res.status(422);
    }
    next(error);
  }
});

//Get all entries
router.get("/", async (req, res, next) => {
  try {
    const entries = await ReservationEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

//Get one entry by id
router.get("/:id", (req, res, next) => {
  ReservationEntry.findById(req.params.id)
    .then(console.log(req.params.id))
    .then((response) => res.json(response))
    .catch((error) => {
      next(error);
    });
});

//Update an entry
router.put("/:id", (req, res, next) => {
  ReservationEntry.findByIdAndUpdate(req.params.id, req.body, (error) => {
    if (error) {
      res.status(500);
      next(error);
    }

    console.log("Update complete!");
  }).then((response) => res.json(response));
});

//Remove one entry
router.post("/:id", (req, res, next) => {
  ReservationEntry.findByIdAndRemove(req.params.id, (error) => {
    if (error) {
      res.status(500);
      next(error);
    }
    console.log("Delete succesful");
    res.json({
      message: "Deleted",
    });
    return res.status(200);
  });
});

module.exports = router;

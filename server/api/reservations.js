const { response } = require("express");
const express = require("express");
const ReservationEntry = require("../models/ReservationModel");
const router = express.Router();
const fetch = require("node-fetch");

//Post new entry
router.post("/", async (req, res, next) => {
  try {
    let isReserved = false;
    const reservationEntry = new ReservationEntry(req.body);

    const getAllReservations = await fetch('http://localhost:4000/api/reservations');
    let ReservationsJson = await getAllReservations.json();
    ReservationsJson.map(existing => {
      if (existing.starting_date <= req.body.starting_date && existing.ending_date >= req.body.ending_date) {
        isReserved = true;
      } 
    })
    if (!isReserved) {
      const createdEntry = await reservationEntry.save();
      res.json(createdEntry);
      console.log(createdEntry);
    } else {
      return(
        res.json({
          message: 'There already is a reservation for this date'
        })
      )
    }    

    // fetch('http://localhost:4000/api/reservations')
    // .then(response => response.json())
    // .then(data => data.map(e => {
    //   if (e.starting_date === req.body.starting_date) {
    //     res.json({
    //       message: 'There already is a reservation for this date'
    //     })
    //   } else {
    //     const createdEntry = await reservationEntry.save();
    //     res.json(createdEntry);
    //     console.log(createdEntry);
    //   }
    // }))
    // .catch((error) => console.log(error));
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

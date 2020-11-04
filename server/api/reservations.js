const express = require("express");
const ReservationEntry = require("../models/ReservationModel");
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const entries = await ReservationEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
    try {
        const reservationEntry = new ReservationEntry(req.body);
        const createdEntry = await reservationEntry.save();
        res.json(createdEntry);
        console.log(createdEntry);
    } catch (error) {
        console.log(error.name);
        if (error.name === 'ValidationError') {
            res.status(422);
        }
        next(error);
    }
});

module.exports = router;

const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const reservationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    starting_date: {
        type: Date,
        required: true,
    },
    ending_date: {
        type: Date,
        required: true,
    },
    participants_amount: Number,
    comment: String,
});

const ReservationEntry = mongoose.model('Reservation', reservationSchema);

module.exports = ReservationEntry;
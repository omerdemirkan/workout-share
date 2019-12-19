const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30
    },
    sets: {
        type: Number,
        required: true,
        min: [1, 'Sets must be at least 1'],
        max: [10, 'Sets must be 10 or less']
    },
    reps: {
        type: Number,
        min: [1, 'Reps must be at least 1'],
        max: [30, 'Reps must be 30 or less']
    },
    minutes: {
        type: Number,
        min: [0, 'Minutes must be at least 0'],
        max: [120, 'Minutes can be 60 at most']
    },
    seconds: {
        type: Number,
        min: [0, 'Seconds must be at least 0'],
        max: [59, 'Seconds can be 59 at most']
    }
});

module.exports = exerciseSchema;
const mongoose = require('mongoose');

const exerciseSchema = require('./exercise.schema');

const workoutSchema = new mongoose.Schema({
    type: String,
    name: {
        type: String,
        required: true
    },
    dayOfWeek: String,
    exercises: [exerciseSchema]
}, {timestamps: true});

module.exports = workoutSchema;
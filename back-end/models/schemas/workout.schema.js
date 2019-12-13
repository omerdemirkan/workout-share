const mongoose = require('mongoose');

const exerciseSchema = require('./exercise.schema');

const workoutSchema = new mongoose.Schema({
    type: String,
    name: {
        type: String,
        required: true
    },
    exercises: [exerciseSchema],
    likes: Number
}, {timestamps: true});

module.exports = workoutSchema;
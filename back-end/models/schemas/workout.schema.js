const mongoose = require('mongoose');

const exerciseSchema = require('./exercise.schema');

const workoutSchema = new mongoose.Schema({
    type: String,
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 30
    },
    exercises: [exerciseSchema],
    likes: Number
}, {timestamps: true});

module.exports = workoutSchema;
const mongoose = require('mongoose');

const workoutSchema = require('./workout.schema');

const workoutRoutineSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true
    },
    workouts: workoutSchema
}, {timestamps: true});

module.exports = workoutRoutineSchema;
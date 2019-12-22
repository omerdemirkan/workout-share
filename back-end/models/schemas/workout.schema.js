const mongoose = require('mongoose');

const exerciseSchema = require('./exercise.schema');
const likeSchema = require('./like.schema');

const workoutSchema = new mongoose.Schema({
    type: String,
    title: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 30
    },
    exercises: [exerciseSchema],
    likes: [{
        type: String,
        default: []
    }]
}, {timestamps: true});

module.exports = workoutSchema;
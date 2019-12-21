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
    likes: [likeSchema]
}, {timestamps: true});

module.exports = workoutSchema;
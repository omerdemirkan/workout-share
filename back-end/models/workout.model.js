const mongoose = require('mongoose');

const workoutSchema = require('./schemas/workout.schema');

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
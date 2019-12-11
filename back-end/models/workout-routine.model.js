const mongoose = require('mongoose');

const workoutRoutineSchema = require('./schemas/workout-routine.schema');

const WorkoutRoutine = mongoose.model('WorkoutRoutine', workoutRoutineSchema);

module.exports = WorkoutRoutine;


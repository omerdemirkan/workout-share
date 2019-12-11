const router = require('express').Router();
const Workout = require('../models/workout.model');

router.get('/', (req, res) => {
    Workout.find({}, (err, workouts) => {
        if (!err) {
            res.json(workouts).status(200);
        } else {
            res.json('eRROR in workouts route \n' + err);
        }
    });
});

router.post('/', (req, res) => {
    const workout = req.body;
    const newWorkout = new Workout(workout);
    newWorkout.save(err => {
        if (!err) {
            res.json('Workout successfully saved').status(200);
        } else {
            console.log('eRROR in workouts route \n' + err);
            return handleError(err);
        }
    });
});

router.get('/:id', (req, res) => {
    const workoutId = req.params.id;
    Workout.findOne({_id: workoutId}, (err, workout) => {
        if(!err) {
            res.json(workout).status(200);
        } else {
            console.log(err);
            res.json('eRROR in workouts route: \n' + err).status(400);
        }
    });
});

router.delete('/:id', (req, res) => {
    const workoutId = req.params.id; 
    Workout.deleteOne({_id: workoutId}, err => {
        if (!err) {
            res.json('Workout successfully deleted').status(200);
        } else {
            res.json('eRROR in workouts route: \n' + err).status(400);
        }
    });
});



module.exports = router;
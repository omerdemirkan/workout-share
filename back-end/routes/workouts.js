const router = require('express').Router();
const Workout = require('../models/workout.model');
const User = require('../models/user.model');

// -- Load Routes --

router.get('/', (req, res) => {
    Workout.find({}, (err, workouts) => {
        if (!err) {
            res.json(workouts).status(200);
        } else {
            res.json('eRROR in workouts route \n' + err);
        }
    });
});

router.get('/powerlifting', (req, res) => {
    Workout.find({type: 'Powerlifting'}, (err, workouts) => {
        if (!err) {
            res.json(workouts).status(200);
        } else {
            res.json('eRROR in workouts route \n' + err);
        }
    });
});

router.get('/bodybuilding', (req, res) => {
    Workout.find({type: 'Bodybuilding'}, (err, workouts) => {
        if (!err) {
            res.json(workouts).status(200);
        } else {
            res.json('eRROR in workouts route \n' + err);
        }
    });
});

router.get('/weightlifting', (req, res) => {
    Workout.find({type: 'Weightlifting'}, (err, workouts) => {
        if (!err) {
            res.json(workouts).status(200);
        } else {
            res.json('eRROR in workouts route \n' + err);
        }
    });
});

router.get('/endurance', (req, res) => {
    Workout.find({type: 'Endurance'}, (err, workouts) => {
        if (!err) {
            res.json(workouts).status(200);
        } else {
            res.json('eRROR in workouts route \n' + err);
        }
    });
});

router.get('/crossfit', (req, res) => {
    Workout.find({type: 'Crossfit'}, (err, workouts) => {
        if (!err) {
            res.json(workouts).status(200);
        } else {
            res.json('eRROR in workouts route \n' + err);
        }
    });
});

// -- Search Route --

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

// -- Create Route --

const verify = (req, res, next) => {
    const authToken = req.headers['authorization'].split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

router.post('/', verify, (req, res) => {
    if (req.user) {
        const newWorkout = new Workout({
            title: req.body.title,
            type: req.body.type,
            exercises: req.body.exercises,
            likes: 0,
            posterID: req.user._id
        });
        newWorkout.save((err, workout) => {
            if (!err) {
                // res.json(workout.id).status(200);
                User.updateOne({_id: workout.posterID}, {$push: {posted: workout}}, err => {
                    res.json(err);
                })
            } else {
                console.log('eRROR in workouts route \n' + err);
                res.send(err);
            }
        });
    }
});

module.exports = router;
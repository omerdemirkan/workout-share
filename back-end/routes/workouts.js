const router = require('express').Router();
const Workout = require('../models/workout.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// -- Load Routes --

router.get('/', (req, res) => {
    Workout.find({}).sort({likes: -1}).exec((err, workouts) => {
        if (!err) {
            res.json(workouts).status(200);
        } else {
            res.json('eRROR in workouts route \n' + err);
        }
    });
});

router.get('/powerlifting', (req, res) => {
    Workout.find({type: 'Powerlifting'}).sort({likes: -1}).exec( (err, workouts) => {
        if (!err) {
            res.json(workouts).status(200);
        } else {
            res.json('eRROR in workouts route \n' + err);
        }
    });
});

router.get('/bodybuilding', (req, res) => {
    Workout.find({type: 'Bodybuilding'}).sort({likes: -1}).exec( (err, workouts) => {
        if (!err) {
            res.json(workouts).status(200);
        } else {
            res.json('eRROR in workouts route \n' + err);
        }
    });
});

router.get('/weightlifting', (req, res) => {
    Workout.find({type: 'Weightlifting'}).sort({likes: -1}).exec( (err, workouts) => {
        if (!err) {
            res.json(workouts).status(200);
        } else {
            res.json('eRROR in workouts route \n' + err);
        }
    });
});

router.get('/endurance', (req, res) => {
    Workout.find({type: 'Endurance'}).sort({likes: -1}).exec( (err, workouts) => {
        if (!err) {
            res.json(workouts).status(200);
        } else {
            res.json('eRROR in workouts route \n' + err);
        }
    });
});

router.get('/crossfit', (req, res) => {
    Workout.find({type: 'Crossfit'}).sort({likes: -1}).exec( (err, workouts) => {
        if (!err) {
            res.json(workouts).status(200);
        } else {
            res.json('eRROR in workouts route \n' + err);
        }
    });
});

// -- Create Route --

const verify = (req, res, next) => {
    const authToken = req.headers["authorization"].split(' ')[1]
    if (authToken == null) return res.json('authToken is null').sendStatus(401);

    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

router.get('/my-favorites', verify, (req, res) => {
    User.findOne({_id: req.user._id}, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.json(user.liked);
        }
    });
});

router.get('/my-workouts', verify, (req, res) => {
    User.findOne({_id: req.user._id}, (err, user) => {
        if (!err) {
            res.json(user.posted);
        } else {
            res.json('error: cannot load liked posts');
        }
    }).sort({date:-1});
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

router.post('/', verify, (req, res) => {
    const newWorkout = new Workout({
        title: req.body.title,
        type: req.body.type,
        exercises: req.body.exercises,
        likes: 0,
        posterID: req.user._id
    });
    newWorkout.save((err, workout) => {
        if (!err) {
            User.updateOne({_id: req.user._id}, {$push: {posted: workout}}, err => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(workout._id).status(200);
                }
            })
        } else {
            console.log('eRROR in workouts route \n' + err);
            res.json(err);
        }
    });
});

module.exports = router;
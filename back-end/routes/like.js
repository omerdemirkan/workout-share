const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Workout = require('../models/workout.model');
const User = require('../models/user.model');

// Checks that the user has a valid authToken

const verify = (req, res, next) => {
    const authToken = req.headers['authorization'].split(' ')[1]
    if (authToken == null) return res.sendStatus(401);
    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

// Increments likes conditionally: if the user is already found 
// in likes (which only stores user id's) nothing is changed.

router.post('/inc/:workoutID', verify, (req, res) => {

    Workout.findById(req.params.workoutID, (error, workout) => {
        if (error) return res.json(error)
        
        if (!workout.likes.includes(req.user._id)) {

            workout.likes.push(req.user._id)
        
            workout.save((saveError, newWorkout) => {
                if (saveError) return res.json(saveError)

                User.updateOne({_id: req.user._id}, {$push: {liked: newWorkout._id}}, err => {
                    if (err) return res.json(err)

                    res.json({
                        likes: newWorkout.likes.length,
                        liked: true
                    });
                }); 
            });
        } else {

            res.json({
                likes: workout.likes.length,
                liked: true
            });
        }
    });
});

// Decrements likes conditionally: if the user id is not found 
// in likes (which only stores user id's) nothing is changed.

router.post('/dec/:workoutID', verify, async (req, res) => {
    Workout.findById(req.params.workoutID, (error, workout) => {
        if (error) return res.json(error)
        
        if (workout.likes.includes(req.user._id)) {
            workout.likes = workout.likes.filter(like => {
                return like !== req.user._id 
            });
            workout.save((saveError, newWorkout) => {
                if (saveError) return res.json(saveError)

                User.updateOne({_id: req.user._id}, {$pull: {liked: newWorkout._id}}, err => {
                    if (err) return res.json(err)

                    res.json({
                        likes: newWorkout.likes.length,
                        liked: false
                    });
                });
            })
        } else {
            res.json({
                likes: workout.likes.length,
                liked: false
            });
        }
    });
});

module.exports = router;
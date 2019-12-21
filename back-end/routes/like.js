const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Workout = require('../models/workout.model');
const User = require('../models/user.model');

const verify = (req, res, next) => {
    const authToken = req.headers['authorization'].split(' ')[1]
    if (authToken == null) return res.sendStatus(401);
    console.log(authToken);
    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

router.post('/inc/:workoutID', verify, async (req, res) => {
    Workout.findByIdAndUpdate(req.params.workoutID, {$push: {likes: req.user._id}}, (error, workout) => {
        if (error) return res.json(error)
        User.updateOne(req.user._id, {$push: {liked: workout}}, {new: true}, err => {
            if (err) return res.json(err)
            res.json(workout.likes)
        })
    })
});

router.post('/dec/:workoutID', verify, async (req, res) => {
    Workout.findByIdAndUpdate(req.params.workoutID, {$pull: {likes: req.user._id}}, (error, workout) => {
        if (error) return res.json(error)
        User.updateOne(req.user._id, {$pull: {liked: workout}}, {new: true}, err => {
            if (err) return res.json(err)
            res.json(workout.likes)
        })
    })
});

module.exports = router;
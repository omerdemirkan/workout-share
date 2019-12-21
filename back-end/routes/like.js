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
    if (req.user) {
        const likedWorkout = await Workout.findOneAndUpdate({_id: req.params.workoutID}, {$inc: { likes: 1 }}, {new: true});
        User.findByIdAndUpdate(req.user._id, {$push: {liked: likedWorkout}}, {new: true}, (err, user) => {
            if (err) return res.json(err)
            res.json(likedWorkout)
        })
    } else {
        res.json('eRROR in post route');
    }
});

router.post('/dec/:workoutID', verify, async (req, res) => {
    if (req.user) {
        let likedWorkout = await Workout.findOneAndUpdate({_id: req.params.workoutID}, {$inc: { likes: -1 }}, {new: true});
        User.findByIdAndUpdate(req.user._id, {$pull: {liked: {_id: likedWorkout._id}}}, {new: true}, (err, user) => {
            if (err) return res.json(err)
            res.json(likedWorkout)
        })
    } else {
        res.json('eRROR in post route');
    }
});

module.exports = router;
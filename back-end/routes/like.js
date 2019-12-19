const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Workout = require('../models/workout.model');
const User = require('../models/user.model');

const verify = (req, res, next) => {
    const authToken = req.headers['authorization'].split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

router.post('/inc/:workoutID', verify, async (req, res) => {
    if (req.user) {
        const likedWorkout = await Workout.findOneAndUpdate({_id: req.params.id}, {$inc: { likes: 1 }}, {new: true});
        User.findOneAndUpdate({_id: req.user.id}, {$push: {workoutID: likedWorkout._id}});
        res.json('like successful').sendStatus(200);
    } else {
        res.json('eRROR in post route');
    }
});

router.post('/dec/:workoutID', verify, async (req, res) => {
    if (req.user) {
        let likedWorkout = await Workout.findOneAndUpdate({_id: req.params.id}, {$inc: { likes: -1 }}, {new: true});
        User.findOneAndUpdate({_id: req.user.id}, {$pull: {workoutID: likedWorkout._id}});
        res.json('unlike successful').sendStatus(200);
    } else {
        res.json('eRROR in post route');
    }
});

module.exports = router;
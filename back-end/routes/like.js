const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Workout = require('../models/workout.model');
const User = require('../models/user.model');

const verify = (req, res, next) => {
    const authToken = req.headers['authorization'].split(' ')[1]
    if (authToken == null) return res.sendStatus(401);
    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

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

    // Workout.findByIdAndUpdate(req.params.workoutID, {$pull: {likes: req.user._id}}, (error, workout) => {
    //     if (error) return res.json(error)
    //     User.updateOne(req.user._id, {$pull: {liked: workout}}, {new: true}, err => {
    //         if (err) return res.json(err)
    //         res.json(workout.likes)
    //     })
    // })
});

module.exports = router;
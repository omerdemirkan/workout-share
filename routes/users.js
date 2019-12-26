const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Creates a User object and a token with a corresponding id number
// to allow for protected routes with the 'verify' middleware

router.get('/create', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const newUser = new User({
        ip: ip,
        epoch: Date.now(),
        liked: [],
        posted: []
    }); 
    newUser.save((err, user) => {
        if (err) return res.json(err);  
        const accessToken = jwt.sign({_id: user._id, ip: user.ip, epoch: user.epoch}, process.env.ACCESS_TOKEN_SECRET);
        res.json({accessToken: accessToken});
    }); 
});

// Checks that the user has a valid authToken

const verify = (req, res, next) => {
    const authToken = req.headers["authorization"].split(' ')[1]
    if (authToken == null) return res.sendStatus(401);

    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Returns the list of workout id's that were liked by the user
// this is mainly to set whether or not the user liked a particular 
// workout beforehand on load. Also used for searching workouts by id
// for the /my-favorites page.

router.get('/likedID', verify, (req, res) => {
    User.findById(req.user._id, (err, foundUser) => {
        if (err) return res.json(err)
        if (!foundUser) return res.json('User not found')

        res.json(foundUser.liked);
    });
});

// Returns the list of id's of workouts the user has liked. Used for 
// searching workouts by id to load the /my-workouts page.

router.get('/postedID', verify, (req, res) => {
    User.findById(req.user._id, (err, foundUser) => {
        if (err) return res.json(err)
        if (!foundUser) return res.json('User not found')

        res.json(foundUser.posted);
    });
});

module.exports = router;
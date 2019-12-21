const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

router.get('/create', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const newUser = new User({
        ip: ip,
        epoch: Date.now(),
        liked: [],
        posted: []
    }); 
    newUser.save((err, user) => {
        if (err) {
            res.json(err);
        } else {
            const accessToken = jwt.sign({_id: user._id, ip: user.ip, epoch: user.epoch}, process.env.ACCESS_TOKEN_SECRET);
            res.json({accessToken: accessToken}); 
        }
    }); 
});

const verify = (req, res, next) => {
    const authToken = req.headers["authorization"].split(' ')[1]
    if (authToken == null) return res.sendStatus(401);

    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

router.get('/liked', verify, (req, res) => {
    User.findOne({_id: req.user._id}, (err, user) => {
        if (err) {
            res.json(err);
        } else {
            res.json(user.liked);
        }
    });
});

router.get('/posted', verify, (req, res) => {
    User.findOne({_id: req.user._id}, (err, user) => {
        if (!err) {
            res.json(user.posted);
        } else {
            res.json('error: cannot load liked posts');
        }
    });
});

router.get('/likedID', verify, (req, res) => {
    User.findOne({_id: req.user._id}, (err, user) => {
        if (!err) {
            let likedID = [];
            user.liked.forEach(like => {
                likedID.push(like._id);
            })
            res.json(likedID);

        } else {
            res.json('error: cannot load liked posts');
        }
    });
});

router.get('/postedID', verify, (req, res) => {
    User.findOne({_id: req.user._id}, (err, user) => {
        if (!err) { 
            let postedID = [];
            user.posted.forEach(post => {
                postedID.push(post._id);
            })
            res.json(postedID);
        } else {
            res.json('error: cannot load posted posts');
        } 
    }); 
});

module.exports = router;
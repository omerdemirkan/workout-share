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
        if (err) return res.json(err);  
        const accessToken = jwt.sign({_id: user._id, ip: user.ip, epoch: user.epoch}, process.env.ACCESS_TOKEN_SECRET);
        res.json({accessToken: accessToken});
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

router.get('/likedID', verify, (req, res) => {
    User.findById(req.user._id, 'liked', (err, user) => {
        if (err) return res.json(err)

        res.json(user.liked);
    });
});

router.get('/postedID', verify, (req, res) => {
    User.findById(req.user._id, 'posted', (err, user) => {
        if (err) return res.json(err)
        
        res.json(user.posted);
    });
});

module.exports = router;
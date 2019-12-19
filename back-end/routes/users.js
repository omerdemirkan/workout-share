const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

router.get('/create', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const newUser = new User({
        ip: ip,
        epoch: Date.now()
    });
    let accessToken = null;
    newUser.save((err, user) => {
        if (err) {
            res.json(err)
        } else {
            accessToken = jwt.sign({_id: user._id, ip: user.ip, epoch: user.epoch}, process.env.ACCESS_TOKEN_SECRET);
            res.json({accessToken: accessToken}); 
        }
    });
});

const authToken = (req, res, next) => {
    const authToken = req.headers['authorization'].split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

module.exports = router;
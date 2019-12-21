const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    epoch: {
        type: String,
        required: true
    },
    liked: {
        type: Array,
        unique: true
    },
    posted: {
        type: Array,
        unique: true
    }
});

module.exports = userSchema;
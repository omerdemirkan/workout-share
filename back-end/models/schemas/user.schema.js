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
    liked: Array,
    posted: Array
});

module.exports = userSchema;
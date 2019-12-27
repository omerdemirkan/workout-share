const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    epoch: {
        type: String,
        required: true
    },
    liked: {
        type: Array,
        default: []
    },
    posted: {
        type: Array,
        default: []
    }
});

module.exports = userSchema;
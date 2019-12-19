const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    epoch: {
        type: String,
        required: true
    }
});

module.exports = userSchema;
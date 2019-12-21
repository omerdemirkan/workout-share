const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

const likeSchema = new mongoose.Schema({
    like: {
        type: String,
        unique: true
    }
});

module.exports = likeSchema;

const mongoose = require('mongoose');

const userSchema = require('./schemas/user.schema');

const User = mongoose.model('User', userSchema);

module.exports = User;
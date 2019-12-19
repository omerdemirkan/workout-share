const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// mongoose.connect(process.env.ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true})
// .then(() => console.log('Connected to atlas'))
// .catch(() => console.log('eRROR in mongoDB connection'));

mongoose.connect(process.env.LOCAL_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected to mongo shell'))
.catch(() => console.log('eRROR in mongoDB connection'));

const workoutsRouter = require('./routes/workouts');  
const usersRouter = require('./routes/users');
const likeRouter = require('./routes/like');

app.use('/api/workouts', workoutsRouter);
app.use('/api/users', usersRouter);
app.use('/api/like', likeRouter);
 
app.listen(process.env.PORT || 5000, () => {
    console.log(`Yoo we live on port ${process.env.PORT || 5000}`);
});
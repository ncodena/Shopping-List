const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const items = require('./routes/api/items');

const path = require('path');


const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(cors());

// DB

const db = require ('./config/keys').mongoURI;

//Connect to Mongo 
mongoose.connect(db, {
    userNewUrlParser: true,
    useCreateIndex: true, 
    dbName: "mernshoppinglist" })
    .then(() => console.log('Mongo DB Connected...'))
    .catch(err => console.log(err))

//Use routes

app.use('/api/items', items);

// Serve static assets if in production

if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html' ));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


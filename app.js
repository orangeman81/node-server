const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const todoRoutes = require('./routes/todo');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(bodyParser.json());

//CORS fix middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/todo', todoRoutes);

mongoose.connect('mongodb://admin:admin1@ds147926.mlab.com:47926/mock-db', { useNewUrlParser: true })
    .then(() => {
        app.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    })
    .catch(err => console.log(err));


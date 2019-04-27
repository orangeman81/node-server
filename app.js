const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const todoRoutes = require('./routes/todo');

const hostname = 'localhost';
const port = 3000;

const app = express();

app.use(bodyParser.json());

//CORS fix
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/todo', todoRoutes);

mongoose.connect('mongodb://admin:admin1@ds161471.mlab.com:61471/feathers-todos', { useNewUrlParser: true })
    .then(() => {
        app.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    })
    .catch(err => console.log(err));


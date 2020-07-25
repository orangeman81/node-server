const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const Routes = require('./routes/index');

const hostname = 'localhost';
const port = 3030;
const MONGODB_URI = 'mongodb://admin:admin1@ds147926.mlab.com:47926/mock-db';

const app = express();

var store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'Mi8LrYrTn94OFPUYc2aKDlnZFwHKpD_nFoFKxl1s0SplEpWseOBWRnI4ns1DFSr2uU5qpC3D8dWRCLzXnNyPDZRzd1gC7UdBErff3uvBgjOHgE7am_L1uMqg_2pfwmp0QPTDNEU1p26BsT7eAF48xndDB1z6SXbpmfUqZwWDBihVjbdWrhNSYclMivgQX8UK9pWEZHTysb9-KLoil6r6uHKJgS4I8bYzZfgAMiy4L7TwNCU8FfE96SoMj9Vd3WQjvLaDOqo3ZgkzuV5kV8jQiCdcXM9ehuya6pyaLY8nTQaPn2uGKs8XDVzpnqT4cYjoHWdbwvZfLx8qkAwu7Da_QQ',
    store: store,
    resave: false,
    saveUninitialized: false
}));
mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true });
require('./config/passport');
//Middlewares
app.use(cors());
//routes
app.use('/', Routes);

const server = app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

const io = require('./socket').init(server);
io.on('connection', socket => {
    console.log('Client connected');
});


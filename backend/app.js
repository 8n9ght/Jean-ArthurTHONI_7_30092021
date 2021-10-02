const express = require('express');
const path = require('path');
const helmet = require('helmet');
const PORT = process.env.PORT || 8080;
require('dotenv').config();

const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
/* const postRoute = require('./routes/post'); */

const app = express();

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());
/* app.use(express.static(publicDirectory)); */
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/admin', adminRoute);
app.use('/user', userRoute);
/* app.use('/api/posts', postRoute); */

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
});

module.exports = app;
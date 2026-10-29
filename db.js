
const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/hotel';

mongoose.connect(url)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.log('Database connection error:', err);
    });

const db = mongoose.connection;

db.on('disconnected', () => {
    console.log('Database disconnected');
});

module.exports = db;
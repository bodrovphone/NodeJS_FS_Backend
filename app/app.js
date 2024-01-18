const express = require('express');
const cors = require('cors');
const app = express();

// use middleware to parse incoming requests with JSON payloads
app.use(express.json());

// use middleware for url encoding
app.use(express.urlencoded({ extended: true }));

// use middleware to handle cors policy
app.use(cors());

app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Service is up!'
    });
})

// routes


// bad url or error handling
// with middleware

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    // forward the error request
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message,
        status: error.status || 500
    });
}); 

module.exports = app;

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /users',
        method: {
            hostname: req.hostname,
            method: req.method,
        }
    });
});

router.get("/:id", (req, res, next) => {
    res.status(200).json({
        message: `Handling GET requests to ${req.params.id}`,
        methadata: {
            id: req.params.id,
            hostname: req.hostname,
            method: req.method,

        }
    });
});

router.post("/:id", (req, res, next) => {
    const name = req.body.name;
    res.status(201).json({
        message: `Handling POST requests to ${req.params.id} with the name ${name}`,
        methadata: {
            id: req.params.id,
            name: name,
            hostname: req.hostname,
            method: req.method,

        }
    });
});

router.put("/:id", (req, res, next) => {
    res.status(201).json({
        message: `Handling PUT requests to ${req.params.id}`,
        methadata: {
            id: req.params.id,
            hostname: req.hostname,
            method: req.method,

        }
    });
});

router.delete("/:id", (req, res, next) => {
    res.status(201).json({
        message: `Handling DELETE requests to ${req.params.id}`,
        methadata: {
            id: req.params.id,
            hostname: req.hostname,
            method: req.method,

        }
    });
});

module.exports = router;
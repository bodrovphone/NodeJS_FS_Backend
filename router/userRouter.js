const express = require('express');
const { findUser, saveUser } = require('../db/db');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/userModel');

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const user = await findUser({ email: req.body.email });

    if (user) {
      return res.status(409).json({
        message: 'User exists try logging in',
      });
    } else {
      // map req.body.password to our user model
      const user = User();
      user._id = new mongoose.Types.ObjectId();

      const newUser = Object.assign(user, req.body);

      bcrypt.hash(newUser.password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: 'Error hashing password',
            error: err,
          });
        }
        newUser.password = hash;

        const dbUser = await saveUser(newUser);
        res.status(201).json({
          message: 'User created successfully',
          user: dbUser,
        });
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Error creating user',
      error,
    });
  }
});

router.post('/login', (req, res, next) => {});

module.exports = router;

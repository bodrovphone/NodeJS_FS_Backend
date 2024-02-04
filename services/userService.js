const { findUser, saveUser } = require('../db/db');
const bcrypt = require('bcrypt');
const { errorTemplate } = require('../templates/errorTemplate');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userModel');

require('dotenv').config();

exports.loginUser = async (req, res, next) => {
  try {
    const user = await findUser({ email: req.body.email });

    if (!user) {
      throw new Error('User does not exist - Authentication failed');
    }

    const isAuthenticationSuccess = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isAuthenticationSuccess) {
      throw new Error('Authentication failed - password does not match');
    }

    user.password = undefined;

    const token = jwt.sign({ user: user }, process.env.JWT_KEY);

    return res.status(200).json({
      message: 'Authentication successful',
      token: token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    return errorTemplate(res, error, 'Could not login user');
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    const user = await findUser({ email: req.body.email });

    if (user) {
      throw new Error('User already exists. Try logging in');
    } else {
      // map req.body.password to our user model
      const user = User();
      user._id = new mongoose.Types.ObjectId();

      const newUser = Object.assign(user, req.body);

      console.log('this is newUser', req.body);

      bcrypt.hash(newUser.password, 10, async (err, hash) => {
        if (err) {
          throw new Error('Could not hash password');
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
    return errorTemplate(res, error, 'Could not create user');
  }
};

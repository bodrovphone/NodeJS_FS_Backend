require('dotenv').config();
require('mongoose');
const User = require('../models/userModel');

const { default: mongoose } = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log('error connecting to db', error.message);
  }
  console.log('connected to db');
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.log('error disconnecting from db', error.message);
  }
  console.log('disconnected from db');
};

const findUser = async (queryObj) => {
  return User.findOne(queryObj).exec();
};

const saveUser = async (newUser) => {
  return await newUser.save();
};

module.exports = { connect, disconnect, findUser, saveUser };

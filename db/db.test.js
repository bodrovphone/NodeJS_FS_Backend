const { connect, disconnect, saveUser, findUser } = require('./db');
const User = require('../models/userModel');
const mongoose = require('mongoose');

beforeAll(async () => {
  return await connect();
});

jest.mock('./db');

describe('User Test Suite', () => {
  test('as a user I want to save a user to the db', async () => {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: 'John',
      lastName: 'Doe',
      city: 'New York',
      address: '123 Main St',
      state: 'NY',
      zipCode: '12345',
      email: 'email@.com',
      password: 'password',
    });

    const user = await saveUser(newUser);

    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.city).toBe('New York');
    expect(user.address).toBe('123 Main St');
    expect(user.state).toBe('NY');
    expect(user.zipCode).toBe('12345');
    expect(user.email).toBe('email@.com');
    expect(user.password).toBe('password');
  });

  test('as a user I want to find a user in the db', async () => {
    const user = await findUser({ firstName: 'John' });

    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.city).toBe('New York');
    expect(user.address).toBe('123 Main St');
    expect(user.state).toBe('NY');
    expect(user.zipCode).toBe('12345');
    expect(user.email).toBe('email@.com');
    expect(user.password).toBe('password');
  });
});

afterAll(async () => {
  return await disconnect();
});

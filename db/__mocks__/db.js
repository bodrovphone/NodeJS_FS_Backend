const connect = async () => {
  console.log('mongoDB mocked connection');
};

const disconnect = async () => {
  console.log('mongoDB mocked disconnection');
};

const findUser = async (queryObj) => {
  return Promise.resolve({
    _id: '1231231231432423423',
    firstName: 'John',
    lastName: 'Doe',
    city: 'New York',
    address: '123 Main St',
    state: 'NY',
    zipCode: '12345',
    email: 'email@.com',
    password: 'password',
  });
};

const saveUser = async (newUser) => {
  return Promise.resolve({
    _id: '1231231231432423423',
    firstName: 'John',
    lastName: 'Doe',
    city: 'New York',
    address: '123 Main St',
    state: 'NY',
    zipCode: '12345',
    email: 'email@.com',
    password: 'password',
  });
};

module.exports = { connect, disconnect, findUser, saveUser };

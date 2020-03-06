/* #region  imports */

const request = require('supertest');

const app = require('../src/app');;

const User = require('../src/models/user');;

const {
    userOneId,
    userOne,
    setupDatabase
} = require('./fixtures/db');

/* #endregion */

beforeEach(setupDatabase);

/* #region  Create user */

test('Should signup a new user', async () => {
    const response = await request(app).post('/auth').send({
        username: 'Test name',
        password: 'zaporka'

    }).expect(201);

    //Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    //Assert that user was saved correctlly
    expect(response.body).toMatchObject({
        user: {
            username: 'Test name',
        },
        token: user.tokens[0].token
    })

    //Assert that password was not saved in plane text
    expect(user.password).not.toBe('zaporka');
});

test('Should not signup user with invalid name,email', async () => {
    const response = await request(app).post('/auth')
    .send({
        username:'',
        password: 'password'
    }).expect(500);
});

/* #endregion */

/* #region  Login */

test('Should login existing user', async () => {
    const response = await request(app).post('/auth/login').send({
        username: userOne.username,
        password: userOne.password
    }).expect(200);

    //Assert that token was saved correctlly
    const user = await User.findById(userOneId);
    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexistent user', async () => {
    const response = await request(app).post('/auth/login').send({
        username: userOne.username,
        password: 'thisisnotmypassword'
    }).expect(500);
});

/* #endregion */
/* #region  Imports */

const express = require('express');

const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const accountController = require('./controllers/accountController');
const categoryController = require('./controllers/categoryController');
const invoiceController = require('./controllers/invoiceController');

const auth = require('./middlewares/auth');

/* #endregion */


const app = express();

app.use(express.json());

app.use('/auth', authController);
app.use(auth);
app.use('/user', userController);
app.use('/acc', accountController);
app.use('/cat', categoryController);
app.use('/inv', invoiceController);
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send({
        error:{
            message: error.message
        }
    });
});

module.exports = app;
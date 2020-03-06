/* #region  imports */

const express = require('express');
const router = new express.Router();


const UserService = require('../services/userService');
const auth = require('../middlewares/auth');;
/* #endregion */

/* #region  init Service */
const userService = new UserService();
/* #endregion */

/* #region  CREATE */
// Create an new user.
// "POST: /auth"
router.post('/', async (req, res, next) => {
    try {
        
        const newUser = await userService.createUser(req.body);
               
        res.status(201).send(newUser);
        
    } catch (err) {
        err.status = 500;
        next(err);
    }
});

/* #endregion */

/* #region  LOGIN */
// Login user
//"post: /auth/login"
router.post('/login', async (req, res, next) => {
    try {
        
        const authenticatedUser = await userService.loginUser(req.body);
        
        res.send(authenticatedUser);
    } catch (err) {
        err.status = 500;
        next(err);
    }
    
});

/* #endregion */

/* #region  LOGOUT */
// Logout user
//"post: /auth/logout"
router.post('/logout', auth, async (req, res, next) => {
    try {
        const user = await userService.logoutUser(req.user, req.token );
        res.send(user);
    } catch (err) {
        err.status = 500;
        next(err);
    }
});

/* #endregion */

/* #region  LOGOUT ALL */
// Logout user from all devices
//"post: /auth/logoutall"
router.post('/logoutall', auth, async (req, res, next) => {
    try {
        const user = await userService.logoutFromAll(req.user);
        res.send(user);
    } catch (err) {
        err.status = 500;
        next(err);
    }
});

/* #endregion */



module.exports = router;
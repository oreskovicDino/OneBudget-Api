/* #region  imports */

const express = require('express');
const router = new express.Router();

// require('../db/mongoose');

const UserService = require('../services/userService');
/* #endregion */

/* #region  init Service */
const userService = new UserService();
/* #endregion */


// Read user profile.
//"GET: /user/acc"
router.get('/acc', async (req, res) => {
    try {
        res.send(req.user);
    } catch (err) {
        err.status = 500;
        next(err);
    }
});

/* #endregion */

/* #region  UPDATE */

// Update the user.
//"PATCH: /user/"
router.patch('/', async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req.user, req.body);
        res.send(updatedUser);
    } catch (err) {
        err.status = 500;
        next(err);
    }
});

/* #endregion */

/* #region  DELETE */
// Delete the user
//"DELETE: /user/"
router.delete('/', async (req, res) => {
    try {
        const removedUser = await userService.deleteUser(req.user);
        res.send(removedUser);
    } catch (err) {
        err.status = 500;
        next(err);
    }
    });

/* #endregion */


module.exports = router;
/* #region  Imports */

const jwt = require('jsonwebtoken');;

const UserService = require('../services/userService');;

/* #endregion */

const auth = async (req, res, next) => {
    const userService = new UserService();

    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'SuperSecretKey');

        const user = await userService.userAccount({
            _id: decoded._id,
            'tokens.token': token
        });
        
        if (!user) {
            error = new Error('User Authorization faild!');
            error.status = 500;
            next(error);
        }

        req.token = token;
        req.user = user;

        next();

    } catch (err) {
        error = new Error({authError: 'Please authenticate!'});
            error.status = 401;
            next(error);
        
    }
};


module.exports = auth;
/* #region  imports */

const User = require('../models/user.js');

/* #endregion */

require('../db/mongoose');

class UserService {

    /* #region CREATE */

    /**
     *Insert a new user
     * @param {*} requestBody Request body for a new user.
     * @returns an object containing new user inserted into database and new token { user, token }.
     * @memberof UserService
     */
    async createUser(requestBody) {

        const user = new User(requestBody);
        

        const saved = await user.save();

        

        return await user.generateAuthToken();

    }

    /* #endregion */

    /* #region  USER ACCOUNT */

    /**
     *Retrives single user by fiter parameters from database.
     *
     * @param {*} filterParams id, token, or other user parameters.
     * @returns document of one user from database that fulfilled filter criteria.
     * @memberof UserService
     */
    async userAccount(filterParams) {
        return await User.findOne(filterParams);
    }

    /* #endregion */

    /* #region  UPDATE USER */

    /**
     *Updates user with given parameters and saves to database.
     *
     * @param {*} user to update.
     * @param {*} requestBody update parameters.
     * @returns user from the database with updated parameters.
     * @memberof UserService
     */
    async updateUser(user, requestBody) {
        const updates = Object.keys(requestBody);
        const allowedUpdates = ['username', 'password', 'balance'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            throw new Error('Invalid updates!');
        }

        updates.forEach(update => user[update] = requestBody[update]);

        return await user.save();
    }

    /* #endregion */

    /* #region  DELETE USER */
    
    /**
     *Removes user from a database
     *
     * @param {*} userForRemoval user document designated for removal.
     * @returns removed user.
     * @memberof UserService
     */
    async deleteUser(userForRemoval) {
        return await userForRemoval.remove()
    }
    
    /* #endregion */

    /* #region  LOGIN */

    async loginUser(requestBody) {

        const user = await User.findByCredentials(requestBody.username, requestBody.password);

    
        return await user.generateAuthToken();
    }

    /* #endregion */

    /* #region  LOGOUT */

    /**
     *Removes the user's current token that was sent with the request.
     *
     * @param {*} user Owner of the token that is going to be removed.
     * @param {*} currentToken A token that will be removed.
     * @returns user without token that has been sent.
     * @memberof UserService
     */
    async logoutUser(user, currentToken) {
        user.tokens = user.tokens.filter(token => token.token !== currentToken);
        return await user.save();
    }
    /* #endregion */

    /* #region  LOGOUT FROM ALL DEVICES */

    /**
     *Removes all users tokens
     *
     * @param {*} user Owner of tokens.
     * @returns User without any tokens.
     * @memberof UserService
     */
    async logoutFromAll(user) {
        user.tokens = [];
        return await user.save();
    }

    /* #endregion */


}

module.exports = UserService;
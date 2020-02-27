/* #region  imports */

const Account = require('../models/account');

require('../db/mongoose');

/* #endregion */

class AccountService {

    /* #region CREATE */

    /**
     *Creates account for user
     *
     * @param {*} createParams parameters for creating a new account.
     * @returns created account
     * @memberof AccountService
     */
    async createAccount(createParams) {

        // Adding balance is not allowed
        delete createParams.balance;
        
        const account = new Account(createParams);

        return await account.save();
    }

    /* #endregion */

    /* #region  GET ALL ACCOUNTS */

    /**
     *Retrives all account documnets associated with the logged-in user.
     *
     * @param {*} user Owner of account document.
     * @param {*} filterParams filtering parameters.
     * @returns user with assocciated account documents.
     * @memberof AccountService
     */
    async accounts(user, filterParams) {
        return await user.populate(filterParams).execPopulate();
    }

    /* #endregion */

    /* #region  GET SINGLE ACCOUNT */

    /**
     *Retrives from database single account document that belongs to the user.
     *
     * @param {*} filterParams filtering parameters.
     * @returns a singel account document that belongs to user.
     * @memberof AccountService
     */
    async account(filterParams) {
        return await Account.findOne(filterParams);
    }

    /* #endregion */

    /* #region  UPDATE ACCOUNT */

    /**
     *Updates account document.
     *
     * @param {*} accountId Id of account that is going to be updated.
     * @param {*} userId Id of the user that document belongs to.
     * @param {*} updateParams Update parameters.
     * @returns updated document.
     * @memberof AccountService
     */
    async updateAccount(accountId, userId, updateParams) {       
        const updates = Object.keys(updateParams);
        const allowedUpdates = ['title', 'balance', 'description', 'color', 'icon', 'type', 'cardNumber'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            throw new Error('Invalid update!');
        }

        const account = await this.account({
            _id: accountId,
            owner: userId
        });

        if (!account) {
            throw new Error('Invalid account!');
        }

        updates.forEach(update => account[update] = updateParams[update]);
        return await account.save();
    }

    /* #endregion */

    /* #region  DELETE ACCOUNT */
    
    /**
     *Removes account document from the database.
     *
     * @param {*} filterParams filtering parameters.
     * @returns deleted account document.
     * @memberof AccountService
     */
    async deleteAccount(filterParams) {
        return await Account.findOneAndDelete(filterParams);
    }
    /* #endregion */
}

module.exports = AccountService;
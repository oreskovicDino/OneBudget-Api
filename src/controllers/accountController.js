/* #region  imports */

const express = require('express');
const router = new express.Router();


const AccountService = require('../services/accountService');
/* #endregion */

/* #region  init Service */
const accountService = new AccountService();
/* #endregion */

/* #region  CREATE */
// Create a new accout for user.
// "POST: /acc"
router.post('/', async (req, res, next) => {
    try {
        const newAccount = await accountService.createAccount({
            ...req.body,
            owner: req.user._id
        });

        res.status(201).send(newAccount);
    } catch (err) {
        err.status = 500;
        next(err)
    }
});

/* #endregion */

/* #region  READ */

// Read all accounts of user.
//"GET: /acc"
router.get('/', async (req, res , next) => {
    const sort = {};

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try {
        const user = await accountService.accounts(req.user, {
            path: 'accounts',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        });
        res.send(user.accounts);
    } catch (err) {
        err.status = 500;
        next(err);
    }
});

// Read single user account.
//"GET: /acc/:id"
router.get('/:id', async (req, res, next) => {
    try {
        const account = await accountService.account({
            _id: req.params.id,
            owner: req.user._id
        });
        
        if (!account) {
            error = new Error('Account Id not valid or not logged in');
            error.status = 400;
            next(error);
        }  
        
        res.send(account);

    } catch (err) {
        err.status = 500;
        next(err)
    }
});

/* #endregion */

/* #region  UPDATE */

// Update the account.
//"PATCH: /acc/:id"
router.patch('/:id', async (req, res, next) => {
  try {
   
      const updatedAccount = await accountService.updateAccount(req.params.id, req.user._id, req.body);
      
      res.send(updatedAccount);
  } catch (err) {
    err.status = 500;
    next(err)
  }
});

/* #endregion */

/* #region  DELETE */

// Delete the account
//"DELETE: /acc/:id"
router.delete('/:id', async (req, res, next) => {
    try {
        const removedAccount = await accountService.deleteAccount({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!removedAccount) {
            error = new Error('Account Id not valid or not logged in');
            error.status = 400;
            next(error);
        }

        res.send(removedAccount);
    } catch (err) {
        err.status = 500;
        next(err)
    }
});

/* #endregion */

module.exports = router;
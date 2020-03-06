/* #region  imports */

const mongoose = require('mongoose');

/* #endregion */

const Schema = new mongoose.Schema(accountSchema(), {
    timestamps: true
});
function accountSchema() {
    return {
        title: {
            type: String,
            trim: true,
            required: true,
            maxlenght: 40
        },
        balance: {
            type: Number,
            default: 0
        },
        description: {
            type: String,
            trim: true,
            maxlenght: 280,
            default: 'Description of this account'
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        color: {
            type: String,
            default: '#373DC2'
        },
        icon: {
            type: String,
            default: 'default_account'
        },
        type: {
            type: String,
            default: 'Cash'
        },
        cardNumber: {
            type: String,
            default: 'Cash'
        }

  }
}

const Account = mongoose.model('Account', Schema);

module.exports = Account;
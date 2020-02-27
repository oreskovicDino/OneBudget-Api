/* #region  imports */
const mongoose = require('mongoose');

/* #endregion */

const Schema = new mongoose.Schema(categorySchema(), {
    timestamps: true
});
function categorySchema() {
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
            maxlenght: 280
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
        }
        
  }
}

const Category = mongoose.model('Category', Schema);

module.exports = Category;
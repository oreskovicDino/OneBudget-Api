/* #region  imports */
const mongoose = require('mongoose');

/* #endregion */

const Schema = new mongoose.Schema(invoiceSchema(), {
    timestamps: true
});
function invoiceSchema() {
    return {
        owner: {
            type: String,
            required: true,
        },
        dueDate: {
            type: Date
        },
        balance: {
            type:Number,
            required: true,
        },
        typeOfInvoice: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Category'
        },
        account: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Account'
        }

  }
}

const Invoice = mongoose.model('Invoice', Schema);

module.exports = Invoice;
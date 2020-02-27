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
        },
        dueDate: {
            type: Date
        },
        balance: {
            type:Number
        },
        typeOfInvoice: {
            type: String
        },
        category: {
            type: mongoose.Types.ObjectId
        },
        account: {
            type: mongoose.Types.ObjectId
        }

  }
}

const Invoice = mongoose.model('Invoice', Schema);

module.exports = Invoice;
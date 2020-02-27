/* #region  imports */

const Invoice = require('../models/invoice');

const UserService = require('../services/userService');
const AccountService = require('../services/accountService.js');
const CategoryService = require('../services/categoryService.js');

require('../db/mongoose');

/* #endregion */

/* #region  init Service */

const userService = new UserService();
const accountService = new AccountService();
const categoryService = new CategoryService();

/* #endregion */

class InvoiceService {
    /* #region CREATE */

    /**
     * Creates new invoice doucment and updates balance of the user, account, and category.
     *
     * @param {*} user owner of the invoice doucment.
     * @param {*} createParams parameters for creating a new invoice.
     * @returns created invoice.
     * @memberof InvoiceService
     */
    async createInvoice(user,createParams) {
        const invoice = new Invoice(createParams);

        const newInvoice = await invoice.save();
        
        switch (newInvoice.typeOfInvoice) {
            case 'income':
                await adding(newInvoice, user, createParams.balance);
                break;
            case 'expense':
                await subtracting(newInvoice, user, createParams.balance);
                break;
            default:
                throw new Error('Incorrect type of invoice!');
                break;
        }

        return newInvoice;
        
    }
    
    /* #endregion */

    /* #region  GET SINGLE INVOICE */

    /**
     *Retrives from database single Invoice document that belongs to user.
     *
     * @param {*} filteParams filtering parameters.
     * @returns a single invoice document that belong to the user.
     * @memberof InvoiceService
     */
    async invoice(filteParams) {
        return await Invoice.findOne(filteParams);
    }

    /* #endregion */

    /* #region  GET ALL INVOICES */

    /**
     *Retrives all invoice documetns associated with the logged in user.
     *
     * @param {*} user owner of the invoice.
     * @param {*} filterParams filtering parameters.
     * @returns user with associated invoice document.
     * @memberof InvoiceService
     */
    async invoices(user, filterParams) {
        return await user.populate(filterParams).execPopulate();
    }

    /* #endregion */

    /* #region  UPDATE INVOCIE */

    /**
     *Updates invoice document and updates balance of the user, account, and category.
     *
     * @param {*} invoiceId Id of the invoice document that is going to be updated.
     * @param {*} user owner of the invoice document.
     * @param {*} updateParams parameters to update.
     * @returns updated invoice document.
     * @memberof InvoiceService
     */
    async updateInvoice(invoiceId, user, updateParams) {


        const updates = Object.keys(updateParams);



        const allowedUpdates = ['dueDate', 'balance'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            throw new Error('Ivalid updates!');
        }

        const invoice = await this.invoice({
            _id: invoiceId,
            owner: user._id
        });

        if (updateParams.balance) {
            
            if (invoice.balance < updateParams.balance) {
                const remainder = updateParams.balance - invoice.balance;
                await adding(invoice, user, remainder);  
                
            }
            
            if (invoice.balance > updateParams.balance) {
                const remainder = invoice.balance - updateParams.balance;
                await subtracting(invoice, user, remainder);            
            }

        }
            
        updates.forEach(update => {
            invoice[update] = updateParams[update];
        });
        
        return await invoice.save();
    }

    /* #endregion */

    /**
     *Removes invoice documnet and updates balance of the user, account, and category
     *
     * @param {*} user owner of the document.
     * @param {*} filterParams filtering parameters.
     * @returns deleted document.
     * @memberof InvoiceService
     */
    async deleteInvoice(user, filterParams) {

        const invoice = await Invoice.findOneAndDelete(filterParams);

         switch (invoice.typeOfInvoice) {
                case 'income':
                        await subtracting(invoice, user, invoice.balance);
                    break;
                    case 'expense':
                        await adding(invoice, user, invoice.balance);
                    break;
                default:
                    throw new Error('Incorrect type of invoice!')
                    break;
            }
        return invoice;
    }
}

/**
 *Adding new balance from the old one and updating documents.
 *
 * @param {*} invoice document containing category, account id's and old balance.
 * @param {*} user owner of the document.
 * @param {*} amount amount to add.
 */
const adding = async (invoice, user, amount) => {

    /* #region  User */

    // Adding some amount to existing user balance.
    user.balance += amount;

    // Updating user with new balance.
    const updatedUser = await userService.updateUser(user, {
        balance: user.balance
    });

    /* #endregion */

    /* #region  Account */

    //Retrieving account.
    const account = await accountService.account({
        _id: invoice.account,
        owner: user._id
    });

    // Adding some amount to existing account balance.
    account.balance += amount;

    // Updating account with new balance.
    const updateAccount = await accountService.updateAccount(invoice.account, user.id, {
        balance: account.balance
    });

    /* #endregion */

    /* #region  Category */

    //Retrieving category.
    const category = await categoryService.category({
        _id: invoice.category,
        owner: user._id
    });

    // Adding some amount to existing category balance.
    category.balance += amount;

    // Updating category with new balance.
    const updatedCategory = await categoryService.updateCategory(invoice.category, user.id, {
        balance: category.balance
    });

    /* #endregion */

};

/**
 *Subtracting new balance from the old one and updating documents.
 *
 * @param {*} invoice document containing category, account id's and old balance.
 * @param {*} user owner of the document.
 * @param {*} amount amount to add.
 */
const subtracting = async (invoice, user, amount) => {

    /* #region  User */

    // Subtracting some amount to existing user balance.
    user.balance -= amount;

    // Updating user with new balance.
    const updatedUser = await userService.updateUser(user, {
        balance: user.balance
    });

    /* #endregion */

    /* #region  Account */

    //Retrieving account.
    const account = await accountService.account({
        _id: invoice.account,
        owner: user._id
    });

    // Subtracting some amount to existing account balance.
    account.balance -= amount;

    // Updating account with new balance.
    const updateAccount = await accountService.updateAccount(invoice.account, user.id, {
        balance: account.balance
    });

    /* #endregion */

    /* #region  Category */

    //Retrieving category.
    const category = await categoryService.category({
        _id: invoice.category,
        owner: user._id
    });

    // Subtracting some amount to existing category balance.
    category.balance -= amount;

    // Updating category with new balance.
    const updatedCategory = await categoryService.updateCategory(invoice.category, user.id, {
        balance: category.balance
    });

    /* #endregion */

};


module.exports = InvoiceService;
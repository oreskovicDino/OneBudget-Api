/* #region   */
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../../src/models/user');
const Invoice = require('../../src/models/invoice');;
const Category = require('../../src/models/category');;
const Account = require('../../src/models/account');;

/* #endregion */

/* #region  Users */

/* #region  User One */

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    username: 'User One',
    password: 'TestZaporkaOne',
    tokens: [{
        token: jwt.sign({
            _id: userOneId
        }, process.env.JWT_SECRET)
    }]
};

/* #endregion */

/* #region  User Two */

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    username: 'User Two',
    password: 'TestZaporkaTwo',
    tokens: [{
        token: jwt.sign({
            _id: userTwoId
        }, process.env.JWT_SECRET)
    }]
};

/* #endregion */

/* #endregion */

/* #region  Accounts */

/* #region  User One accounts */

/* #region  Account One */

const accountOneUserOne = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User One Account One',
    description: 'Description for Account One of the User One',
    owner: userOneId
};

/* #endregion */

/* #region  Account Two */

const accountTwoUserOne = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User One Account Two',
    description: 'Description for Account Two of the User One',
    owner: userOneId
};

/* #endregion */

/* #region  Account Three */

const accountThreeUserOne = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User One Account Three',
    description: 'Description for Account Three of the User One',
    owner: userOneId
};

/* #endregion */

/* #region  Account Four */

const accountFourUserOne = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User One Account Four',
    description: 'Description for Account Four of the User One',
    owner: userOneId
};

/* #endregion */

/* #endregion */

/* #region  User Two accounts */

/* #region  Accout One */

const accountOneUserTwo = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User Two Account One',
    description: 'Description for Account One of the User Two',
    owner: userTwoId
};

/* #endregion */

/* #region  Accout Two */

const accountTwoUserTwo = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User Two Account Two',
    description: 'Description for Account Two of the User Two',
    owner: userTwoId
};

/* #endregion */

/* #region  Accout Three */

const accountThreeUserTwo = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User Two Account Three',
    description: 'Description for Account Three of the User Two',
    owner: userTwoId
};

/* #endregion */

/* #region  Accout Four */

const accountFourUserTwo = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User Two Account Four',
    description: 'Description for Account Four of the User Two',
    owner: userTwoId
};

/* #endregion */

/* #endregion */

/* #endregion */

/* #region  Category */

/* #region  User One Categories */

/* #region  Category One */

const categoryOneUserOne = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User One Category One',
    description: 'description for Category One of the User One',
    owner: userOneId
};

/* #endregion */

/* #region  Category Two */

const categoryTwoUserOne = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User One Category Two',
    description: 'description for Category Two of the User One',
    owner: userOneId
};

/* #endregion */

/* #region  Category Three */

const categoryThreeUserOne = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User One Category Three',
    description: 'description for Category Three of the User One',
    owner: userOneId
};

/* #endregion */

/* #region  Category Four */

const categoryFourUserOne = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User One Category Four',
    description: 'description for Category Four of the User One',
    owner: userOneId
};

/* #endregion */

/* #endregion */

/* #region  User Two Categories */

/* #region  Category One */

const categoryOneUserTwo = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User Two Category One',
    description: 'description for Category One of the User two',
    owner: userTwoId
};

/* #endregion */

/* #region  Category Two */

const categoryTwoUserTwo = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User Two Category Two',
    description: 'description for Category Two of the User two',
    owner: userTwoId
};

/* #endregion */

/* #region  Category Three */

const categoryThreeUserTwo = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User Two Category Three',
    description: 'description for Category Three of the User two',
    owner: userTwoId
};

/* #endregion */

/* #region  Category Four */

const categoryFourUserTwo = {
    _id: new mongoose.Types.ObjectId(),
    title: 'User Two Category Four',
    description: 'description for Category Four of the User two',
    owner: userTwoId
};

/* #endregion */

/* #endregion */

/* #endregion */

/* #region  Invoices */

/* #region  User one invoices */

/* #region  invoice One */

const invoiceOneUserOne = {
    _id: new mongoose.Types.ObjectId(),
    owner: userOneId,
    balance: 150,
    typeOfInvoice: 'income',
    category: categoryOneUserOne._id,
    account: accountOneUserOne._id
};

/* #endregion */

/* #region  invoice Two */

const invoiceTwoUserOne = {
    _id: new mongoose.Types.ObjectId(),
    owner: userOneId,
    balance: 100,
    typeOfInvoice: 'expense',
    category: categoryTwoUserOne._id,
    account: accountTwoUserOne._id
};

/* #endregion */

/* #region  invoice Three */

const invoiceThreeUserOne = {
    _id: new mongoose.Types.ObjectId(),
    owner: userOneId,
    balance: 100,
    typeOfInvoice: 'income',
    category: categoryThreeUserOne._id,
    account: accountThreeUserOne._id
};

/* #endregion */

/* #region  invoice Four */

const invoiceFourUserOne = {
    _id: new mongoose.Types.ObjectId(),
    owner: userOneId,
    balance: 50,
    typeOfInvoice: 'income',
    category: categoryFourUserOne._id,
    account: accountFourUserOne._id
};

/* #endregion */

/* #endregion */

/* #region  User Two invoices */

/* #region  invoice One */

const invoiceOneUserTwo = {
    _id: new mongoose.Types.ObjectId(),
    owner: userTwoId,
    balance: 150,
    typeOfInvoice: 'income',
    category: categoryOneUserTwo._id,
    account: accountOneUserTwo._id
};

/* #endregion */

/* #region  invoice Two */

const invoiceTwoUserTwo = {
    _id: new mongoose.Types.ObjectId(),
    owner: userTwoId,
    balance: 100,
    typeOfInvoice: 'expense',
    category: categoryTwoUserTwo._id,
    account: accountTwoUserTwo._id
};

/* #endregion */

/* #region  invoice Three */

const invoiceThreeUserTwo = {
    _id: new mongoose.Types.ObjectId(),
    owner: userTwoId,
    balance: 100,
    typeOfInvoice: 'income',
    category: categoryThreeUserTwo._id,
    account: accountThreeUserTwo._id
};

/* #endregion */

/* #region  invoice Four */

const invoiceFourUserTwo = {
    _id: new mongoose.Types.ObjectId(),
    owner: userTwoId,
    balance: 50,
    typeOfInvoice: 'expense',
    category: categoryFourUserTwo._id,
    account: accountFourUserTwo._id
};

/* #endregion */

/* #endregion */


/* #endregion */

const setupDatabase = async () => {

    await User.deleteMany();
    await Account.deleteMany();
    await Category.deleteMany();
    await Invoice.deleteMany();

    /* #region  Saving Users */

    await new User(userOne).save();
    await new User(userTwo).save();

    /* #endregion */

    /* #region  Saving Accounts */

    await new Account(accountOneUserOne).save();
    await new Account(accountTwoUserOne).save();
    await new Account(accountThreeUserOne).save();
    await new Account(accountFourUserOne).save();

    await new Account(accountOneUserTwo).save();
    await new Account(accountTwoUserTwo).save();
    await new Account(accountThreeUserTwo).save();
    await new Account(accountFourUserTwo).save();

    /* #endregion */

    /* #region  Saving Categories */

    await new Category(categoryOneUserOne).save();
    await new Category(categoryTwoUserOne).save();
    await new Category(categoryThreeUserOne).save();
    await new Category(accountFourUserOne).save();

    await new Category(categoryOneUserTwo).save();
    await new Category(categoryTwoUserTwo).save();
    await new Category(categoryThreeUserTwo).save();
    await new Category(categoryFourUserTwo).save();

    /* #endregion */

    /* #region  Saving Invoices */

    await new Invoice(invoiceOneUserOne).save();
    await new Invoice(invoiceTwoUserOne).save();
    await new Invoice(invoiceThreeUserOne).save();
    await new Invoice(invoiceFourUserOne).save();

    await new Invoice(invoiceOneUserTwo).save();
    await new Invoice(invoiceTwoUserTwo).save();
    await new Invoice(invoiceThreeUserTwo).save();
    await new Invoice(invoiceFourUserTwo).save();

    /* #endregion */
};

module.exports = {

    /* #region  User One */
    userOneId,
    userOne,
    /* #endregion */

    /* #region  User Two */
    userTwoId,
    userTwo,
    /* #endregion */

    /* #region  Accounts for user one */
    accountOneUserOne,
    accountTwoUserOne,
    accountThreeUserOne,
    accountFourUserOne,
    /* #endregion */

    /* #region  Accounts for user two */
    accountOneUserTwo,
    accountTwoUserTwo,
    accountThreeUserTwo,
    accountFourUserTwo,
    /* #endregion */

    /* #region  Category for user one */
    categoryOneUserOne,
    categoryTwoUserOne,
    categoryThreeUserOne,
    categoryFourUserOne,
    /* #endregion */

    /* #region  Category for user two */
    categoryOneUserTwo,
    categoryTwoUserTwo,
    categoryThreeUserTwo,
    categoryFourUserTwo,
    /* #endregion */

    /* #region  Invoices for user one */
    invoiceOneUserOne,
    invoiceTwoUserOne,
    invoiceThreeUserOne,
    invoiceFourUserOne,
    /* #endregion */

    /* #region  Invoices for user two */
    invoiceOneUserTwo,
    invoiceTwoUserTwo,
    invoiceThreeUserTwo,
    invoiceFourUserTwo,
    /* #endregion */

    setupDatabase
}
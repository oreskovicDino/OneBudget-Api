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

const invoice = {
    
};

const setuoDatabase = async () => {

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

};

module.exports = {

}
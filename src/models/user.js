/* #region  imports */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const Account = require('./account');;
const Category = require('./category');;
const Invoice = require('./invoice');;

/* #endregion */

const Schema = new mongoose.Schema(userSchema(), {
    timestamps: true
});

function userSchema() {
    return {
        username: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minLength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Your password can not be "password"');
                }
            }
        },
        balance: {
            type: Number,
            default: 0
        },
        tokens: [{
            token: {
                type: String,
                required: false
            }
        }]
    }
}

/* #region  Schema */

Schema.virtual('accounts', {
    ref: 'Account',
    localField: '_id',
    foreignField: 'owner'
});

Schema.virtual('categories', {
    ref: 'Category',
    localField: '_id',
    foreignField: 'owner'
});

Schema.virtual('invoices', {
    ref: 'Invoice',
    localField: '_id',
    foreignField: 'owner'
});

Schema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

Schema.methods.generateAuthToken = async function () {
    const user = this;

    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
    
    user.tokens = user.tokens.concat({
        token
    });

    await user.save();

    return {
        user,
        token
    };

}

Schema.statics.findByCredentials = async (username, password) => {

    
    const user = await User.findOne({
        username
    });


    if (!user) {
        throw new Error('Unable to login');
        
    }

    const isMatch  = await bcrypt.compare(password, user.password);


    if (!isMatch) {        
        throw new Error('Unable to login');
    }

    return user;
}

Schema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')) {
        // user.password = await bcrypt.hash(user.password, 10);

       const salt = await bcrypt.genSalt(10);

       user.password = await bcrypt.hash(user.password, salt );
    }

    next();
})

Schema.pre('remove', async function (next) {
    const user = this;
    await Account.deleteMany({
        owner: user._id
    });
    await Category.deleteMany({
        owner: user._id
    });
    await Invoice.deleteMany({
        owner: user._id
    });
    next()
});

/* #endregion */


const User = mongoose.model('User', Schema);

module.exports = User;
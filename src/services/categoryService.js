/* #region  imports */

const Category = require('../models/category');

require('../db/mongoose');

/* #endregion */

class CategoryService {

    /* #region CREATE */

    /**
     *Creates new Category document.
     *
     * @param {*} creationParams parameters for creating a new category document.
     * @returns created category.
     * @memberof CategoryServiceService
     */
    async createCategory(creationParams) {

        // Adding balance is not allowed
        delete creationParams.balance;
        
        const newCategory = new Category(creationParams);
        return await newCategory.save();
    }

    /* #endregion */

    /* #region  GET ALL CATEGORIES */
    /**
     *Retrives all categories documents associated with logged-in user.
     *
     * @param {*} user owner of the category document.
     * @param {*} filterParams filtering parameters.
     * @returns user with associated categories
     * @memberof CategoryServiceService
     */
    async categories(user, filterParams) {
        return await user.populate(filterParams).execPopulate();
    }

    /* #endregion */

    /* #region  GET SINGLE CATEGORY */

    /**
     *Retrives from database single Category doucment that belongs to the user
     *
     * @param {*} filterParams filtering parameters.
     * @returns a single category document that belongs to user.
     * @memberof CategoryServiceService
     */
    async category(filterParams) {
        return await Category.findOne(filterParams);
    }

    /* #endregion */

    /* #region  UPDATE CATEGORY */

    /**
     *Updates category document.
     * @param {*} todoId Id of category document that is going to be updated.
     * @param {*} userId Id of the user that document belongs to.
     * @param {*} updateParams Update parameters
     * @returns Updated document.
     * @memberof TodoService
     */
    async updateCategory(categoryId, userId, updateParameters) {
        const updates = Object.keys(updateParameters);
        const allowedUpdates = ['title', 'balance', 'description', 'color', 'icon'];
        const isValidOperation = updates.every(update => allowedUpdates.includes(update));

        if (!isValidOperation) {
            throw new Error('Invalid updates!');
        }

        const category = await this.category({
            _id: categoryId,
            owner: userId
        });

        updates.forEach(update => {
            category[update] = updateParameters[update];
        });

        return await category.save();
    }

    /* #endregion */

    /**
     *Removes category document from the database.
     *
     * @param {*} filterParams filtering parameters.
     * @returns deleted category document.
     * @memberof CategoryService
     */
    async deleteCategory(filterParams) {
        return await Category.findOneAndDelete(filterParams);
    }
}

module.exports = CategoryService;
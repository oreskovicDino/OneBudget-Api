/* #region  imports */

const express = require('express');
const router = new express.Router();


const CategoryService = require('../services/categoryService');
/* #endregion */

/* #region  init Service */
const categoryService = new CategoryService();
/* #endregion */

/* #region  CREATE */
// Create a new category.
// "POST: /cat"
router.post('/', async (req, res, next) => {
    try {
        const newCategory = await categoryService.createCategory({
            ...req.body,
            owner: req.user._id        
        });
        res.status(201).send(newCategory);
    } catch (err) {
        err.status = 500;
        next(err)
    }
});

/* #endregion */

/* #region  READ */

// Read all categories.
//"GET: /cat"
router.get('/', async (req, res, next) => {
    
    const sort = {};

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0] = parts[1]] === 'desc' ? -1 : 1;
    }

    try {
        const user = await categoryService.categories(req.user, {
            path: 'categories',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        });

        res.send(user.categories);
    } catch (err) {
        err.status = 500;
        next(err)
    }

});

// Read one of the categories.
//"GET: /cat/:id"
router.get('/:id', async (req, res,next) => {
    try {
        const category = await categoryService.category({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!category) {
            error = new Error('Category Id not valid or not logged in');
            error.status = 400;
            next(error);
        }

        res.send(category);

    } catch (err) {
        err.status = 500;
        next(err);
    }
});

/* #endregion */

/* #region  UPDATE */

// Update the category.
//"PATCH: /cat/:id"
router.patch('/:id', async (req, res, next) => {
    try {
        const category = await categoryService.updateCategory(req.params.id, req.user._id, req.body);

        if (!category) {
            error = new Error('Category Id not valid or not logged in');
            error.status = 400;
            next(error);
        }

        res.send(category);
    } catch (err) {
        err.status = 500;
        next(err);
    }
});

/* #endregion */

/* #region  DELETE */
// Delete the category
//"DELETE: /cat/:id"
router.delete('/:id', async (req, res, next) => {
    try {
        const category = await categoryService.deleteCategory({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!category) {
            error = new Error('Category Id not valid or not logged in');
            error.status = 400;
            next(error);
        }

        res.send(category);
    } catch (err) {
        err.status = 500;
        next(err);
    }
    
});

/* #endregion */



module.exports = router;
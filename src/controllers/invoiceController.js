/* #region  imports */

const express = require('express');
const router = new express.Router();


const InvoiceService = require('../services/invoiceService');


/* #endregion */

/* #region  init Service */

const invoiceService = new InvoiceService();

/* #endregion */

/* #region  CREATE */
// Create a new invoice.
// "POST: /inv"
router.post('/', async (req, res, next) => {
    try {
        const invoice = await invoiceService.createInvoice(req.user, {
            ...req.body,
            owner: req.user._id
        });

        res.status(201).send(invoice);

    } catch (err) {
        err.status = 500;
        next(err);
    }
});

/* #endregion */

/* #region  READ */

// Read all invoices.
//"GET: /inv"
router.get('/', async (req, res, next) => {
    const sort = {};

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
  
    try {
        const user = await invoiceService.invoices(req.user, {
            path: 'invoices',
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        });
        res.send(user.invoices);
    } catch (err) {
        err.status = 500;
        next(err);
    }
});

// Read one invoice.
//"GET: /inv/:id"
router.get('/:id', async (req, res, next) => {
    try {
        const invoice = await invoiceService.invoice({
            _id: req.params.id,
            owner: req.user._id
        });

        if (!invoice) {
            error = new Error('Invoice Id not valid or not logged in');
            error.status = 400;
            next(error);
        }

        res.send(invoice);
    } catch (err) {
        err.status = 500;
        next(err);
    }
});

/* #endregion */

/* #region  UPDATE */

// Update the invoice.
//"PATCH: /inv/:id"
router.patch('/:id', async (req, res, next) => {
    try {

        const updatedInvocie = await invoiceService.updateInvoice(req.params.id, req.user, req.body);
        
        if (!updatedInvocie) {
            error = new Error('Invoice Id not valid or not logged in');
            error.status = 400;
            next(error);
        }
        
        res.send(updatedInvocie);

    } catch (err) {
        err.status = 500;
        next(err);
    }
});

/* #endregion */

/* #region  DELETE */
// Delete the invoice
//"DELETE: /inv/:id"
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedInvocie = await invoiceService.deleteInvoice(req.user ,{
            _id: req.params.id,
            owner: req.user._id
        });
            
        if (!deletedInvocie) {
            error = new Error('Invoice Id not valid or not logged in');
            error.status = 400;
            next(error);
        }

        res.send(deletedInvocie);
    } catch (err) {
        err.status = 500;
        next(err);
    }
});

/* #endregion */

module.exports = router;
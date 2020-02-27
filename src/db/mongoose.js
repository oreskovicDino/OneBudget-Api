/* #region  imports */

const mongoose = require('mongoose');

/* #endregion */


/* #region  Connection */

mongoose.connect("mongodb://127.0.0.1:27017/onebudget-api-database-dev", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
/* #endregion */
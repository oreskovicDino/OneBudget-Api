/* #region  imports */

const mongoose = require('mongoose');

/* #endregion */


/* #region  Connection */

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});
/* #endregion */
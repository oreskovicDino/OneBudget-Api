/* #region  Imports */

const app = require('./app');

/* #endregion */


app.listen(process.env.PORT, () =>{
    console.log(`Server is up on port ${process.env.PORT}!`);
})
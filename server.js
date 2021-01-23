const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(require('./routes/getOffers'));
app.use(require('./routes/getCakeMore'));
app.use(require('./routes/getChocMore'));
app.use(require('./routes/register'));

app.listen(PORT,() => {

    console.log(`App is up and running at port ${PORT}`);
});
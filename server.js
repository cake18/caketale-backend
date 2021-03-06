const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(require('./routes/getOffers'));
app.use(require('./routes/getCakeMore'));
app.use(require('./routes/getChocMore'));
app.use(require('./routes/register'));
app.use(require('./routes/login'));
app.use(require('./routes/getLimitCake'));
app.use(require('./routes/cakeMore'));
app.use(require('./routes/sendOrder'));
app.use(require('./routes/getLimitChoco'));

app.get('/',(req,res) => {

    console.log("Hello there");
});

app.listen(PORT,() => {

    console.log(`App is up and running at port ${PORT}`);
});
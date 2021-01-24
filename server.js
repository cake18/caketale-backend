const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(require('./routes/getOffers'));
app.use(require('./routes/getCakeMore'));
app.use(require('./routes/getChocMore'));
app.use(require('./routes/register'));
app.use(require('./routes/login'));

app.get('/',(req,res) => {

    console.log("Hello there");
});

app.listen(PORT,() => {

    console.log(`App is up and running at port ${PORT}`);
});
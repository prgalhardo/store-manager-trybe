require('dotenv').config();

const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const RouterProducts = require('./routes/routesProducts');
const RouterSales = require('./routes/routesSales');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', RouterProducts);
app.use('/sales', RouterSales);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});

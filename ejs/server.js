const express = require('express');
const app = express();
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${PORT}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(__dirname + '/public'));

const Contenedor = require('./classContainer/index');
const container = new Contenedor('./data/products.json');

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const products = await container.getAll();
  res.render('pages/form', { products });
});

app.post('/productos', async (req, res) => {
  const { body } = req;
  try {
    container.save(body);
    res.redirect('/');
  } catch {
    res.json({ error: true, msj: 'No se pudo guardar el producto' });
  }
});

app.get('/productos', async (req, res) => {
  let products = await container.getAll();
  if (products) {
    res.render('pages/products', { productos: products });
  } else {
    res.json({ error: true });
  }
});

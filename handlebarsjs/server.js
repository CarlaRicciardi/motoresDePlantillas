const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto http://localhost:${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

const Contenedor = require('./classContainer/index');
const container = new Contenedor('./data/products.json');

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

// // GET '/api/productos' -> devuelve todos los productos.
// router.get('/', async (req, res) => {
//   const allProducts = await contenedor.getAll();
//   res.json(allProducts);
// });

// // GET '/api/productos/:id' -> devuelve un producto según su id.
// router.get('/:id', async (req, res) => {
//   const { id } = req.params;
//   const prodEncontrado = await contenedor.getById(id);
//   if (prodEncontrado) {
//     res.json(prodEncontrado);
//   } else {
//     res.json({ error: true, msg: 'no encontrado' });
//   }
// });

// // POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
// router.post('/', async (req, res) => {
//   const { body } = req;
//   try {
//     contenedor.save(body);
//     res.send('producto guardado');
//   } catch {
//     res.json({ error: true, msg: 'No se pudo guardar el producto' });
//   }
// });

// // PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { title, price, thumbnail } = req.body;
//   try {
//     await contenedor.update(id, title, price, thumbnail);
//     res.json({ success: true });
//   } catch (e) {
//     console.log(e);
//     res.json({ error: true });
//   }
// });

// // DELETE '/api/productos/:id' -> elimina un producto según su id.
// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   try{
//     await contenedor.deleteById(id);
//     res.json({ success: true, msg: 'producto eliminado' });
//   } catch(e) {
//     res.json({error: true, msg: 'producto no encontrado'})
//   }
// });

app.get('/', (req, res) => {
  res.render('form');
});

app.post('/productos', async (req, res) => {
  const { body } = req;
  try {
    container.save(body);
    res.render('gracias.hbs');
  } catch {
    res.json({ error: true, msj: 'No se pudo guardar el producto' });
  }
});

app.get('/productos', async (req, res) => {
  let products = await container.getAll()
  res.render('productslist', { products, productsExist: true });
});


const fs = require('fs');

class Contenedor {
  constructor(file) {
    this.file = file;
  }

  async save(objectProduct) {
    const data = await fs.promises.readFile(this.file, 'utf-8');
    const dataParse = JSON.parse(data);

    const id = dataParse.length + 1;

    objectProduct.id = id;

    dataParse.push(objectProduct);

    const dataString = JSON.stringify(dataParse, null, 2);
    await fs.promises.writeFile(this.file, dataString);
  }

  async getById(id) {
    const data = await fs.promises.readFile(this.file, 'utf-8');
    const dataParse = JSON.parse(data);
    //lo parseo para convertirlo en array y asi obtener el id mediante find
    const product = dataParse.find((product) => product.id == id);

    if (product) {
      return product;
    } else {
      return 'product not find';
    }
  }

  async getAll() {
    const data = await fs.promises.readFile(this.file, 'utf-8');
    return JSON.parse(data);
  }

  async deleteById(id) {
    try {
      const products = await this.getAll();
      const filtradoId = products.filter((e) => e.id != id);
      await fs.promises.writeFile(this.file, JSON.stringify(filtradoId));
    } catch (err) {
      console.log(`No se encontró el objeto con id: ${id}`);
    }
  }

  async deleteAll() {
    await fs.writeFileSync(this.file, '[]');
    console.log('Se han eliminado todos los productos');
  }

  async update(id, title, price, thumbnail) {
    const productos = await this.getAll();
    const producto = productos.find((product) => product.id == id);

    producto.title = title;
    producto.price = price;
    producto.thumbnail = thumbnail;

    console.log(producto);
    await fs.promises.writeFile(this.file, JSON.stringify(productos));
    return producto;
  }
}

async function start() {
  const prodData = new Contenedor('data');

  // prodData.save(
  //     {
  //         "title": "Calculadora",
  //         "price": 123.45,
  //         "id": 1
  //       }
  // )

  // const AllProducts = await prodData.getAll();
  // console.log(AllProducts);

  // const productById = await prodData.getById(2);
  // console.log(productById);

  // const deleteAll = await prodData.deleteAll();
  // console.log(deleteAll);

  // const borrarPorId = await prodData.deleteById(1);
  // console.log(borrarPorId);
}

start();

module.exports = Contenedor;

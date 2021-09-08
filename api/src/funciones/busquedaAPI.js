const mongoose = require("mongoose");
const fetch = require("node-fetch");
const Producto = require("./models/Producto");
const connectionString =
  "mongodb+srv://user_proyecto:12345@clusterproyecto.ie6co.mongodb.net/proyectoDB";

const busqueda = async () => {
  await fetch(
    "https://www.googleapis.com/books/v1/volumes?q=''+inauthor:'aldous huxley'&key=%20AIzaSyDqNrqlxSCcYdzWw0uiFbQPdQ_QJ4SVVMM"
  )
    .then((e) => e.json())
    .then(async (libro) => {
      let c = 0;
      let obj = {
        titulo: libro.items[c].volumeInfo.title,
        autor: libro.items[c].volumeInfo.authors[0],
        editorial: libro.items[c].volumeInfo.publisher,
        descripcion: libro.items[c].volumeInfo.description,
        fecha: libro.items[c].volumeInfo.publishedDate,
        paginas: libro.items[c].volumeInfo.pageCount,
        generos: libro.items[c].volumeInfo.categories[0],
        img: libro.items[c].volumeInfo.imageLinks.thumbnail,
        idioma: libro.items[c].volumeInfo.language,
        precio: libro.items[c].saleInfo.listPrice.amount,
      };
      const producto = new Producto(obj);
      await producto.save();
    });
};

busqueda();
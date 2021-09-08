const { Router } = require("express");
const router = Router();

const CartShopping = require ("./cartShopping");
const Promociones = require ("./promociones");
const Producto = require("./producto.js");
const Usuario = require ("./usuario");
const Genero = require("./genero");
const Orden = require("./orden");


router.use("/productos", Producto);
router.use("/promo", Promociones);
router.use("/cart", CartShopping);
router.use("/generos", Genero);
router.use("/auth", Usuario);
router.use("/orden", Orden);

module.exports = router;
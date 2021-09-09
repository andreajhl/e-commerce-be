const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();

const Usuario = require("../models/Usuario");
const Orden = require ("../models/Orden")

const {validarJWTAdmin} = require("../middleware/validarJWT");

router.get('/', async (req,res)=>{
    let history= await Orden.find({})
                            .populate('user',['nombre','apellido'])
                            .populate('productos.producto',['titulo','precio'])
    history= history.filter(e=>e.user.nombre);

    res.send(history);
});

router.get('/:idOrden', async (req,res)=>{

    const {idOrden}=req.params

    const history= await Orden.findById(idOrden)
                              .populate('user',['nombre','apellido','email'])
                              .populate('productos.producto',['titulo','precio'])
    res.send(history)
});

router.post('/:estado/:idOrden', validarJWTAdmin,async(req,res)=>{

    const {estado,idOrden}=req.params

    const orden= await Orden.findByIdAndUpdate(idOrden,{"estado":estado},{new:true})
                            .populate('user',['nombre','apellido','email'])
                            .populate('productos.producto',['titulo','precio'])
    res.send(orden)
})
module.exports = router;
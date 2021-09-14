const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();

const Usuario = require("../models/Usuario");
const Orden = require ("../models/Orden")

const {validarJWTAdmin, validarJWTUser} = require("../middleware/validarJWT");

router.get('/', validarJWTUser, async (req,res)=>{
    const id=req.uid
    let history= await Orden.find({},{ "user": {$elemMatch:{id}}})
                            .populate('user',['nombre','apellido'])
                            .populate('productos.producto',['titulo','precio'])
  

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
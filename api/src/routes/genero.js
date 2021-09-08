const { Router } = require("express");
const mongoose = require("mongoose");
const router = Router();

const Producto = require("../models/Producto");
const Genero = require("../models/Genero");

const {validarJWTAdmin} = require ("../middleware/validarJWT");


router.get('/', async (req,res)=>{
  const resp= await Genero.find({},{"genero":1,"_id":0});

  const arrayGeneros=resp.map(e=>e.genero);

  res.status(200).send(arrayGeneros);

});

router.post("/",async (req, res) => { 
  const { genero } = req.body;
  const newGenero = new Genero({ genero });
  await newGenero.save();
  res.send({genero:newGenero.genero});   
});

router.put("/:genero", validarJWTAdmin,async (req, res) => { 
  const { genero } = req.params;
  const {updateGenero}= req.query;
  const editGenero= await Genero.findOneAndUpdate({"genero":genero},{"genero":updateGenero},{new:true}); 

  res.json(editGenero);

});

router.delete('/delete',validarJWTAdmin ,async (req, res)=>{
  const {genero}=req.query;

  await Genero.findOneAndDelete({genero})
  await Producto.updateMany({"generos":genero},{$pull:{"generos":genero}})
  res.status(200).send({ok:true});
});

module.exports = router;

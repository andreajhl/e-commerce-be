const { Router } = require("express");
const router = Router();
const Promo = require("../models/Promo");

const {validarJWTAdmin} = require ("../middleware/validarJWT")


router.post('/',validarJWTAdmin,async (req,res)=>{
    const promo= new Promo(req.body);
    await promo.save();
    res.send({ok:true});
});

router.get('/', async(req,res)=>{
    var promos= await Promo.find({});
    const date= new Date().getTime();
    promos = promos.filter(e=>e.fechaInicio.getTime()<= date && e.fechaFinal.getTime() >= date);
    
    res.send(promos);
});

router.delete('/delete/:id',validarJWTAdmin,async (req,res)=>{
    const {id}=req.params;
    await Promo.findByIdAndDelete(id);
    res.send({ok:true});
});

router.put('/:id',validarJWTAdmin,async(req,res)=>{
    const {id}=req.params;
    const update= req.body;
    const promoUpdate= await Promo.findByIdAndUpdate(id,update,{new:true});
    res.send(promoUpdate);
})

module.exports = router;
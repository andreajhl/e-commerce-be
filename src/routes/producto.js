const { Router } = require("express");
const router = Router();

const Producto = require("../models/Producto");
const Orden = require("../models/Orden");

const {validarJWTAdmin, validarJWTUser} = require ("../middleware/validarJWT");

router.get("/", async (req, res) => {
  var books = await Producto.find({},{"editorial":0, "descripcion":0,"fecha":0, "paginas":0});
  res.status(200).json(books);
});

router.get('/:id', async(req,res)=>{
  const {id}=req.params
  const bookDetail = await Producto.findById(id, (err, productDetail)=>{
      err? res.status(404).send({message:'error al buscar libro'}) : res.status(200).send(productDetail)
  });
});

router.post("/", validarJWTAdmin, async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).send(producto);     
  } catch (error) {
    res.status(500).send({ok: false, msg:' no se pudo crear el producto'}); 
  };
});


router.post("/review",validarJWTUser,async (req, res) => { 
  var id = req.uid;
  var {nombre, apellido} = req;
  let obj = {
    ...req.body,
    nombre, 
    apellido,
    userId:id
  };
  var orden = await Orden.find({"user":id}, {"productos":1})
      orden = [].concat.apply([], orden.map(e=>e.productos));
      orden = orden.filter(e=>e.producto == req.body._id);

      var {review} = await Producto.findById({"_id":req.body._id},{"review":1});
          review= review.find(e=>e.userId===id);
      
  if(orden.length === 0) return res.status(500).send({ok:'comprar'});
  if(review.userId) return res.status(500).send({ok:'duplicado'});
  try {
    var a= await Producto.updateOne({ "_id": req.body._id},{ $push:{ review:obj}}, {new:true});

    res.status(201).send(a);
          
  } catch (error) {
     res.status(500).send({ msg:' no se pudo dejar su review' }); 
  };
});

router.put('/edit/:id', validarJWTAdmin, async (req,res)=>{
  const {id}=req.params;
  const update= req.body;
  const editBook= await Producto.findByIdAndUpdate(id,update, {new:true}); 
  res.status(201).send(editBook);
});

router.delete('/delete/:id', validarJWTAdmin, async (req,res)=>{
  const {id}=req.params;
  await Producto.findByIdAndDelete(id); 
  res.send({ok:true});
});

module.exports = router;
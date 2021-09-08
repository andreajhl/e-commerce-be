const {response}= require('express')
const bcrypt = require ("bcryptjs")
const Usuario = require("../models/Usuario");
const {generarJWT} = require ("../middleware/generarJWT")

const createUser = async(req, res=response)=>{
    const {email,password}=req.body

    try {
        let user = await Usuario.findOne ({email});
    
        if(user) return res.status(400).send({ok:false, msg:'el usuario ya existe'})
    
        user = new Usuario(req.body)
        
        const salt = bcrypt.genSaltSync();
        user.password= bcrypt.hashSync (password,salt);

        await user.save()

        const token = await generarJWT (user._id,user.nombre,user.admin, user.apellido)

        res.status(201).send({token})
    } catch (error) {
    
        res.send({ok:false, msg:'alguno de los datos es incorrecto'})
    }
}

const loginUser = async (req, res=response)=>{
    const {email,password}=req.body;

    try {
        let user = await Usuario.findOne ({email});
        if(!user) return res.status(400).send({ok:false, msg:'el usuario no existe'})
        const token = await generarJWT (user.id,user.nombre,user.admin, user.apellido)
        const validarPassword= bcrypt.compareSync( password, user.password)
        
        !validarPassword? res.status(400).send({msg:'correo o password incorrectos'}): res.status(200).send({token, user})
    } catch (error) {
        res.send(error)
    }
}

const revalidarToken = async(req, res=response)=>{
    const {uid,nombre,admin, apellido}=req
    const token = await generarJWT (uid,nombre,admin, apellido)
    res.send(token)
}

module.exports={
    createUser,
    loginUser,
    revalidarToken
}
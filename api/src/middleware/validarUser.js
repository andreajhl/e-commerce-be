const {response}= require('express')
const {validationResult } = require ('express-validator')

const validarUser = (req,res=response, next)=>{

    const errors = validationResult(req);
    if( !errors.isEmpty()) return res.status(400).send({ok:false,error:errors.mapped()})

    next()
}

module.exports={
    validarUser
}
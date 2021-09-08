const jwt = require('jsonwebtoken')
const {CLAVE_TOKEN}=process.env

const generarJWT =(uid, nombre, admin, apellido)=>{
    return new Promise ((resolve,reject)=>{
        const payload = {uid, nombre, admin, apellido};

        jwt.sign(payload,CLAVE_TOKEN, {
            expiresIn: '1d'
        },(err , token)=>{
            err ? reject('no se puede generar el token') : resolve (token)
        })
    })
}

module.exports={
    generarJWT
}

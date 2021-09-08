const jwt = require ('jsonwebtoken')
const {CLAVE_TOKEN} = process.env


const validarJWTAdmin= (req,res,next)=>{
    
    const token = req.header('x-token');
    
    
    if (!token){
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }

    try {
        const {uid,nombre,admin, apellido} = jwt.verify(
            token,
            CLAVE_TOKEN
        )
        req.uid=uid
        req.nombre=nombre
        req.admin=admin
        req.apellido=apellido
        admin?  next() : res.status(500).json({ok:false,msg:'ruta no permitida'})

    } catch (error) {
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }

}

const validarJWTUser= (req,res,next)=>{
    
    const token = req.header('x-token');

    
    if (!token){
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }

    try {
        const {uid,nombre,admin, apellido} = jwt.verify(
            token,
            CLAVE_TOKEN
        )
        req.uid=uid
        req.nombre=nombre
        req.admin=admin
        req.apellido=apellido
       

    } catch (error) {
        return res.status(401).json({ok:false,msg:'No hay token en la peticion'})
    }
    next()
}


module.exports={
    validarJWTUser,
    validarJWTAdmin
}
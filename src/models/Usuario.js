const { Schema, model } = require('mongoose');
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true
    },
    Telefono:{
        type:String,
    },
    documento: {
        type: Number
    },  
    foto:{
        type: String,
        default: 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20'
    },
    direccion: {
        type: String
    },
    historialDeCompras:{
        type: Array
    },
    admin:{
        type: Boolean,
        default: false
    },
    passRetriever:{
        type: String,
    },
    whishlist:[{
        producto:{
            type: Schema.Types.ObjectId,
            ref: 'Producto'
        }
    }]


});

module.exports= model('Usuario', UsuarioSchema)
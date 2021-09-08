const { Schema, model } = require('mongoose');

const OrdenSchema = Schema({
    fecha:{
        type: Date,
        default: Date.now
    },
    valorTotal:{
        type: Number,
        required: true
    },
    estado:{
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    direccion:{
        type: String,
    },
    pago:{
        type: String,
        required: true,
        unique: true
    },
    productos:[{
        producto: {
            type: Schema.Types.ObjectId,
            ref: 'Producto',
            required: true
        },
        cantidad:{
            type: Number,
            required :true
        }
    }]
});

module.exports= model('Orden', OrdenSchema)

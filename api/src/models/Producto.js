const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },   
    fecha: {
        type: Date,
        required: true
    },
    paginas: {
        type: Number,
        required: true
    },
    generos:{
        type: Array,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    idioma:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    review: {
        type: Array,
    }


});

module.exports= model('Producto', ProductoSchema)

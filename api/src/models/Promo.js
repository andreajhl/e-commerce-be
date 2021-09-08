const { Schema, model } = require('mongoose');

const PromoSchema = Schema({
    fechaInicio: {
        type: Date,
        default : Date.now
    },
    fechaFinal: {
        type: Date,
        required: true
    },
    dias:{
        type: Array,
        required: true
    },
    porcentaje: {
        type: Number,
        default: 25
    },
    genero:{
        type: Array,
        required: true
    }
});

module.exports= model('Promo', PromoSchema)

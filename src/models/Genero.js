const { Schema, model } = require('mongoose');

const GeneroSchema = Schema({
    genero: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports= model('Genero', GeneroSchema)

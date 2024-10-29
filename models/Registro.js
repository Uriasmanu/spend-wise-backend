// models/Registro.js
const mongoose = require('mongoose');

const RegistroSchema = new mongoose.Schema({
    data: {
        type: Date,
        required: true,
    },
    valor: {
        type: Number,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    categoria: {
        type: String,
        default: null,
    },
}, { timestamps: true });

const Registro = mongoose.model('Registro', RegistroSchema);
module.exports = Registro;

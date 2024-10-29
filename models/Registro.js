// models/Registro.js

const mongoose = require('mongoose');

// Definindo o esquema para o modelo Registro
const registroSchema = new mongoose.Schema({
  categoria: {
    type: String,
    default: null,
  },
  data: {
    type: Date,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  identificador: {
    type: String,
    required: true,
    unique: true,
  },
  valor: {
    type: Number,
    required: true,
  },
});

// Criando o modelo com base no esquema definido
const Registro = mongoose.model('Registro', registroSchema);

// Exportando o modelo para ser usado em outras partes do aplicativo
module.exports = Registro;

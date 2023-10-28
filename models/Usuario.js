const mongoose = require('mongoose');

// Definir el esquema para el modelo de usuario
const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  inhabilitado: {
    type: {
      valor: {
        type: Boolean,
        default: false,
      },
      fecha_inhabilitado: Date,
    },
  },
  correoElectronico: {
    type: String,
    required: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
  numeroCelular: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['cliente', 'administrador de restaurante'],
    required: true,
  },
});

// Crear el modelo de usuario a partir del esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Exportar el modelo para su uso en otros archivos
module.exports = Usuario;

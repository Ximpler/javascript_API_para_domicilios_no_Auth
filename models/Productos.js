const mongoose = require('mongoose');

// Definir el esquema para el modelo de producto
const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: false,
    //no es necesario
  },
  id_Restaurante: {
    type: mongoose.Types.ObjectId,
    requiered: true,
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
});

// Crear el modelo de producto a partir del esquema
const Producto = mongoose.model('Producto', productoSchema);

// Exportar el modelo para su uso en otros archivos
module.exports = Producto;

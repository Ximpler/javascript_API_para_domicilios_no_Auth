const mongoose = require('mongoose');

// Definir el esquema para el modelo de restaurante
const restauranteSchema = new mongoose.Schema({
    Administrador: {
        type: mongoose.Types.ObjectId,
        requiered: true
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
    nombre: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    categorias: {
        type: [String],
        requiered: true,
    },
    popularidad: {
        type: Number,
        default: 0
    },
    //horario de cuando estaran abiertos/recibiendo pedidos
    horario: {
        lunes: {
          type: String,
          required: true,
        },
        martes: {
          type: String,
          required: true,
        },
        miercoles: {
          type: String,
          required: true,
        },
        jueves: {
          type: String,
          required: true,
        },
        viernes: {
          type: String,
          required: true,
        },
        sabado: {
          type: String,
          required: true,
        },
        domingo: {
          type: String,
          required: true,
        },
      },
});

// Crear el modelo de restaurante a partir del esquema
const Restaurante = mongoose.model('Restaurante', restauranteSchema);

// Exportar el modelo para su uso en otros archivos
module.exports = Restaurante;

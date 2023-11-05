const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  id_restaurante: {
    type: mongoose.Types.ObjectId,
    requiered: true,
  },
  productos: {
    type: [
      {
        nombre: String,
        precio: Number,
        cantidad: Number,
      },
    ],
    requiered: true,
  },
  fecha: Date,
  direccionEntrega: String,
  id_cliente: mongoose.Types.ObjectId,
  total: Number,
  estado: {
    type: String,
    enum: ['creado', 'En Curso', 'En Camino', 'Entregado'],
    default: 'creado',
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

export default mongoose.model('pedido', pedidoSchema);

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Creacion del app
const app = express();

// Conexión a MongoDB usando mongoose
mongoose
  .connect(
    'mongodb://localhost:27017/'
  )
  .then(() => {
    console.log('Conectado.');
  })
  .catch((err) => {
    console.log('Hubo un error en la conexion!');
    console.log(err);
  });

// Middlewares
app.use(cors());
app.use(express.json());

//importaciones
import usuarioRuta from './routes/Usuario.js';
import restauranteRuta from './routes/Restaurantes.js';
import productoRuta from './routes/Productos.js';
import pedidoRuta from './routes/Pedidos.js';

app.use('/usuario', usuarioRuta);
app.use('/restaurante', restauranteRuta);
app.use('/productos', productoRuta);
app.use('/Pedidos',pedidoRuta);

// Endpoint para 404
app.use((req, res) => {
  //console.log(req);
  //console.log(res);
  res.status(404).json({ message: 'No encontrado.' });
});

// Inicia app en puerto 8080
app.listen(8080);

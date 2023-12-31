import Pedidos from '../models/Pedidos';
import Restaurante from '../models/Restaurantes';

export async function getPedido(req, res) {
  const pedidoId = req.params.id; // Obtén el ID del pedido desde la URL
  const pedido = await Pedidos.find({ _id: pedidoId, 'inhabilitado.valor': false });
  if (pedido) {
    res.status(200).json(pedido);
  } else {
    res.status(404).json({ mensaje: 'Pedido no encontrado' });
  }
}

export async function getPedidos(req, res) {
  const restaurante = req.query.id_Restaurante;
  const usuario = req.query.id_usuario;
  const fechaDesde = req.query.fechaDesde;
  const fechaHasta = req.query.fechaHasta;
  //intentar organizar asi = const {var1, var2, ... varn } = req.query
  let filtros = {};

  if (restaurante) {
    filtros.id_restaurante = restaurante;
  }

  if (usuario) {
    filtros.id_cliente = usuario;
  }

  if (fechaDesde && fechaHasta) {
    filtros.fecha = { $gte: new Date(fechaDesde), $lte: new Date(fechaHasta) };
  }

  filtros['inhabilitado.valor'] = false;
  let pedidosFiltrados = await Pedidos.find(filtros);

  if (pedidosFiltrados.length > 0) {
  res.status(200).json(pedidosFiltrados);
  } else {
    res.status(404).json({ mensaje: 'No se encontraron pedidos que coincidan con los filtros' });
  }
}

export async function getPedidosSinEnviar(req, res){
    try {
        const pedidosSinAceptar = await Pedidos.find({
          estado: 'En Curso', 
          "inhabilitado.valor" : false
        }).exec();
    
        res.json(pedidosSinAceptar);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los pedidos enviados pero sin aceptar.' });
      }
}

export async function createPedido(req, res) {
  try {
    let nuevoPedido = req.body;
    const pedido = new Pedidos(nuevoPedido);
    const resultado = await pedido.save();
    await actualizarPopularidadRestaurante(req.body.id_restaurante);
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function actualizarPopularidadRestaurante(restauranteId) {
    const cantidadPedidos = await Pedidos.countDocuments({ id_restaurante: restauranteId }).exec();
    const restaurante = await Restaurante.findById(restauranteId);
  
    if (restaurante) {
      restaurante.popularidad = cantidadPedidos;
      await restaurante.save();
    }
}

export async function patchPedido(req, res) {
  const idPedido = req.params.id;
  const cambios = req.body;
  try {
    // Buscar el pedido por ID y asegurarse de que no esté inhabilitado
    const pedidoExistente = await Pedidos.findOne({ _id: idPedido, 'inhabilitado.valor': false });

    if (pedidoExistente) {
      if (pedidoExistente.estado !== 'Entregado') {
        // Actualizar el pedido si no está entregado
        await Pedidos.findByIdAndUpdate(idPedido, cambios);
        const pedidoActualizado = await Pedidos.findById(idPedido);
        res.status(200).json({ mensaje: 'Pedido modificado correctamente', pedido: pedidoActualizado });
      } else {
        res.status(403).json({ mensaje: 'El pedido ya fue entregado.' });
      }
    } else {
      res.status(403).json({ mensaje: 'El pedido no existe o ha sido eliminado.' });
    }
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al modificar el pedido' });
  }
}


export async function deletePedido(req, res) {
    try {
      const pedidoEliminado = await Pedidos.findOneAndUpdate({_id : req.params.id,  'inhabilitado.valor': false  }, {
        inhabilitado: { valor: true, fecha_inhabilitado: new Date() },
      });
      if (!pedidoEliminado) {
        return res.status(404).json({ mensaje: 'Pedido no encontrado' });
      }
      res.status(200).json({ mensaje: 'Pedido inhabilitado correctamente' });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al inhabilitando el pedido' });
    }
  }

  

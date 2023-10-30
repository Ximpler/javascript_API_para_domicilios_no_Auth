import Pedidos from '../models/Pedidos';

export async function getPedido(req, res) {
  const pedidoId = req.params.id; // Obtén el ID del pedido desde la URL
  const pedido = await Pedidos.find({ _id: pedidoId,  'inhabilitado.valor': false  });
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
      filtros.id_Restaurante = restaurante;
    }
  
    if (usuario) {
      filtros.usuario = usuario;
    }

    if (fechaDesde && fechaHasta) {
        filtros.fecha = { $gte: new Date(fechaDesde), $lte: new Date(fechaHasta) };
      }

    filtros['inhabilitado.valor'] = false;
    


    let pedidosFiltrados = await Productos.find(filtros);
    
    if (pedidosFiltrados.length > 0) {
      res.status(200).json(pedidosFiltrados);
    } else {
      res.status(404).json({ mensaje: 'No se encontraron pedidos que coincidan con los filtros' });
    }
  }
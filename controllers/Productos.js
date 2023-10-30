import Productos from '../models/Productos';

export async function getProducto(req, res) {
  const productoId = req.params.id; // Obtén el ID del producto desde la URL
  const producto = await Productos.find({ _id: productoId,  'inhabilitado.valor': false  });
  if (producto) {
    res.status(200).json(producto);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
}

export async function getProductos(req, res) {
  const restaurante = req.query.id_Restaurante; 
  const categoria = req.query.categoria;

  let filtros = {};

  if (restaurante) {
    filtros.id_Restaurante = restaurante;
  }

  if (categoria) {
    filtros.categoria = categoria;
  }
  filtros['inhabilitado.valor'] = false;
  
  let productosFiltrados = await Productos.find(filtros);
  
  if (productosFiltrados.length > 0) {
    res.status(200).json(productosFiltrados);
  } else {
    res.status(404).json({ mensaje: 'No se encontraron productos que coincidan con los filtros' });
  }
}

export async function createProducto(req, res) {
  try {
    let nuevoProducto = req.body;
    //arreglar que se verifique que el administrador exista
    const producto = new Productos(nuevoProducto);
    const resultado = await producto.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchProducto(req, res) {
  const idProducto = req.params.id;
  const cambios = req.body;
  try {
    await Productos.findOneAndUpdate({ _id: idProducto,  'inhabilitado.valor': false  }, cambios);
    res.status(200).json({ mensaje: 'Producto modificado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al modificar el producto' });
  }
}

export async function deleteProducto(req, res) {
  //res.status(200).json({});
  try {
    const productoEliminado = await Productos.findOneAndUpdate({_id : req.params.id,  'inhabilitado.valor': false  }, {
      inhabilitado: { valor: true, fecha_inhabilitado: new Date() },
    });

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.status(200).json({ mensaje: 'Producto inhabilitado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al inhabilitando el producto' });
  }
}

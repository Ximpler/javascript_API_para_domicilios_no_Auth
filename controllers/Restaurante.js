import Restaurantes from '../models/Restaurantes';

export async function getRestaurante(req, res) {
  const restauranteId = req.params.id; // Obtén el ID del restaurante desde la URL
  const restaurante = await Restaurantes.find({_id : restauranteId,  'inhabilitado.valor': false }); 
  if (restaurante) {
    res.status(200).json(restaurante);
  } else {
    res.status(404).json({ mensaje: 'Producto no encontrado' });
  }
}

export async function getRestaurantes(req, res) {
  const nombreRestaurante = req.query.nombre; // Obtén el restaurante desde los parámetros de consulta
  const categorias = req.query.categorias; // Obtén la categoría desde los parámetros de consulta

  let filtros = {};

  if (nombreRestaurante) {
    filtros.nombre = new RegExp(nombreRestaurante, 'i');
  }

  if (categorias) {
    filtros.categorias = categorias;
  }

  filtros['inhabilitado.valor'] = false;

  let restaurantesFiltrados = await Restaurantes.find(filtros);

  if (restaurantesFiltrados.length > 0) {
    res.status(200).json(restaurantesFiltrados);
  } else {
    res
      .status(404)
      .json({ mensaje: 'No se encontraron restaurantes que coincidan con los filtros' });
  }
}

export async function createRestaurante(req, res) {
  try {
    let nuevoRestaurante = req.body;
    //arreglar que se verifique que el administrador exista
    const restaurante = new Restaurantes(nuevoRestaurante);
    const resultado = await restaurante.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchRestaurante(req, res) {
  const id_restaurante = req.params.id;
  const cambios = req.body;
  try {
    await Restaurantes.findOneAndUpdate({ _id: id_restaurante,  'inhabilitado.valor': false  }, cambios);
    res.status(200).json({ mensaje: 'Restaurante modificado correctamente' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al modificar el restaurante' });
  }
}

export async function deleteRestaurante(req, res) {
  //res.status(200).json({});
  try {
    const restauranteEliminado = await Restaurantes.findOneAndUpdate({_id : req.params.id,  'inhabilitado.valor': false }, {inhabilitado:{valor: true, fecha_inhabilitado: new Date()}});;
    if (!restauranteEliminado) {
      return res.status(404).json({ mensaje: 'Restaurante no encontrado' });
    }
    res.status(200).json({ mensaje: 'Restaurante eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el restaurante' });
  }
}

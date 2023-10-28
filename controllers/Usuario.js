import Usuario from '../models/Usuario';

export async function getUsuario(req, res) {
  idusuario = req.params.id;

  const Usuarios = await Usuario.find(idusuario, {'inhabilitado.valor': false  });

  res.status(200).json(Usuarios);
}

export async function createUsuario(req, res) {
  try {
    const usuario = new Usuario(req.body);
    const resultado = await usuario.save();
    res.status(200).json(resultado);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function patchUsuario(req, res) {
  const id_usuario = req.params.id;
  const cambios = req.body;
  try {
    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { _id: id_usuario,  'inhabilitado.valor': false  },
      cambios
    );
    if (usuarioActualizado) {
      res.status(200).json({ mensaje: 'Usuario modificado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al modificar el Usuario', error: err });
  }
}

export async function deleteUsuario(req, res) {
  //res.status(200).json({});

  try {
    const usuarioEliminado = await Usuario.findOneAndUpdate(
      { _id: req.params.id,  'inhabilitado.valor': false  },
      {
        inhabilitado: { valor: true, fecha_inhabilitado: new Date() },
      }
    );
    if (!usuarioEliminado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el usuario' });
  }
}

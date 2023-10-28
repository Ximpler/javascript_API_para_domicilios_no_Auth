import { createPedido, deletePedido,getPedido, getPedidosSinEnviar, getPedidosUsuario, patchPedido } from "../controllers/Pedidos.js";
import {Router} from 'express';
const router = Router();

// Endpoint GET (unidad) /prueba
router.get('/buscar/:id', getPedido );

// Endpoint GET (muchos) /prueba
router.get('/buscar', getPedidos );

// Endpoint GET (muchos) /prueba
router.get('/usuario/:idUsuario', getPedidosUsuario );

// Endpoint POST /prueba
router.post('/crear', createPedido );

// Endpoint PATCH /prueba
router.patch('/modificar/:id', patchPedido );

// Endpoint DELETE /prueba
router.delete('/eliminar/:id', deletePedido );

export default router;
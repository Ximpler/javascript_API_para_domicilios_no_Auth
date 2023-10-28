import { createProducto, deleteProducto,getProducto, getProductos, patchProducto } from "../controllers/Productos.js";
import {Router} from 'express';
const router = Router();

// Endpoint GET (unidad) /prueba
router.get('/buscar/:id', getProducto );

// Endpoint GET (muchos) /prueba
router.get('/buscar', getProductos );

// Endpoint POST /prueba
router.post('/crear', createProducto );

// Endpoint PATCH /prueba
router.patch('/modificar/:id', patchProducto );

// Endpoint DELETE /prueba
router.delete('/eliminar/:id', deleteProducto );

export default router;
import { createRestaurante, deleteRestaurante,getRestaurante, getRestaurantes, patchRestaurante } from "../controllers/Restaurante.js";
import {Router} from 'express';
const router = Router();

// Endpoint GET (unidad) /prueba
router.get('/buscar/:id', getRestaurante );

// Endpoint GET (muchos) /prueba
router.get('/buscar', getRestaurantes );

// Endpoint POST /prueba
router.post('/crear', createRestaurante );

// Endpoint PATCH /prueba
router.patch('/modificar/:id', patchRestaurante );

// Endpoint DELETE /prueba
router.delete('/eliminar/:id', deleteRestaurante );

export default router;
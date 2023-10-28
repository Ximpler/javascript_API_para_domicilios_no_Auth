import { createUsuario, deleteUsuario, getUsuario, patchUsuario } from "../controllers/Usuario.js";
import {Router} from 'express';
const router = Router();

// Endpoint GET /prueba
router.get('/buscar/:id', getUsuario );

// Endpoint POST /prueba
router.post('/crear', createUsuario );

// Endpoint PATCH /prueba
router.patch('/modificar/:id', patchUsuario );

// Endpoint DELETE /prueba
router.delete('/eliminar/:id', deleteUsuario );

export default router;
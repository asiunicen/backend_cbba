import express from 'express';
import { tiposCarreras } from '../../controllers/programa/tipoCarreraController.js';

const router = express.Router();

router.get('/', tiposCarreras);

export default router;
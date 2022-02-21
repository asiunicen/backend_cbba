import express from 'express';
import { getCarrerasSalud, getTiposPlanEstudios } from '../controllers/carrerasSaludController.js';

const router = express.Router();

  
router.get('/', getCarrerasSalud);

export default router;
 

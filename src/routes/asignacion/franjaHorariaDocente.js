import express from 'express';
import { getFranjaDocente, getFranjaHorariaDocenteDeterminado } from '../../controllers/asignacion/franjaHorariaDocenteController.js';

const router = express.Router();
  
router.get('/', getFranjaDocente);
router.get('/:id_personal/:id_gestion', getFranjaHorariaDocenteDeterminado);


export default router;
 


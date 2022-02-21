import express from 'express';
import { getMateriaByIdPlanMateria } from '../controllers/materiaActualController.js';

const router = express.Router();

//router.get('/', getDetallePlanificacion);
router.get('/:id', getMateriaByIdPlanMateria);


export default router;
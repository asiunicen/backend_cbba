import express from 'express';
import { getDetallePlanificacion, getDetallePlanificacionById, createPlanificacion, updatePlanificacion } from '../../controllers/planificacion/planificacionController.js';

const router = express.Router();

router.get('/:id_gestion', getDetallePlanificacion);
router.get('/:id/:id_gestion', getDetallePlanificacionById);
router.post('/', createPlanificacion);
router.put('/', updatePlanificacion);

export default router;
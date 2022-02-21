import express from 'express';
import { getMateriasCarreraAll, getMateriasCarreraByIdPlanMateria, modificarPracticaHospitalaria } from '../controllers/materiasCarreraController.js';

const router = express.Router();

router.get('/', getMateriasCarreraAll); // all carreras
router.get('/:id', getMateriasCarreraByIdPlanMateria);
router.put('/:id_plan_materia/:practica_hospitalaria', modificarPracticaHospitalaria)

export default router;
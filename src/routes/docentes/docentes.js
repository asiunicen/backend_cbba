import express from 'express';
import { getDocentes } from '../../controllers/Docentes/docentesController.js';

const router = express.Router();

router.get('/:id_materia', getDocentes);

export default router;
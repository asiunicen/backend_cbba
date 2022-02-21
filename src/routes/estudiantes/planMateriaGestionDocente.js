import express from 'express'
import { getIdPMGD, getIdInscripcionLast, saveInscripPMGD, getMateriasRecuperadas } from '../../controllers/Estudiantes/planMateriaGestionDocenteControllers'

let router = express.Router()

router.get('/:id_materia', getIdPMGD)
router.get('/', getIdInscripcionLast)
router.post('/', saveInscripPMGD)
router.get('/:id_estudiante/:id_plan_estudio/:id_gestion', getMateriasRecuperadas)

export default router
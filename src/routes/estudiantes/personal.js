import express from 'express'
import { getIdPersonal, getIdInscripPmgdLast, getIdInscripcion } from '../../controllers/Estudiantes/planMateriaGestionDocenteControllers'

let router = express.Router()

router.get('/:id_datos_personal', getIdPersonal)
router.get('/:id_estudiante/:id_gestion', getIdInscripcion)
router.get('/', getIdInscripPmgdLast)

export default router
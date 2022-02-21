import express from 'express'
import { getEstudiantePlanEstudio } from '../../controllers/Estudiantes/estudianteControllers'

let router = express.Router()

router.get('/:id_estudiante', getEstudiantePlanEstudio)

export default router
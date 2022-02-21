import express from 'express'
import { buscarEstudiante, getEstudianteInscrito } from '../../controllers/Estudiantes/estudianteControllers'

let router = express.Router()

router.get('/:id_datos_estudiante', buscarEstudiante)
router.get('/:id_estudiante/:id_gestion', getEstudianteInscrito)

export default router
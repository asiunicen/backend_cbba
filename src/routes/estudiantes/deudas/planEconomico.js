import express from 'express'
import { getPlanEconomicoVencido, getPlanVencidoEstudiante } from '../../../controllers/Estudiantes/deudasControllers'

let router = express.Router()

router.get('/:id_estudiante', getPlanEconomicoVencido)
router.get('/:id_estudiante/:id_gestion', getPlanVencidoEstudiante)

export default router
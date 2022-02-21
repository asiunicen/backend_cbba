import express from 'express'
import { getEstudidantes, getFindEstudiantes, getAllMateriasOfertadas } from '../../controllers/Estudiantes/admEstudianteController'

let router = express.Router()

router.get('/:id_gestion', getEstudidantes)
router.get('/:filtro/:id_gestion', getFindEstudiantes)
router.get('/:id_estudiante/:id_plan_estudio/:id_gestion', getAllMateriasOfertadas)

export default router
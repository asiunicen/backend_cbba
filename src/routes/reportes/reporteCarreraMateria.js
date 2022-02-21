import express from 'express'
import { getReporteCarreraMaterias } from '../../controllers/reportes/CarreraMateriasController.js'

let router = express.Router()

router.get('/:id_plan_estudio/:id_gestion', getReporteCarreraMaterias)

export default router
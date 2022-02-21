import express from 'express'
import { getAsignacionesGrupo, createAsignacion, deleteAsignacion, getAsignacionVerificacion } from '../../controllers/asignacion/asignacion.js'

let router = express.Router()

router.get('/:id_gestion/:id_aula/:id_plan_estudio', getAsignacionesGrupo)
router.get('/:id_gestion/:id_personal/:id_plan_estudio/:id_franja/:id_dia', getAsignacionVerificacion)
router.post('/', createAsignacion)
router.delete('/:id', deleteAsignacion)


export default router

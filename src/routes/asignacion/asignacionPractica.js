import express from 'express'
import {  getAsignacionesGrupoPractica, createAsignacionPractica, deleteAsignacionPractica, getHorarioDocentePractica, getAsignacionVerificacionPractica } from '../../controllers/asignacion/asignacionPractica.js'

let router = express.Router()

router.get('/:id_aula/:id_gestion/:id_materia', getAsignacionesGrupoPractica)
router.post('/', createAsignacionPractica)
//router.put('/:id', updateDocentePractica)
router.delete('/:id', deleteAsignacionPractica )
router.get('/:id_personal/:id_gestion', getHorarioDocentePractica)
router.get('/:id_gestion/:id_personal/:id_franja/:id_dia', getAsignacionVerificacionPractica)

export default router
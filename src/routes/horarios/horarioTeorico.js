import express from 'express'
import {getAsignacionGruposTeoricos, getHorarioTemporales, deleteGrupoTeorico } from '../../controllers/Inscripcion/inscripcionController'

let router = express.Router()

router.get('/:id_grupo/:id_gestion', getAsignacionGruposTeoricos)
router.get('/:id_estudiante/:id_plan_estudio/:id_gestion', getHorarioTemporales)
router.delete('/:id_materia/:id_estudiante/:id_plan_estudio/:id_gestion', deleteGrupoTeorico)
export default router
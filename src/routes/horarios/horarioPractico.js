import express from 'express'
import {getAsignacionGruposPracticos, deleteGrupoPractico } from '../../controllers/Inscripcion/inscripcionController'

let router = express.Router()

router.get('/:id_grupo', getAsignacionGruposPracticos)
router.delete('/:id_materia/:id_estudiante/:id_plan_estudio/:id_gestion', deleteGrupoPractico)

export default router
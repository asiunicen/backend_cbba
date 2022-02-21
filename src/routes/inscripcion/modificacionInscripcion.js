import express from 'express'
import { getInscripciones, modifyGrupoPractico } from '../../controllers/Inscripcion/inscripcionController'
import { getMateriasSolicitadas } from '../../controllers/Inscripcion/tomaMateriasController'

let router = express.Router()

router.get('/:id_estudiante/:id_gestion', getInscripciones)
router.get('/:id_estudiante/:id_plan_estudio/:id_gestion', getMateriasSolicitadas)
router.put('/', modifyGrupoPractico)

export default router
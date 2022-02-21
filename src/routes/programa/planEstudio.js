import express from 'express'
import { createPlanEstudio, obtenerPlanesEstudios, tiposPlanEstudio, modificarPlanEstudios } from '../../controllers/programa/ProgramaCarreraController'
let router = express.Router()

router.post('/', createPlanEstudio);

router.get('/', obtenerPlanesEstudios);

router.get('/:id_carrera', tiposPlanEstudio);

router.put('/', modificarPlanEstudios)

export default router
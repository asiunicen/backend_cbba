import express from 'express'
import { getProgramaCarreras, createPlanEstudio, getCarrerasMedicina } from '../../controllers/programa/ProgramaCarreraController'
let router = express.Router()

router.get('/', getProgramaCarreras);
// router.get('/teoricas', getAulasTeoricas)
router.get('/', getCarrerasMedicina)
router.post('/', createPlanEstudio);
// router.put('/:id', updateAula)

export default router
import express from 'express'
import { getAulasAll, getAulasTeoricas, getAulasHospitales, getVistaAulasTeoricas, createAula, updateAula } from '../../controllers/admAula/admAulaController.js'

let router = express.Router()

router.get('/', getAulasAll)
router.get('/teoricas', getAulasTeoricas)
router.get('/hospitales', getAulasHospitales)
router.get('/ver/teoricas/:id_gestion/:cod_materia', getVistaAulasTeoricas)
router.post('/', createAula)
router.put('/:id', updateAula)

export default router
import express from 'express'
import { getTipoAula } from '../../controllers/admAula/tipoAulaController.js'

const router = express.Router()

router.get('/', getTipoAula)

export default router
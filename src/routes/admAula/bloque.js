import express from 'express'
import { getBloque, updateBloque, createBloque } from '../../controllers/admAula/bloqueController'

const router = express.Router()

router.get('/', getBloque)
router.post('/', createBloque)
router.put('/:id', updateBloque)

export default router
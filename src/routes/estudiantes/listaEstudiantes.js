import express from 'express'
import { getGestiones } from '../../controllers/Estudiantes/admEstudianteController'

let router = express.Router()

router.get('/:limit', getGestiones)

export default router
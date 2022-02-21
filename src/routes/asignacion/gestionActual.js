import express from 'express'
import {  getGestionActual } from '../../controllers/asignacion/gestionActual.js'

let router = express.Router()

router.get('/', getGestionActual)

export default router
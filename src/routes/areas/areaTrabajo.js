import express from 'express'
import { getAreasTrabajo, getCamposTrabajo, getSubCamposTrabajo, crearNuevaAreaTrabajo } from '../../controllers/Areas/areaTrabajoControllers.js'

let router = express.Router()

router.get('/', getAreasTrabajo)
router.get('/:id_area_trabajo', getCamposTrabajo)
router.get('/:id_campo_trabajo', getSubCamposTrabajo)
//router.post('/:id_campo_trabajo', getSubCamposTrabajo)

router.post('/', crearNuevaAreaTrabajo)

export default router
import express from 'express'
import { getDeudasEstudiantesGestion, getDocumentosPendientesEstudiante, saveDeuda, updateDeuda } from '../../../controllers/Estudiantes/deudasControllers'

let router = express.Router()

router.get('/:id_estudiante/:id_gestion', getDeudasEstudiantesGestion)
router.get('/:id_estudiante', getDocumentosPendientesEstudiante)
router.post('', saveDeuda)
router.put('/:id_estudiante/:id_gestion/:cantidad', updateDeuda)

export default router

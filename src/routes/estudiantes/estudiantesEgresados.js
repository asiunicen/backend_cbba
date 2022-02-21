import express from 'express'
import { getAllEstudiantesEgresados, crearPerfilEstudiante } from '../../controllers/Estudiantes/admEstudianteController'
import { getIdPMGD } from '../../controllers/Estudiantes/planMateriaGestionDocenteControllers'

let router = express.Router()

router.get('/', getAllEstudiantesEgresados)

router.get('/:id_materia', getIdPMGD)

router.post('/', crearPerfilEstudiante)

export default router
import express from 'express'
import { saveInscripcion, deleteTomaMaterias, getIdInscripcionTomaMaterias} from '../../controllers/Inscripcion/tomaMateriasController'
import { getAllGruposPracticas } from '../../controllers/Inscripcion/inscripcionController'
import { getV_Carrera } from '../../controllers/Estudiantes/estudianteControllers'

let router = express.Router()

router.post('/', saveInscripcion)
router.get('/:id_materia/:id_grupo/:id_gestion', getAllGruposPracticas)
router.delete('/:id_plan_materia_gestion_docente', deleteTomaMaterias)
router.get('/:id_estudiante/:id_gestion', getIdInscripcionTomaMaterias)
router.get('/:id_plan_estudio', getV_Carrera)

export default router
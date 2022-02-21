import express from 'express'
import { gruposMateriaDocente, 
    getHorariosGruposTeoricosPracticos, getAsignacionGruposTeoricos, 
    saveInscripcionTemporal, deleteHorarioEstudiante, deleteGrupos} from '../../controllers/Inscripcion/inscripcionController'

let router = express.Router()

router.get('/:id_materia/:id_plan_estudio/:id_gestion', gruposMateriaDocente)

router.get('/', getHorariosGruposTeoricosPracticos)
router.get('/:id_grupo/:id_gestion', getAsignacionGruposTeoricos)

router.post('/', saveInscripcionTemporal)

router.delete('/:id_estudiante/:id_plan_estudio/:id_gestion', deleteHorarioEstudiante)

router.delete('/:id_materia', deleteGrupos)

export default router

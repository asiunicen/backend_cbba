import express from 'express';
import cors from 'cors';
import authVerification from './middleware/authMiddleware.js'; //const  auth = require('./middleware/authMiddleware.js')

//Importing routes
import loginRoutes  from './routes/auth.js';
import loginEstudiante from './routes/authEstudiante.js'
import getTipoPersonal from './routes/auth.js'
import admAulaRoutes from './routes/admAula/admAula.js';
import estudiantesEgresados from './routes/estudiantes/estudiantesEgresados.js'

import areaTrabajo from './routes/areas/areaTrabajo.js'

import bloqueRoutes from './routes/admAula/bloque.js';
import tipoAula from './routes/admAula/tipoAula.js';
import gestion from './routes/gestion.js';
import materiasCarrera from './routes/materiasCarrera.js';
import materiasPracticaModificar from './routes/materiasCarrera.js'
import carrerasSalud from './routes/carrerasSalud.js';
import franjaHorariaDocente from './routes/asignacion/franjaHorariaDocente.js'; 
import franjaHorariaDocenteDeterminado from './routes/asignacion/franjaHorariaDocente.js' 
import docentes from './routes/docentes/docentes.js';
import gestiones from './routes/gestion.js';
import gestionActual from './routes/asignacion/gestionActual.js'
import planificacionTeorica from './routes/planificacion/planificarTeorica.js';
import planificacionPractica from './routes/planificacion/planificarPractica.js';
import materiaActual from './routes/materiaActual.js';
import asignacion from './routes/asignacion/asignacion.js';
import asignacionVerificacion from './routes/asignacion/asignacion.js'
import asignacionVerificacionPractica from './routes/asignacion/asignacionPractica.js'
import asignacionPractica from './routes/asignacion/asignacionPractica.js';
import horarioDocentesPractica from './routes/asignacion/asignacionPractica.js'
import gruposPracticas from './routes/inscripcion/tomaMaterias.js'
import horariosGrupos from './routes/inscripcion/inscripciones.js'
import asignacionGrupoTeorico from './routes/horarios/horarioTeorico.js'
import asignacionGrupoPractico from './routes/horarios/horarioPractico.js'
import horarioTemporal from './routes/horarios/horarioTeorico.js'
import modifyGrupoPractico from './routes/inscripcion/modificacionInscripcion.js'

import programaCarreras from './routes/programa/programaCarreras.js';
import tiposCarreras from './routes/carreras/tiposCarreras.js';
import planEstudio from './routes/programa/planEstudio.js';
import modificarPlanEstudio from './routes/programa/planEstudio.js';
import tiposPlanes from './routes/programa/planEstudio.js'
import ultimoId from './routes/programa/ultimoId.js';
import tiposPlanEstudio from './routes/programa/planEstudio.js';
import carrerasMedicina from './routes/programa/programaCarreras.js'

import gruposMateriaDocente from './routes/inscripcion/inscripciones.js'
import saveTemporal from './routes/inscripcion/inscripciones.js'

/*********************************************************** */
import getInscripciones from './routes/inscripcion/modificacionInscripcion.js'
import getIdInscripcionTomaMaterias from './routes/inscripcion/tomaMaterias'
import getMateriasSolicitadas from './routes/inscripcion/modificacionInscripcion.js'
import materiasOfertadas from './routes/estudiantes/estudiantesFacultad.js'
import materiasRecuperadas from './routes/estudiantes/planMateriaGestionDocente'
import deleteHorarioEstudiante from './routes/inscripcion/inscripciones.js'
import deleteGrupos from './routes/inscripcion/inscripciones.js'
import deleteTomaMaterias from './routes/inscripcion/tomaMaterias.js'
import deleteGrupoPractico from './routes/horarios/horarioPractico.js'
import deleteGrupoTeorico from './routes/horarios/horarioTeorico.js'
/*********************************************************** */

import getEstudidantes from './routes/estudiantes/estudiantesFacultad.js'
import getFindEstudiantes from './routes/estudiantes/estudiantesFacultad.js'
import getGestiones from './routes/estudiantes/listaEstudiantes.js'
import getIdPersonal from './routes/estudiantes/personal.js'
import getIdInscripPmgdLast from './routes/estudiantes/personal.js'
import getIdInscrip from './routes/estudiantes/personal.js'
import getIdPMGD from './routes/estudiantes/planMateriaGestionDocente.js'
import getIdInscripcion from './routes/estudiantes/planMateriaGestionDocente.js'
import saveInscripPMGD from './routes/estudiantes/planMateriaGestionDocente.js'
import saveInscripcion from './routes/inscripcion/tomaMaterias.js' 
import saveDeuda from './routes/estudiantes/deudas/deudasEstudiantes.js'
/******************************************* */


import getDeudasEstudiantes from './routes/estudiantes/deudas/deudasEstudiantes.js'
import updateDeudasEstudiante from './routes/estudiantes/deudas/deudasEstudiantes.js'
import getDocumentosPendientes from './routes/estudiantes/deudas/deudasEstudiantes.js'
import getPlanEconomicoVencido from './routes/estudiantes/deudas/planEconomico.js'
import getPlanVencidoEstudiante from './routes/estudiantes/deudas/planEconomico.js'
import estudianteInscripcion from './routes/estudiantes/estudianteInscripcion.js'
import getEstudiantePlanEstudio from './routes/estudiantes/estudiantePlanEstudio.js'
import getV_Carrera from './routes/inscripcion/tomaMaterias.js'
import getEstudianteInscrito from './routes/estudiantes/estudianteInscripcion.js'

/******************************************************************** */
import getReporteCarreraMaterias from './routes/reportes/reporteCarreraMateria.js'

//Initialization
const app = express()
app.use(cors())

//Middlewares morgan por ejemplo
//app.use(json())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

//CORS
/* app.use((req, res, next) => {
    //res.sendStatus(200);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
    res.header("Content-type: application/json; charset=utf-8");
    res.header('Allow', 'GET, POST, PUT, PATCH, OPTIONS, DELETE'); 
    next();
  }); */


//Routes Login   
app.use('/api/users/login', loginRoutes) 

//Routes Login estudiantes
app.use('/api/users/loginEstudiante', loginEstudiante)

//Routes getTipoPersonal
app.use('/api/users/datos', getTipoPersonal)

//Routes admAulas
app.use('/api/admaulas', authVerification, admAulaRoutes) //all
app.use('/api/bloque', authVerification, bloqueRoutes)
app.use('/api/tipo', authVerification, tipoAula)
app.use('/api/aulas',authVerification, admAulaRoutes) //hospitales
app.use('/api/aula', authVerification, admAulaRoutes) //teoricas
//Routes Estudiante Egresados
app.use('/api/estudiantesEgresados', authVerification, estudiantesEgresados)//obtiene todos los estudiantes egresados

//Routes Todas las Areas
app.use('/api/areas', authVerification, areaTrabajo)//obtiene todas las areas

//Routes Todos los Campos
app.use('/api/campos', authVerification, areaTrabajo)//obtiene todos los campos
//Routes Todos los Sub Campos
app.use('/api/subcampos', authVerification, areaTrabajo)//obtiene todos los campos

//Routes Programa de Carreras
app.use('/api/admprogramas', authVerification, programaCarreras)//obtiene todas las carreras con resolucion ministerial

//Routes Tipos de Carrera
app.use('/api/tipos', authVerification, tiposCarreras)

//Routes create new PLAN ESTUDIO
app.use('/api/programa/planEstudio', authVerification, planEstudio)

//Routes modifica datos del PLAN ESTUDIO
app.use('/api/programa/modify', authVerification, modificarPlanEstudio)

//Routes obtener todos los PLANES DE ESTUDIO
app.use('/api/programa/tiposPlanEstudio', authVerification, tiposPlanes)

//Routes obtener ultimo id_plan_estudio
app.use('/api/programa/ultimoId', authVerification, ultimoId)

//Routes obtener los tipos de plan correctos
app.use('/api/programa/tiposPlanEstudio', authVerification, tiposPlanEstudio)

//Routes obtener todas las carreras de medicina
app.use('/api/programa/carreras', authVerification, carrerasMedicina)

//Routes obtener todos los grupos con practicas
app.use('/api/practicas', authVerification, gruposPracticas)

//Routes obtener el horario de los grupos teorico y practicos
app.use('/api/horario', authVerification, horariosGrupos)

//Routes Gestion
app.use('/api/gestiones', authVerification, gestion);
//Routes Materias_Carreras Salud
app.use('/api/materias/carrera', authVerification, materiasCarrera);
//Routes Modificar en la materia la practica hospitalaria
app.use('/api/materias/carrera/modificar', authVerification, materiasPracticaModificar)
//Routes Carreras Salud
app.use('/api/carreras/salud', authVerification, carrerasSalud);
//Routes Franja Horaria Docente
app.use('/api/franja/horaria/docente', authVerification, franjaHorariaDocente)
//Routes Franja Horaria Docente Determinado
app.use('/api/franja/horaria/docente/determinado', authVerification, franjaHorariaDocenteDeterminado)

//Routes Docentes
app.use('/api/docentes/salud', authVerification, docentes)
//Route Gestiones
app.use('/api/gestiones', authVerification, gestiones)
app.use('/api/gestion/actual', authVerification, gestionActual)
//Route planificacion Teorica
app.use('/api/planificar', authVerification, planificacionTeorica)
//Route planificacion Practica
app.use('/api/planificacion/practica', authVerification, planificacionPractica)
//Route materia actual
app.use('/api/materia/actual', authVerification, materiaActual)
//Route asignacion 
app.use('/api/asignacion', authVerification, asignacion)
//Route Verificacion de horiros disponibles 
app.use('/api/asignacion/verificacion', authVerification, asignacionVerificacion)
//Route Verificacion de horario disponible practica
app.use('/api/asignacion/practica/verificacion', authVerification, asignacionVerificacionPractica)

//Route asignacion practica
app.use('/api/asignaciones/practica', authVerification, asignacionPractica)
//Route obtiene todos los horarios del docente que dicta clases.
app.use('/api/asignaciones/practica', authVerification, horarioDocentesPractica)

//Route asignacion grupo teoricos
app.use('/api/inscripciones/grupos_teoricos', authVerification, asignacionGrupoTeorico)

//Route obtener los grupos practicos
app.use('/api/inscripciones/grupos_practicos', authVerification, asignacionGrupoPractico)

//Route obtener la inscripcion 
app.use('/api/inscripciones/getInscripcion', authVerification, getInscripciones)

//Route obtener el id_inscripcion del estudiante en la gestion
app.use('/api/inscripciones/TomaMaterias', authVerification, getIdInscripcionTomaMaterias)

//Route obtener las materias solicitadas
app.use('/api/inscripciones/materiasSolicitadas', authVerification, getMateriasSolicitadas)

//Route inscripciones
app.use('/api/inscripciones', authVerification, materiasOfertadas)

//Route recupera las inscripciones
app.use('/api/recuperaciones', authVerification, materiasRecuperadas)

//Route save inscripciones temporales
app.use('/api/inscripciones/saveTemporal', authVerification, saveTemporal)

//Route obtener todos los temporales
app.use('/api/inscripciones/temporales', authVerification, horarioTemporal)

//Route modificar la inscripcion del grupo practico
app.use('/api/inscripciones/modificar', authVerification, modifyGrupoPractico)

//Route elimina los horarios correspondientes al grupo y materia
app.use('/api/inscripciones/deleteGrupoTeorico', authVerification, deleteGrupoTeorico)

//Route elimina los horarios de los grupos practicos
app.use('/api/inscripciones/deleteGrupoPractico', authVerification, deleteGrupoPractico)

//Route elimina los grupos de seleccion
app.use('/api/inscripciones/deleteGrupos', authVerification, deleteGrupos)

//Route elimina la toma de materia seleccionada
app.use('/api/inscripciones/deleteMateria', authVerification, deleteTomaMaterias)

//Route elimina el horario del estudiante
app.use('/api/inscripciones/deleteHorario', authVerification, deleteHorarioEstudiante)

//Route grupos
app.use('/api/grupos', authVerification, gruposMateriaDocente)

//Route obtner el id_pmgd
app.use('/api/estudiantes/pmgd', authVerification, getIdPMGD)

//Route obtener ultimo id_inscripcion
app.use('/api/estudiantes/ultimoIdInscripcion', authVerification, getIdInscripcion)

//Route obtener el id_personal
app.use('/api/estudiantes/idPersonal', authVerification, getIdPersonal)

//Route obtener ultimo id_inscrip_pmgd
app.use('/api/estudiantes/ultimoIdInscripPMGD', authVerification, getIdInscripPmgdLast)

//Route obtener ultimo id_inscripcion
app.use('/api/estudiantes/idInscripcion/', authVerification, getIdInscrip)

//Route obtener a los Estudiantes que van hacer inscritos
app.use('/api/estudiantes', authVerification, getEstudidantes)

//Route buscar al estudiantes por un filtro
app.use('/api/buscarEstudiantes', authVerification, getFindEstudiantes)

//Route obtener las gestiones a futuro para mostrar la lista de estudiantes
app.use('/api/gestiones', authVerification, getGestiones)

//Route guardar una inscripcion
app.use('/api/estudiantes/saveInscripcion', authVerification, saveInscripcion)

//Route guardar inscrip_plan_materia_gestion_docente
app.use('/api/estudiantes/saveinscripPlanMateriaGestionDocente', authVerification, saveInscripPMGD)

//Route obtener las deudas de los estudiantes
app.use('/api/deudas', authVerification, getDeudasEstudiantes)

//Route actualizar las deudas del estudiante
app.use('/api/deudas/update', authVerification, updateDeudasEstudiante)

//Route obtener los documentos pendientes del estudiante
app.use('/api/documentos', authVerification, getDocumentosPendientes)

//Route obtener el plan vencido del estudiante
app.use('/api/planVencido', authVerification, getPlanEconomicoVencido)

//Route obtener el plan vencido
app.use('/api/planVencidoEstudiante', authVerification, getPlanVencidoEstudiante)

//Route guardar la Deuda de inscripcion del estudiante
app.use('/api/inscripciones/saveDeuda', authVerification, saveDeuda)

//Route obtener al estudiante
app.use('/api/buscarEstudiante/', authVerification, estudianteInscripcion)

//Route obtener el estudiante plan estudio
app.use('/api/estudiantePlanEstudio', authVerification, getEstudiantePlanEstudio)

//Route obtener la v_carrera
app.use('/api/v_carrera', authVerification, getV_Carrera)

//Route obtener al Estudiante de la gestion inscrita
app.use('/api/inscripcion/estudiante/', authVerification, getEstudianteInscrito)

//Route Reportes de carrera-materia
app.use('/api/reportes/carrera_materia/', authVerification, getReporteCarreraMaterias)

export default app

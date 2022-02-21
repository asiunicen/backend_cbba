import { EstudiantePlanEstudio } from '../../models/asignacionModel' 
const { Op } = require("sequelize");
import db from '../../db/db.js';

export const buscarEstudiante = async (req, res) => {
    try {        
        let id_datos_estudiante = req.params.id_datos_estudiante
        console.log(id_datos_estudiante)
        const [results, metadata] = await db.query(`select * from unicen.estudiante e, unicen.datos_estudiante de where e.id_datos_estudiante = de.id_datos_estudiante and de.id_datos_estudiante = ${id_datos_estudiante}`)
        res.json(results)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener el estudiante'})
        console.log(error)
    }
}

export const getEstudiantePlanEstudio = async(req, res) => {
    try {
        const estudiantePlanEstudios = await EstudiantePlanEstudio.findAll({
            where: { id_estudiante: req.params.id_estudiante },
        })
        res.json({
            data: estudiantePlanEstudios
        })        
    } catch (error) {
        console.log(error);
    }
}

export const getEstudianteInscrito = async(req, res) => {
    try {
        let id_estudiante = req.params.id_estudiante
        let id_gestion = req.params.id_gestion
        const [results, metadata] = await db.query(`select * from unicen.estudiantesgestion(${id_gestion}) where id_estudiante = ${id_estudiante}`)
        res.json(results)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener el estudiante pre-inscrito'})
        console.log(error)
    }
}

export const getV_Carrera = async (req, res) => {
    try {        
        let id_plan_estudio = req.params.id_plan_estudio
        console.log(id_plan_estudio)
        const [results, metadata] = await db.query(`select * from unicen.v_carrera where id_plan_estudio = ${id_plan_estudio}`)
        res.json(results)
    } catch (error) {
        res.status(500).json({message: 'Error al obtener la carrea del estudiante'})
        console.log(error)
    }
}